const express = require("express");
const router = express.Router();
const db = require("../db");

// Get all restaurants

router.get("/restaurants", async (req, res) => {
	// const { rows } = await db.query("SELECT * FROM restaurants");
	// if (rows.length > 0) {
	// 	res.status(200).json(rows);
	// } else {
	// 	res.status(200).json({ message: "Something went wrong" });
	// }
	res.send("Hello world")
});

// Get a restaurant
router.get("/:id", async (req, res) => {
	const { id } = req.params;

	const { rows } = await db.query("SELECT * FROM restaurants WHERE id = $1", [
		id,
	]);
	res.status(200).json(rows);
});

// Post a restaurant

router.post("/", async (req, res) => {
	const result = await db.query(
		'INSERT INTO restaurants (name, location, price_range) values("Chicken", "Gombe", 5)'
	);
	res.send(result);
});

// Edit a restaurant

router.put("/:id", (req, res) => {});

// Delete a restaurant

router.delete("/", (req, res) => {});
module.exports = router;
