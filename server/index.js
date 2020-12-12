const express = require('express');
const cors = require('cors');
const routers = require('./routers');
require('./helpers/connectDatabase')();

const app = express();

app.use(cors());

app.use(express.json());
app.use('/', routers);

app.listen(5000, () => {
  console.log('Server is listening on 3000');
});
