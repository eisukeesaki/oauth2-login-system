CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
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
    parent_id UUID REFERENCES nodes (id),
    map_id UUID REFERENCES maps (id),
    UNIQUE (map_id, parent_id)
);

INSERT INTO users (id, email, name)
    VALUES
        (gen_random_uuid (), 'rei@nerv.com', 'Rei'),
        (gen_random_uuid (), 'shinji@nerv.com', 'shinji'),
        (gen_random_uuid (), 'asuka@nerv.com', 'Asuka'),
        (gen_random_uuid (), 'tohji@nerv.com', 'Tohji'),
        (gen_random_uuid (), 'kaoru@nerv.com', 'Kaoru'),
        (gen_random_uuid (), 'mari@nerv.com', 'Mari'),
        (gen_random_uuid (), 'gendo@nerv.com', 'Gendo'),
        (gen_random_uuid (), 'john@email.com', 'John'),
        (gen_random_uuid (), 'john@email.jp', 'John');
