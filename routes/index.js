const express = require("express");
const router = express.Router();
const db = require("../db");

// Get all restaurants

router.get("/", async(req, res) => {
	const {rows} = await db.query("SELECT * FROM restaurants")
	if(rows.length > 0){
		res.status(200).json(rows)
	}else{
		res.status(200).json({message:"Something went wrong"})
	}
	
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

router.post("/", (req, res) => {
	const { name, location } = req.body;
});

// Edit a restaurant

router.put("/:id", (req, res) => {});

// Delete a restaurant

router.delete("/", (req, res) => {});
module.exports = router;
