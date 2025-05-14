CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    fullName VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phoneNumber VARCHAR(20) NOT NULL,
    address VARCHAR(255) NOT NULL,
    city VARCHAR(100) NOT NULL,
    postcode VARCHAR(10) NOT NULL,
    shippingMethod VARCHAR(50) NOT NULL,
    cartSnapshot JSONB NOT NULL,
    subtotal DECIMAL(10,2) NOT NULL,
    status VARCHAR(50) DEFAULT 'Undelivered',
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    userId INT NOT NULL REFERENCES users(id)
);