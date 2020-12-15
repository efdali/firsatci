require('dotenv').config();
const express = require('express');
const cors = require('cors');
const routers = require('./routers');
const errorHandler = require('./middlewares/errorHandler');
const cron = require('node-cron');
const cheerio = require('cheerio');
const axios = require('axios');
const Product = require('./models/Product');
const Price = require('./models/Price');
const TelegramBot = require('node-telegram-bot-api');
require('./helpers/connectDatabase')();

const app = express();
const bot = new TelegramBot(process.env.TELEGRAM_TOKEN, { polling: true });
let message = ``;

cron.schedule('0 */6 * * * ', async () => {
  console.log('çalıştı', new Date());
  Product.find({}).then((products) => {
    if (products.length > 0) {
      products.map((product) => {
        axios.get(product.url).then((response) => {
          const $ = cheerio.load(response.data);
          const price = $(product.selector).text().trim();
          Price.create({ product: product._id, price }).then((p) => {
            message = `${product.name} - ${price}\n ${product.url}`;
            bot.sendMessage('-466890469', message);
          });
          // task.destroy();
        });
      });
    }
  });
});

app.use(cors());

app.use(express.static('public'));

app.use(express.json());
app.use('/', routers);

app.use(errorHandler);

app.listen(process.env.PORT || 5000, () => {
  console.log('Server is listening on 5000');
});
