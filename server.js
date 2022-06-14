const express = require("express");
require("dotenv").config();
const app = express();
const bodyParser = require("body-parser");
const router = require("./routes/index");

app.use(express.json());

app.use("/api/v1", router);

const port = process.env.PORT || 4000

app.listen(port, () => {
	console.log("Servers running on port" + " " + port);
});
