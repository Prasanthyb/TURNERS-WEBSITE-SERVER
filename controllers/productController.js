const Product = require('../models/Product');
const CustomError = require("../utilities/CustomError");


// ~~~~~~~~~~~~~GET ALL PRODUCTS FROM products COLLECTION~~~~~~~~~~~~~~~

const getProducts = async (req, res) => {
  try {
    const prod = await Product.find({});
    if (!prod || prod.length === 0) {
      const error = new CustomError(`Something went wrong, try again later.`, 500);
      return res.status(error.statusCode).json({
        success: false,
        error: error.message
      });
    }
    res.status(200).json({
      success: true,
      count: prod.length,
      products: prod
    });
  } catch (error) {
    // Handle any unexpected errors
    console.error(error);
    const customError = new CustomError(`Something went wrong, try again later.`, 500);
    res.status(customError.statusCode).json({
      success: false,
      error: customError.message
    });
  }
};


// ~~~~~~~~~~~~~GET A SINGLE PRODUCT FROM products COLLECTION~~~~~~~~~~~~~~~

const getSingleProduct = async (req, res) => {
  const prodId = req.params.id;
  const prod = await Product.findById(prodId);

  if (prod) {
    res.json({ product: prod });
  } else {
    res.json({ message: 'Product not found' });
  }
};

const createProduct = async (req, res) => {
  const product = await Product.create(req.body);

  if (Object.keys(product).length !== 0) {
    res.status(200).json({
      success: true,
      product: product
    });
  }
};

// ~~~~~~~~~~~~SENDING MATCHING CARS FROM products COLLECTION TO CLIENT~~~~~~~~~~~~~~~

const getCars = async (req, res) => {
  try {
    const color = req.body.data;
    console.log(color);

    // Use color parameter in the query to filter products by color
    const prod = await Product.find({ color: color });
    console.log(prod)

    if (!prod || prod.length === 0) {
      const error = new CustomError(`No cars found with the specified color.`, 404);
      return res.status(error.statusCode).json({
        success: false,
        error: error.message
      });
    }

    res.status(200).json({
      success: true,
      count: prod.length,
      products: prod
    });
  } catch (error) {
    // Handle any unexpected errors
    console.error(error);
    const customError = new CustomError(`Something went wrong, try again later.`, 500);
    res.status(customError.statusCode).json({
      success: false,
      error: customError.message
    });
  }
};


module.exports = { getProducts, getSingleProduct, createProduct, getCars };
