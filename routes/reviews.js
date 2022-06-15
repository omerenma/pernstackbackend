const express = require("express");
const router = express.Router();
const db = require("../db");


// get reviews

router.get('/reviews', async (req, res) =>{
    const select_reviews = 'SELECT * FROM reviews';
    try {
        const result = await db.query(select_reviews)
        res.json(result.rows)
    } catch (error) {
        res.send(error.message)
    } 
})

module.exports = router