const express = require('express');
const cors = require('cors');
const routers = require('./routers');
const errorHandler = require('./middlewares/errorHandler');
require('./helpers/connectDatabase')();

const app = express();

app.use(cors());

app.use(express.json());
app.use('/', routers);

app.use(errorHandler);

app.listen(5000, () => {
  console.log('Server is listening on 5000');
});
