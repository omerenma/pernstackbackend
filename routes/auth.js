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
			const check = await db.query("SELECT * FROM users WHERE email = $1", [
				req.body.email,
			]);
			if (check.rows.length > 0) {
				return res
					.status(400)
					.json({ message: "User with this email already exist" });
			}
			// const salt = await bcrypt.genSalt(10);
			const hashPassword = await bcrypt.hash(password, 10);
			// const insert =
			// 	"INSERT INTO users(name, email, phone, password) VALUES ($1, $2, $3, $4) returning *";
			// const value = [name, email, phone, hashPassword];
			await db
				.query(
					"INSERT INTO users(name, email, phone, password) VALUES ($1, $2, $3, $4) RETURNING *",
					[name, email, phone, hashPassword]
				)
				.then((response) => {
					const token = jwt_generator(response.rows[0]);
					return res.status(201).json({ token });
				})
				.catch((err) => {
					res.json(err.message);
				});
		} catch (error) {
			res.status(500).json({ message: "Internal server error" });
		}
	}
);

// Login user
router.post("/login", async (req, res) => {
	const { email, password } = req.body;
	const select = "SELECT * FROM users WHERE email = $1";
	const value = [email];
	console.log(req.body.email, "email req");
	await db.query(select, [email]).then((user) => {
		console.log(user.rows, "user");
		if (user.rows.length === 0) {
			return res.status(402).json({ message: "Invalid credential" });
		} else {
			const passwordMatch = bcrypt.compare(password, user.rows[0].password);

			if (!passwordMatch) {
				return res.status(4011).json({ message: "Invalid password" });
			} else {
				const token = jwt_generator(user.rows[0]);
				return res.status(200).json({ token, ...user.rows[0] });
			}
		}
	});
});

module.exports = router;
