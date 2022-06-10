const { Pool } = require("pg");

const isProduction = process.env.NODE_ENV === "production";

const connectionString = `postgresql://${process.env.PGUSER} : ${process.env.PGPASSWORD}@${process.env.PGHOST}:${process.env.PGPORT}/${process.env.PGDATABASE}`;

const pool = new Pool({
	user: "postgres",
	host: "localhost",
	database: "yelp",
	password: "omerenma1",
	port: 5432,
	// connectionString: isProduction ? process.env.DATABASE_URL : connectionString,
	ssl:{
		rejectUnauthorized:false
	}
});

module.exports = {
	query: (text, params) => pool.query(text, params),
	pool: pool,
};
