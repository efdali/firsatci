require('../helpers/connectDatabase')();
const cron = require('node-cron');
const cheerio = require('cheerio');
const axios = require('axios');
const Product = require('../models/Product');
const Price = require('../models/Price');

const task = cron.schedule('0 */10 * * * *', async () => {
  console.log('çalıştı', new Date());
  Product.find({}).then((products) => {
    if (products.length > 0) {
      products.map((product) => {
        axios.get(product.url).then((response) => {
          const $ = cheerio.load(response.data);
          const price = $(product.selector).text().trim();
          Price.create({ product: product._id, price }).then((a) => console.log(a));
          // task.destroy();
        });
      });
    } else {
    }
  });
});
