const mongoose = require('mongoose');

const connectDatabase = () => {
  mongoose
    .connect(process.env.DB_CONNECTION, {
      useNewUrlParser: true,
      useFindAndModify: false,
      useCreateIndex: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log('MongoDb Connection Successful');
    })
    .catch((err) => {
      console.log(err);
    });
};
module.exports = connectDatabase;
