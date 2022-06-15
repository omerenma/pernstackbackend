const { Pool } = require("pg");
const pool = new Pool();

const createReviewsTable = `
    CREATE TABLE IF NOT EXISTS reviews (
        id BIGSERIAL NOT NULL PRIMARY KEY,
        restaurants_id int not null REFERENCES restaurants (id),
        name varchar(50) not null ,
        review text not null,
        rating int check(rating >=1 and rating <=5) not null
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
