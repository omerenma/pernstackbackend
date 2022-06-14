const { Pool } = require("pg");
const pool = new Pool();

const createReviewsTable = `
    CREATE TABLE IF NOT EXISTS reviews (
        id SERIAL PRIMARY KEY,
        restaurants_id int REFERENCES restaurants (id),
        name varchar(50) not null ,
        location varchar(50) not null,
        price_range int not null
    );
    `;

const createProduct = `
    CREATE TABLE IF NOT EXISTS products (
        id SERIAL PRIMARY KEY,
        name varchar(50) not null 
        
    );
    `;

module.exports = {
	createReviewsTable,
	createProduct,
};
