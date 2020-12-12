const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  name: {
    type: String,
    required: [true, 'name field is required.'],
  },
  url: {
    type: String,
    required: [true, 'url field is required.'],
    unique: true,
  },
  selector: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('product', ProductSchema);
