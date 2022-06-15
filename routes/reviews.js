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
	const { restaurants_id } = req.params;
	const select_reviews = `SELECT * FROM reviews WHERE id = ${restaurants_id}  `;
	try {
		const result = await db.query(select_reviews);
        res.json(result)
	} catch (error) {
        res.send(error.message)
    }
});

module.exports = router;
