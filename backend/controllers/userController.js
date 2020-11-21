const User = require("../models/userModel");
const generateToken = require("../utils/generateToken");

//* @desc  Auth user & get token
//* @route  POST /api/users/login
//* @access  Public
const authUser = async (req, res) => {
	try {
		const { email, password } = req.body;
		const user = await User.findOne({ email });
		if (user && (await user.matchPassword(password))) {
			res.json({
				_id: user._id,
				name: user.name,
				email: user.email,
				isAdmin: user.isAdmin,
				token: generateToken(user._id),
			});
		} else {
			res.status(401).json({ message: "Invalid email or password" });
		}
	} catch (error) {
		res.status(401).json({ message: error });
		console.log(error);
	}
};

//* @desc  Register new user
//* @route  POST /api/users
//* @access  Public
const registerUser = async (req, res) => {
	try {
		const { name, email, password } = req.body;

		const userExists = await User.findOne({ email });

		if (userExists) {
			res.status(400).json({ message: "User alredy exists" });
		}
		const user = await User.create({ name, email, password });

		if (user) {
			res.status(201).json({
				_id: user._id,
				name: user.name,
				email: user.email,
				isAdmin: user.isAdmin,
				token: generateToken(user._id),
			});
		} else {
			res.status(400).json({ message: "Invalid user data" });
		}
	} catch (error) {
		res.status(401).json({ message: error });
		console.log(error);
	}
};

//* @desc  Get user & get token
//* @route  POST /api/users/profile
//* @access  Private
const getUserProfile = async (req, res) => {
	try {
		const user = await User.findById(req.user._id);

		if (user) {
			res.json({
				_id: user._id,
				name: user.name,
				email: user.email,
				isAdmin: user.isAdmin,
			});
		} else {
			res.status(401).json({ message: "User not found" });
		}
	} catch (error) {}
};
module.exports = { authUser, registerUser, getUserProfile };
