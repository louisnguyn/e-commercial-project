CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    fullname VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phonenumber VARCHAR(20) NOT NULL,
    address VARCHAR(255) NOT NULL,
    city VARCHAR(100) NOT NULL,
    postcode VARCHAR(10) NOT NULL,
    shippingmethod VARCHAR(50) NOT NULL,
    -- cartsnapshot JSONB NOT NULL,
    subtotal DECIMAL(10,2) NOT NULL,
    status VARCHAR(50) DEFAULT 'Undelivered',
    createdat TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    userid INT NOT NULL REFERENCES users(id)
);