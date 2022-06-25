const express = require("express");
require("dotenv").config();
const app = express();
const cors = require('cors')
const bodyParser = require("body-parser");
// Restaurants routes
const restaurants = require("./routes/index");
// Review routes
const reviews = require("./routes/reviews");
const auth = require('./routes/auth')

app.use(cors())
app.use(express.json());

app.use("/api/v1", restaurants);
app.use("/api/v1", reviews);
// Register and Login route
app.use('/api/v1/auth', auth)

const port = process.env.PORT || 4000;

app.listen(port, () => {
	console.log("Servers running on port" + " " + port);
});
