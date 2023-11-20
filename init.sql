-- init.sql
CREATE TABLE IF NOT EXISTS records (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    contact INT NOT NULL,
    address TEXT NOT NULL
);
