const { Pool, Client } = require("pg");
const { createReviewsTable, createProduct, createUserTable } = require("./db");
require("dotenv").config();

const isProduction = process.env.NODE_ENV === "production";

const connectionString = `postgresql://${process.env.PGUSER}:${process.env.PGPASSWORD}@${process.env.PGHOST}:${process.env.PGPORT}/${process.env.PGDATABASE}`;
console.log(connectionString, "connection string");

const pool = new Pool({
	connectionString: isProduction
		? process.env.HEROKU_POSTGRESQL_JADE_URL
		: connectionString,
	ssl: {
		rejectUnauthorized: false,
	},
});

pool.connect();

module.exports = {
	query: (text, params) => pool.query(text, params),
	pool,
};

// module.exports = pool;
