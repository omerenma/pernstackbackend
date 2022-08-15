const { Pool, Client } = require("pg");
const { createReviewsTable, createProduct, createUserTable } = require("./db");
const { Sequelize } = require("sequelize");
require("dotenv").config();

const isProduction = process.env.NODE_ENV === "production";

const connectionString = `postgresql://${process.env.PGUSER}:${process.env.PGPASSWORD}@${process.env.PGHOST}:${process.env.PGPORT}/${process.env.PGDATABASE}`;

const pool = new Pool({
	connectionString: isProduction
		? process.env.HEROKU_POSTGRESQL_JADE_URL
		: connectionString,
	ssl: {
		rejectUnauthorized: false,
	},
});

pool.connect();

const sequelize = new Sequelize({
	dialect: "postgres",
	storage: process.env.HEROKU_POSTGRESQL_JADE_URL,
	dialectOptions: {
		ssl: {
			require: true,
			rejectUnauthorized: false,
		},
	},
});

module.exports = {
	query: (text, params) => pool.query(text, params),
	pool,
	sequelize,
};

// module.exports = pool;
