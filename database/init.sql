CREATE TABLE users (
    id_user SERIAL PRIMARY KEY,
    pseudo VARCHAR(15) NOT NULL UNIQUE,
    email VARCHAR(255) UNIQUE NOT NULL,
    hash_password VARCHAR(150) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE score (
    id_score SERIAL PRIMARY KEY,
    wpm REAL,
    accuracy REAL,
    duration_seconds REAL NOT NULL,
    amount_mistakes INT NOT NULL,
    id_user INT REFERENCES users,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);