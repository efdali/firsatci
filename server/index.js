const express = require('express');
const routers = require('./routers');
require('./helpers/connectDatabase')();

const app = express();

app.use(express.json());
app.use('/', routers);

app.listen(3000, () => {
  console.log('Server is listening on 3000');
});
