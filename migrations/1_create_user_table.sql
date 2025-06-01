CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    fullname VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    phonenumber VARCHAR(15),
    securityquestion VARCHAR(255),
    securityanswer VARCHAR(255),
    role VARCHAR(50) DEFAULT 'user',
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO users (id, fullname, email, password, phonenumber, securityquestion, securityanswer, role)
VALUES 
(1, 'Louis Nguyen', 'louisnguyn@gmail.com', '$2b$10$IASzyn1XZaI4hCVU48U7XeiJfWNTK7m.C82K3kt3PX2LyQks5hC8S', '0415111222', 'What is your girl friend name?', '$2b$10$wmK89rV/5Xv1Be9F5ADMo.uNaB7oM2jq2od6HGF7Jb7M7cZWWZWCG', 'user'),
(2, 'Tracy Nguyen', 'tracynguyn@gmail.com', '$2b$10$O2tB4mQzAQoEbgBl4HsZm.b/NdFJzpELZM5x0/zTVwdOX37cx94xq', '0415111222', 'What is your boy friend name?', '$2b$10$FAtNiYa0/4EsP6y4CdF1XugnKcqLCwsH8D6gIziCD5dHf19UyfHH.', 'user');
