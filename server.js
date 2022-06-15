const express = require("express");
require("dotenv").config();
const app = express();
const bodyParser = require("body-parser");
// Restaurants routes
const restaurants = require("./routes/index");
// Review routes
const reviews = require("./routes/reviews");

app.use(express.json());

app.use("/api/v1", restaurants);
app.use("/api/v1", reviews);

const port = process.env.PORT || 4000;

app.listen(port, () => {
	console.log("Servers running on port" + " " + port);
});
