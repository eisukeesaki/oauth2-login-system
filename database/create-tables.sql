CREATE TABLE users (
    id UUID PRIMARY KEY,
    email varchar(50) NOT NULL UNIQUE,
    name varchar(50) NOT NULL
);
CREATE TABLE maps (
    id UUID PRIMARY KEY,
    title varchar(50) NOT NULL UNIQUE,
    user_id UUID REFERENCES users (id)
);
CREATE TABLE nodes (
    id UUID PRIMARY KEY,
    content varchar(500),
    parent_id UUID,
    map_id UUID REFERENCES maps (id)
);
