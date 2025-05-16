CREATE TABLE review (
  id SERIAL PRIMARY KEY,
  productid INT REFERENCES product(id) ON DELETE CASCADE,
  sellerid INT REFERENCES users(id) ON DELETE CASCADE,
  userid INT REFERENCES users(id) ON DELETE CASCADE,
  rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
  feedback TEXT,
  createdat TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);