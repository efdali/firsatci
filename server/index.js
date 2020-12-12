const express = require('express');
require('./helpers/connectDatabase')();

const app = express();

app.get('/', (req, res, next) => res.end('ok'));

app.listen(3000, () => {
  console.log('Server is listening on 3000');
});
