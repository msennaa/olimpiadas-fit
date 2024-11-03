CREATE TABLE athlete (
    id UUID PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    cpf CHAR(11) NOT NULL UNIQUE,
    age INTEGER CHECK (age >= 0)
);

CREATE TABLE competition_type (
    id UUID PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);

CREATE TABLE competition (
    id UUID PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    status VARCHAR(50) NOT NULL,
    competition_type_id UUID NOT NULL,
    start_competition TIMESTAMP NOT NULL DEFAULT NOW(),
    end_competition TIMESTAMP,
    FOREIGN KEY (competition_type_id) REFERENCES competition_type(id)
);