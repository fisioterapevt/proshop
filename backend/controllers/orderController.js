const Order = require("../models/orderModel");

//* @desc  Create new order
//* @route  POST /api/orders
//* @access  Private
const addOrderItems = async (req, res) => {
	try {
		const {
			orderItems,
			shippingAddress,
			paymentMethod,
			itemsPrice,
			taxPrice,
			shippingPrice,
			totalPrice,
		} = req.body;
		if (orderItems && orderItems === 0) {
			res.status(400).json({ message: "No order items" });
			return;
		} else {
			const order = new Order({
				orderItems,
				user: req.user._id,
				shippingAddress,
				paymentMethod,
				itemsPrice,
				taxPrice,
				shippingPrice,
				totalPrice,
			});

			const createdOrder = await order.save();

			res.status(201).json(createdOrder);
		}
	} catch (error) {
		res.status(404).json({ message: error.message });
		console.log(error);
	}
};

//* @desc  Get order by ID
//* @route  GET /api/orders/:id
//* @access  Private
const getOrderById = async (req, res) => {
	try {
		const order = await Order.findById(req.params.id).populate(
			"user",
			"name email"
		);
		if (order) {
			res.json(order);
		} else {
			res.status(404).json({ message: "Order not found" });
		}
	} catch (error) {
		res.status(404).json({ message: error.message });
		console.log(error);
	}
};

//* @desc  Update order to paid
//* @route  GET /api/orders/:id/play
//* @access  Private
const updateOrderToPay = async (req, res) => {
	try {
		const order = await Order.findById(req.params.id);
		if (order) {
			order.isPaid = true;
			order.paidAt = Date.now();
			order.paymentResult = {
				id: req.body.id,
				status: req.body.status,
				update_time: req.body.update_time,
				email_address: req.body.payer.email_address,
			};

			const updatedOrder = await order.save();

			res.json(updatedOrder);
		} else {
			res.status(404).json({ message: "Order not found" });
		}
	} catch (error) {
		res.status(404).json({ message: error.message });
		console.log(error);
	}
};

//* @desc  Get logged in user orders
//* @route  GET /api/orders/myorders
//* @access  Private
const getMyOrders = async (req, res) => {
	try {
		const orders = await Order.find({ user: req.user._id });
		res.json(orders);
	} catch (error) {
		res.status(404).json({ message: error.message });
		console.log(error);
	}
};

module.exports = {
	addOrderItems,
	getOrderById,
	updateOrderToPay,
	getMyOrders,
};
