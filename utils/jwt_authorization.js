const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = async (req, res, next) => {
	// Get the token from the header
	const jwtToken = req.header("token");
	// if there is no token return
	if (!jwtToken) {
		return res.status(403).json("You are not authorized to view this resource");
	}

	// Token verification
	try {
		const payload = jwt.verify(jwtToken, process.env.secret);
		req.user = payload.user;
		next();
	} catch (error) {
		res.status(403).json("Not Authorized");
	}
	next();
};
