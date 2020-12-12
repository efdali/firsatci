const asyncWrapper = require('../helpers/asyncWrapper');
const Product = require('../models/Product');
const Price = require('../models/Price');
const cheerio = require('cheerio');
const axios = require('axios');

const products = asyncWrapper(async (req, res, next) => {
  const data = await Product.find({});

  if (!data) {
    return next(new CustomError('can not get products', 400));
  }

  return res.status(200).json({
    data,
  });
});

const productDetail = asyncWrapper(async (req, res, next) => {
  const productId = req.params.productId;
  const product = await Product.findOne({ _id: productId });

  if (!product) {
    return next(new CustomError('Product not found', 404));
  }

  const prices = await Price.find({ product: productId });

  return res.status(200).json({
    product,
    prices,
  });
});

const newProduct = asyncWrapper(async (req, res, next) => {
  const info = req.body;
  const newData = await Product.create({
    url: info.url,
    selector: info.selector,
  });

  const html = await axios.get(newData.url);
  const $ = cheerio.load(html.data);
  const priceText = $(newData.selector).text().trim();
  const price = await Price.create({
    product: newData._id,
    price: priceText,
  });

  return res.status(200).json({
    success: true,
    data: {
      newData,
      price,
    },
  });
});

module.exports = { products, productDetail, newProduct };
