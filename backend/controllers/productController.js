import asyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProduct = asyncHandler(async (req, res, next) => {
  const products = await Product.find({});
  res.json(products);
});

// @desc    Fetch single products
// @route   GET /api/products/:id
// @access  Public
const getProductById = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProductById = asyncHandler(async (req, res, next) => {
  const product = await Product.findByIdAndDelete(req.params.id);
  if (product) {
    return res.json({ message: `Product ${product.name} permenantly deleted` });
  }
  res.status(404);
  throw new Error('Product not found');
});

// @desc    Create a product
// @route   POST /api/products/
// @access  Private/Admin
const createProduct = asyncHandler(async (req, res, next) => {
  const product = new Product({
    name: 'Sample Name',
    price: 0,
    user: req.user._id,
    image: '/images/sample.png',
    brand: 'Sample Brand',
    category: 'Sample Category',
    countInStock: 0,
    numReviews: 0,
    description: 'Sample Description',
  });
  const createdProduct = await product.save();

  if (createdProduct) {
    return res.status(201).json(createdProduct);
  }
  res.status(400);
  throw new Error("Couldn't create product");
});

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = asyncHandler(async (req, res, next) => {
  const { name, price, description, image, brand, category, countInStock } = req.body;
  const updatedProduct = await Product.updateOne({ _id: req.params.id }, req.body);

  // const product = await Product.findById(req.params.id);
  // if (product) {
  //   product.name
  // }
  // const product = new Product({
  //   name: 'Sample Name',
  //   price: 0,
  //   user: req.user._id,
  //   image: '/images/sample.jpg',
  //   brand: 'Sample Brand',
  //   category: 'Sample Category',
  //   countInStock: 0,
  //   numReviews: 0,
  //   description: 'Sample Description',
  // });

  // const createdProduct = await product.save();

  if (updatedProduct.n > 0) {
    const product = await Product.findById(req.params.id);
    return res.json(product);
  }
  res.status(404);
  throw new Error('Failed update');
});

export { getProduct, getProductById, deleteProductById, createProduct, updateProduct };
