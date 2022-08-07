CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email varchar(50) UNIQUE NOT NULL,
    name varchar(50) NOT NULL
);
CREATE TABLE federated_credentials (
    user_id UUID REFERENCES users (id) ON DELETE CASCADE,
    provider varchar(500) NOT NULL,
    subject varchar(500) NOT NULL,
    PRIMARY KEY (provider, subject)
);
CREATE TABLE maps (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title varchar(50) NOT NULL,
    user_id UUID REFERENCES users (id)
);
CREATE TABLE nodes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    content varchar(500),
    parent_id UUID,
    map_id UUID REFERENCES maps (id)
);
