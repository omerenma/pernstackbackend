CREATE TABLE restaurants(
    id serial not null primary  key,
    name varchar(100) not null,
    location varchar(100) not null,
    price_range int not null
);