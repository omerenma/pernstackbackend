const { Pool, Client } = require("pg");
const { createReviewsTable, createProduct, createUserTable } = require("./db");
require("dotenv").config();

const isProduction = process.env.NODE_ENV === "production";

const connectionString = `postgresql://${process.env.PGUSER}:${process.env.PGPASSWORD}@${process.env.PGHOST}:${process.env.PGPORT}/${process.env.PGDATABASE}`;

const client = new Client({
	connectionString: isProduction
		? process.env.HEROKU_POSTGRESQL_JADE_URL
		: connectionString,
	ssl: {
		rejectUnauthorized: false,
	},
});

// pool.connect();

module.exports = {
	query: (text, params) => client.query(text, params),
	client,
};

// module.exports = pool;
