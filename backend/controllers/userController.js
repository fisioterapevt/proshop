const User = require("../models/userModel");

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
				token: null,
			});
		} else {
			res.status(401).json({ message: "Invalid email or password" });
		}
	} catch (error) {
		res.status(401).json({ message: error });
		console.log(error);
	}
};

module.exports = { authUser };