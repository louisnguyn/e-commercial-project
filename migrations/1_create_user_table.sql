CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    fullName VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    phoneNumber VARCHAR(15),
    securityQuestion VARCHAR(255),
    securityAnswer VARCHAR(255),
    role VARCHAR(50) DEFAULT 'user',
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);