const express = require("express");
const router = express.Router();
const db = require("../db");
const Router = require('express-promise-router')

const postgresRouter = new Router()

// Get all restaurants

postgresRouter.get("/", (req, res) => {
	res.send("Welcome to our CRUD");
});
postgresRouter.get("/restaurants", async (req, res) => {
	db.pool
		.query("SELECT * FROM restaurants")
		.then((data) => {
			res.json(data.rows);
		})
		.catch((err) => {
			res.send("err");
		});
});

// Get a restaurant
router.get("/restaurants/:id", async (req, res) => {
	const { id } = req.params;

	const { rows } = await db.pool.query(
		"SELECT * FROM restaurants WHERE id = $1",
		[id]
	);
	res.status(200).json(rows);
});

// Post a restaurant

router.post("/restaurants", async (req, res) => {
	const { name, location, price_range } = req.body;

	const insert =
		"INSERT INTO restaurants(name, location, price_range) VALUES($1, $2, $3) returning * ";
	const values = [name, location, price_range];

	await db.pool
		.query(insert, values)
		.then((data) => {
			res.json({
				messsage: "Restaurant successfully added",
				data: data.rows,
			});
		})
		.catch((err) => {
			res.send(err.messsage);
		});
});

// Edit a restaurant

router.put("/restaurants/:id", async (req, res) => {
	try {
		const { name, location, price_range } = req.body;
		const { id } = req.params;
		const update =
			"UPDATE restaurants  SET name = $1, location = $2, price_range = $3 WHERE id = $4 returning *";
		const values = [name, location, price_range, id];
		const result = await db.pool.query(update, values);
		res.send(result.rows[0]);
	} catch (error) {
		res.send(error.messsage);
	}
});

// Delete a restaurant

router.delete("/restaurants/:id", async (req, res) => {
	try {
		const { id } = req.params;
		const deleteRecord = `DELETE FROM restaurants WHERE id = ${id} `;
		const result = await db.pool.query(deleteRecord);
		if (result.rowCount === 1) {
			res.json({
				messsage: "Record successfully deleted",
			});
		}
	} catch (error) {
		res.send(error.messsage);
	}
});
module.exports = postgresRouter;
