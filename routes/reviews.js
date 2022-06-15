const express = require("express");
const router = express.Router();
const db = require("../db");

// Select sql

// get reviews

router.get("/reviews", async (req, res) => {
	const select_reviews = "SELECT * FROM reviews";
	try {
		const result = await db.query(select_reviews);
		res.json(result.rows);
	} catch (error) {
		res.send(error.message);
	}
});

// Get review for a particular restaurants
router.get("/reviews/:id", async (req, res) => {
	const { id } = req.params;
	const select_reviews = "SELECT * FROM reviews WHERE restaurants_id = $1  ";
	try {
		const result = await db.query(select_reviews, [id]);
		res.json({
			data: result.rows,
			total_review: result.rowCount,
		});
	} catch (error) {
		res.send(error.message);
	}
});

// Add review

router.post("/reviews", async (req, res) => {
	try {
		const { name, review, rating } = req.body;
		const { restaurants_id } = req.params;
		const insert =
			"INSERT INTO reviews(restaurants_id, name, review,  rating) VALUES($1, $2, $3, $4) returning *";
		const values = [restaurants_id, name, review, rating];
		const result = await db.query(insert, values);
		res.send(result);
	} catch (error) {
		res.send(error.message)
	}
});
module.exports = router;
