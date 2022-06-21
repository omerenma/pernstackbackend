const router = require("express").Router();
const { body, validationResult, check } = require("express-validator");
const db = require("../db");
const bcrypt = require("bcryptjs");
const jwt_generator = require("../utils/jwt_generator");

// Register user
router.post(
	"/register",

	check("email").isEmail().withMessage("Not a valid email"),
	check("password")
		.isLength({ min: 7 })
		.withMessage("Password length must be greater 6")
		.matches(/\d/)
		.withMessage("Must contain a number"),
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			errors.errors.map((error) => {
				res.status(400).json({
					message: error.msg,
				});
			});
			return;
		}
		try {
			const { name, email, phone, password } = req.body;
			const hashPassword = await bcrypt.hash(password, 10);
			const check = await db.query("SELECT * FROM users WHERE email = $1", [
				email,
			]);
			if (check.rows.length > 0) {
				return res
					.status(400)
					.json({ message: "User with this email already exist" });
			}
			const insert =
				"INSERT INTO users(name, email, phone, password) VALUES ($1, $2, $3, $4) returning *";
			const value = [name, email, phone, hashPassword];
			console.log(value, "value");
			const newUser = await db.query(insert, value);
			const token = jwt_generator(newUser.rows.id);
			res.status(201).json({ token });
		} catch (error) {
			res.status(500).json({ message: "Internal server error" });
		}
	}
);

// Login user
router.post("/login", async (req, res) => {
	try {
		const { email, password } = req.body;
		const select = "SELECT * FROM users WHERE email = $1";
		const value = [email];
		const user = await db.query(select, value);

		if (user.rows.length === 0) {
			res.json({ message: "Invalid credentials" });
		}
		const passwordMatch = await bcrypt.compare(password, user.rows[0].password);

		if (passwordMatch) {
			const token = jwt_generator(user.rows[0]);
			res.status(200).json({ token, user });
		}
		res.status(401).json({ message: "Invalid password" });
	} catch (error) {}
});

module.exports = router;
