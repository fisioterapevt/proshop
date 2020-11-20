const express = require("express");
const Product = require("../models/productModel");

const router = express.Router();

//* @desc  Fetch all products
//* @route  GET /api/products
//* @access  Public
router.get("/", async (req, res) => {
	try {
		const products = await Product.find({});
		//res.status(401);
		//res.status(401).json({ message: "Not Authorized" });

		res.json(products);
	} catch (error) {
		res.status(404).json({ message: "Products not found" });
		console.log(error);
	}
});

//* @desc  Fetch single product
//* @route  GET /api/products:id
//* @access  Public
router.get("/:id", async (req, res) => {
	try {
		const product = await Product.findById(req.params.id);
		res.json(product);
	} catch (error) {
		res.status(404).json({ message: "Product not found" });
		console.log(error);
	}
});

module.exports = router;
