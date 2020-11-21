const Product = require("../models/productModel");

//* @desc  Fetch all products
//* @route  GET /api/products
//* @access  Public
const getProducts = async (req, res) => {
	try {
		const products = await Product.find({});
		res.json(products);
	} catch (error) {
		res.status(404).json({ message: "Products not found" });
		console.log(error);
	}
};

//* @desc  Fetch single product
//* @route  GET /api/products:id
//* @access  Public
const getProductById = async (req, res) => {
	try {
		const product = await Product.findById(req.params.id);
		res.json(product);
	} catch (error) {
		res.status(404).json({ message: "Product not found" });
		console.log(error);
	}
};

module.exports = { getProducts, getProductById };
