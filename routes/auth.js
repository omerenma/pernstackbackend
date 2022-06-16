const router = require("express").Router();
const db = require("../db");
const bcrypt = require("bcryptjs");
const  jwt_generator = require('../utils/jwt_generator')
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
		const newUser = await db.query(insert, value);
        const token = jwt_generator(newUser.rows.id)
		res.status(201).json({token});
	} catch (error) {
		res.status(500).json({ message: "Internal server error" });
	}
});

// Login user

router.post("/login", async (req, res) => {});

module.exports = router;
