const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  url: {
    type: String,
    required: [true, 'URL gereklidir.'],
    unique: [true, 'URL benzersiz olmalıdır.'],
  },
  selector: {
    type: String,
    required: [true, 'Selector gereklidir.'],
    unique: [true, 'Selector benzersiz olmalıdır.'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('product', ProductSchema);
