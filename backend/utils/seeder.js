// upload all data at one time

const products = require("../data/products.json");
const Product = require("../models/productModel");
const dotenv = require("dotenv");
const connectDatabase = require("../config/database");

dotenv.config({ path: "backend/config/config.env" });
connectDatabase();

const seedProducts = async () => {
  try {
    await Product.deleteMany();
    console.log("Product deleted");
    await Product.insertMany(products);
    console.log("All products Added");
  } catch (error) {
    console.log(error.message);
  }
  process.exit();
};

seedProducts();
