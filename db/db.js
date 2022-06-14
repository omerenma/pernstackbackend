const {Pool} = require('pg')
const pool = new Pool()

const createReviewsTable = () => {
    const queryText = `
    CREATE TABLE IF NOT EXISTS reviews (
        id SERIAL PRIMARY KEY,
        restaurants_id int REFERENCES restaurants (id),
        name varchar(50) not null ,
        location varchar(50) not null,
        price_range int not null
    );
    `
    pool.query(queryText)
    .then(res => {
        console.log(res)
    })
    .catch(err => {
        console.log(err)
        pool.end
    })
}

module.exports = {
    createReviewsTable
}