module.exports = async (req, res, next) => {
	const { name, email, phone, password } = req.body;
	// check a valid email has been entered by the user using reguar expression
	function validatEmail(userEmail) {
		return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userEmail);
	}
	if (req.path === "/api/v1/auth/register") {
		if (![name, email, phone, password].every(Boolean)) {
			return res.json("Missing credentials");
		} else if (req.path === "/api/v1/auth/login") {
			if (![email, password].every(Boolean)) {
				res.json("Missing credentials");
			} else if (!validatEmail(email)) {
				return res.json("Invalid email");
			}
		}
	}
	next();
};
