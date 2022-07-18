CREATE DATABASE mindnet;
\c mindnet

CREATE TABLE users (
    id serial PRIMARY KEY,
    email varchar(50) NOT NULL,
    name varchar(50) NOT NULL
);
CREATE TABLE maps (
    id serial,
    title varchar(50),
    user_id serial REFERENCES users (id)
);
CREATE TABLE nodes (
    id serial PRIMARY KEY,
    content varchar(1000),
    parent_id serial REFERENCES nodes (id)
);
