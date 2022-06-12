const { Pool, Client } = require("pg");
require('dotenv').config()

const isProduction = process.env.DATABASE_URL

const connectionString = `postgresql://${process.env.PG_USER}:${process.env.PG_PASSWORD}@${process.env.PG_HOST}:${process.env.PG_PORT}/${process.env.PG_DATABASE}`;

const pool = new Pool({
	connectionString: process.env.NODE_ENV === 'production' ? isProduction : connectionString,
	ssl: {
		rejectUnauthorized: false,
	},
});
// pool.connect();



module.exports = {
	query: (text, params) => pool.query(text, params),
	pool: pool,
};
