const jwt = require("jsonwebtoken");
require("dotenv").config();

const jwt_generator = (user) => {
	const payload = {
		user: user,
	};
	return jwt.sign(payload, process.env.secret, { expiresIn: "1hr" });
};

module.exports = jwt_generator;
