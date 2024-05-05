const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middlewares/catchAssyncError");
const APIFeatures = require("../utils/apiFeatures");

//Get Product - {{Base_url}}/api/v1/products
exports.getProducts = async (req, res, next) => {
  const apiFeatures = new APIFeatures(Product.find(), req.query)
    .search()
    .filter()
    .paginate(resPerPage);
  const products = await apiFeatures.query;
  res.status(200).json({
    success: "true",
    count: products.length,
    products,
  });
};

//create new product - /api/v1/product/new
exports.newProduct = catchAsyncError(async (req, res, next) => {
  const product = await Product.create(req.body);
  res.status(201).json({
    success: true,
    product,
  });
});

//get single products - {{Base_url}}/api/v1/product/6634ec47953fe0c881cdb8d0
exports.getSingleProduct = async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("Product not found test", 400));
  }
  res.status(201).json({
    success: true,
    product,
  });
};

//update product - {{Base_url}}/api/v1/product/6634ec47953fe0c881cdb8d0
exports.updateProduct = async (req, res, next) => {
  let product = await Product.findById(req.params.id);
  if (!product) {
    return res.status(404).json({
      success: false,
      message: "Product not found",
    });
  }
  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    success: true,
    product,
  });
};

//delete product - {{Base_url}}/api/v1/product/6634ff7b6bde0152bd17b7a7
exports.deleteProduct = async (req, res, next) => {
  let product = await Product.findById(req.params.id);
  if (!product) {
    return res.status(404).json({
      success: false,
      message: "Product not found",
    });
  }
  await Product.findByIdAndDelete(req.params.id);
  res.status(200).json({
    success: true,
    message: "Product deleted",
  });
};
