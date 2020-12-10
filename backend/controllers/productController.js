const Product = require("../models/productModel");

//* @desc  Fetch all products
//* @route  GET /api/products
//* @access  Public
const getProducts = async (req, res) => {
	const pageSize = 2;
	const page = Number(req.query.pageNumber) || 1;

	try {
		const keyword = req.query.keyword
			? {
					name: {
						$regex: req.query.keyword,
						$options: "i",
					},
			  }
			: {};

		const count = await Product.countDocuments({ ...keyword });
		const products = await Product.find({ ...keyword })
			.limit(pageSize)
			.skip(pageSize * (page - 1));

		res.json({ products, page, pages: Math.ceil(count / pageSize) });
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

		if (product) {
			res.json(product);
		} else {
			return res.status(404).json({ message: "Product not found" });
		}
	} catch (error) {
		res.status(404).json({ message: "Product not found" });
		console.log(error);
	}
};

//* @desc  Delete a product
//* @route  DELETE /api/products:id
//* @access  Private/Admin
const deleteProduct = async (req, res) => {
	try {
		const product = await Product.findById(req.params.id);

		if (product) {
			await product.remove();
			res.json("Product removed");
		} else {
			return res.status(404).json({ message: "Product not found" });
		}
	} catch (error) {
		res.status(404).json({ message: "Product not found" });
		console.log(error);
	}
};

//* @desc  Create a product
//* @route  POST /api/products
//* @access  Private/Admin
const createProduct = async (req, res) => {
	try {
		const product = new Product({
			name: "Sample name",
			price: 0,
			user: req.user._id,
			image: "/images/sample.jpg",
			brand: "Sample brand",
			category: "Sample category",
			countInStock: 0,
			numReviews: 0,
			description: "Sample description",
		});

		const createdProduct = await product.save();
		return res.status(201).json(createdProduct);
	} catch (error) {
		res.status(404).json({ message: "Product was not created" });
		console.log(error);
	}
};

//* @desc  Updated  a product
//* @route  PUT /api/products/:id
//* @access  Private/Admin
const updateProduct = async (req, res) => {
	try {
		const { name, price, image, brand, category, countInStock } = req.body;

		const product = await Product.findById(req.params.id);

		if (product) {
			product.name = name;
			product.price = price;
			product.image = image;
			product.brand = brand;
			product.category = category;
			product.countInStock = countInStock;

			const updatedProduct = await product.save();
			return res.json(updatedProduct);
		} else {
			return res.status(404).json({ message: "Product not found" });
		}
	} catch (error) {
		res.status(404).json({ message: "Product was not updated" });
		console.log(error);
	}
};

//* @desc  Create new review
//* @route  POST /api/products/:id/reviews
//* @access  Private
const createProductReview = async (req, res) => {
	try {
		const { rating, comment } = req.body;

		const product = await Product.findById(req.params.id);

		if (product) {
			const alreadyReviewed = product.reviews.find(
				(r) => r.user.toString() === req.user._id.toString()
			);
			if (alreadyReviewed) {
				return res.status(400).json({ message: "Product already reviewed" });
			}

			const review = {
				name: req.user.name,
				rating: Number(rating),
				comment,
				user: req.user._id,
			};

			product.reviews.push(review);

			product.numReviews = product.reviews.length;

			product.rating =
				product.reviews.reduce((acc, item) => item.rating + acc, 0) /
				product.reviews.length;

			await product.save();

			res.status(201).json({ message: "Review added" });
		} else {
			return res.status(404).json({ message: "Product not found" });
		}
	} catch (error) {
		res.status(404).json({ message: "Product was not updated" });
		console.log(error);
	}
};

//* @desc  Get top rated products
//* @route  GET /api/products/top
//* @access  Public
const getTopProducts = async (req, res) => {
	const products = await Product.find({}).sort({ rating: -1 }).limit(3);
	res.json(products);
	try {
	} catch (error) {
		res.status(404).json({ message: "Product was not updated" });
    console.log(error);
	}
};

module.exports = {
	getProducts,
	getProductById,
	deleteProduct,
	createProduct,
	updateProduct,
	createProductReview,
	getTopProducts,
};
