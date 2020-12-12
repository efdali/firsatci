const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PriceSchema = new Schema({
  product: {
    type: Schema.Types.ObjectId,
    ref: 'product',
  },
  price: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('price', PriceSchema);
