const express = require("express");
const router = express.Router();
const db = require("../db");

// Get all restaurants

router.get('/', (req, res) =>{
	res.send('Welcome to our CRUD')
})
router.get("/restaurants", async (req, res) => {
	const { rows } = await db.pool.query("SELECT * FROM restaurants");
	if (rows.length > 0) {
		res.status(200).json(rows);
	} else {
		res.status(200).json({ message: "Something went wrong" });
	}
});

// Get a restaurant
router.get("/restaurants/:id", async (req, res) => {
	const { id } = req.params;

	const { rows } = await db.query("SELECT * FROM restaurants WHERE id = $1", [
		id,
	]);
	res.status(200).json(rows);
});

// Post a restaurant

router.post("/restaurants", async (req, res) => {
	const { name, location, price_range } = req.body;
	const insert =
		"INSERT INTO restaurants(name, location, price_range) VALUES($1, $2, $3)";
	const values = [name, location, price_range];

	const result = await db.query(insert, values);
	res.send(result.rowCount);
});

// Edit a restaurant

router.put("/:id", (req, res) => {});

// Delete a restaurant

router.delete("/", (req, res) => {});
module.exports = router;
