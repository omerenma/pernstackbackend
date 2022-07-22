const express = require("express");
require("dotenv").config();
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const upload = require('express-fileupload')

// Restaurants routes
const restaurants = require("./routes/index");
// Review routes
const reviews = require("./routes/reviews");
const auth = require("./routes/auth");

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(upload())

app.use("/api/v1", restaurants);
app.use("/api/v1", reviews);
// Register and Login route
app.use("/api/v1/auth", auth);

const serverStart = () => {
	try {
		app.listen(process.env.PORT, () => {
			console.log(`server running on port ${process.env.PORT}`);
		});
	} catch (error) {
		console.log(error.message);
	}
};

serverStart();
