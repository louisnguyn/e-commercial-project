CREATE TABLE IF NOT EXISTS product(
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    price NUMERIC(10, 2) NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'Available',
    quantity INT NOT NULL,
    date DATE NOT NULL,
    description TEXT NOT NULL,
    category VARCHAR(100) NOT NULL,
    image text ,
    userId INT NOT NULL REFERENCES users(id)
);