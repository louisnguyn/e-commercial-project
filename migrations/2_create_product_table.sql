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
    userid INT NOT NULL REFERENCES users(id)
);
INSERT INTO product (id, title, price, status, quantity, date, description, category, image, userid) VALUES
(1, 'MacBook Pro', 299, 'Available', 2, '2025-03-22', 'Like new', 'Electronics', '/images/macbookPro.jpeg',1),
(2, 'iPhone 13', 999, 'Unavailable', 3, '2025-03-15', '80% battery', 'Electronics', '/images/iphone13.jpeg',1),
(3, 'Python textbook', 199, 'Available', 5, '2025-04-10', 'Python programming for beginners', 'Textbooks', '/images/textbook.jpeg',1),
(4, 'Backpack', 65, 'Available', 50, '2025-04-01', 'Have used for 2 years, fit with laptop', 'Accessories', '/images/bag.jpeg',1),
(5, 'Ballpoint Pen', 2, 'Available', 100, '2025-04-05', 'Blue ink, smooth writing', 'Stationery', '/images/pen.jpeg',1),
(6, 'Mac Mini', 299, 'Available', 4, '2025-03-22', 'Sealed', 'Electronics', '/images/macmini.jpeg',1);
SELECT setval('product_id_seq', (SELECT MAX(id) FROM product));