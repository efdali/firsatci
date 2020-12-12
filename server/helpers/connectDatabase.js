const mongoose = require('mongoose');

const connectDatabase = () => {
  mongoose
    .connect(
      'mongodb+srv://amdin:cokguclubirpassword@cluster0.qzuqn.mongodb.net/firsatci?retryWrites=true&w=majority',
      {
        useNewUrlParser: true,
        useFindAndModify: false,
        useCreateIndex: true,
        useUnifiedTopology: true,
      },
    )
    .then(() => {
      console.log('MongoDb Connection Successful');
    })
    .catch((err) => {
      console.log(err);
    });
};
module.exports = connectDatabase;
