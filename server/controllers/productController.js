const asyncWrapper = require('../helpers/asyncWrapper');
const Product = require('../models/Product');
const Price = require('../models/Price');
const cheerio = require('cheerio');
const axios = require('axios');
const CustomError = require('../helpers/CustomError');
const inputHelper = require('../helpers/inputHelpers');
const n11ProductId = require('../helpers/n11ProductId');
const n11ProductPrice = require('../helpers/n11ProductPrice');

const products = asyncWrapper(async (req, res, next) => {
  const data = await Product.aggregate([
    {
      $lookup: {
        from: 'prices',
        as: 'prices',
        let: { local_id: '$_id' },
        pipeline: [
          { $match: { $expr: { $eq: ['$$local_id', '$product'] } } },
          { $sort: { createdAt: -1 } },
          { $limit: 1 },
        ],
      },
    },
  ]);

  if (!data) {
    return next(new CustomError('Can not get products', 400));
  }

  return res.status(200).json({
    data,
  });
});

const productDetail = asyncWrapper(async (req, res, next) => {
  const productId = req.params.productId;
  const product = await Product.findOne({ _id: productId });

  if (!product) {
    return next(new CustomError('Page not found!', 404));
  }

  const prices = await Price.find({ product: productId }, null, { sort: { createdAt: 1 } });

  return res.status(200).json({
    product,
    prices,
  });
});

const newProduct = asyncWrapper(async (req, res, next) => {
  if (!inputHelper.validateInputs(req)) {
    return next(new CustomError('Check your inputs. All fields are required.', 400));
  }

  const info = req.body;

  if (info.url.includes('n11.com')) {
    const productId = await n11ProductId(req, res, next);
    info.url = `https://www.n11.com/component/render/newProductPriceArea?productId=${productId}`;
    const productPrice = await n11ProductPrice(req, res, next);

    const newData = await Product.create({
      name: info.name,
      url: info.url,
      selector: info.selector,
    });

    const price = await Price.create({
      product: newData._id,
      price: productPrice,
    });

    return res.status(200).json({
      success: true,
      data: {
        newData,
        price,
      },
    });
  }

  const newData = await Product.create({
    name: info.name,
    url: info.url,
    selector: info.selector,
  });

  const html = axios.get(newData.url);
  const $ = cheerio.load(html.data);
  const priceText = $(newData.selector).text().trim();

  const price = await Price.create({
    product: newData._id,
    price: priceText,
  });

  res.status(200).json({
    success: true,
    data: {
      newData,
      price,
    },
  });
});

module.exports = { products, productDetail, newProduct };
