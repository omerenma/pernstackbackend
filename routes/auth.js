const router = require("express").Router();
const db = require("../db");
const bcrypt = require("bcryptjs");

// Register user

router.post("/register", async (req, res) => {
	try {
		const { name, email, password } = req.body;
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
			"INSERT INTO users(name, email, password) VALUES ($1, $2, $3) returning *";
		const value = [name, email, hashPassword];
		const post = await db.query(insert, value);
		res.status(201).json(post);
	} catch (error) {
		res.status(500).json({ message: "Internal server error" });
	}
});

// Login user

router.post("/login", async (req, res) => {});

module.exports = router;
