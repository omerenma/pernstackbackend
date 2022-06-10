const express = require("express");
require("dotenv").config();
const app = express();
const bodyParser = require("body-parser");
const router = require("./routes/index");

app.use(express.json());

app.use("/api/v1/restaurants", router);

const port = process.env.PORT || 5000;

app.listen(port, () => {
	console.log("Server running on port" + " " + port);
});
