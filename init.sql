USE finalProjectSubst;

CREATE TABLE products(
    id VARCHAR(36) PRIMARY KEY, 
    name VARCHAR(50) UNIQUE NOT NULL,
    description VARCHAR(150) NOT NULL,
    value FLOAT NOT NULL
);

INSERT INTO products(id, name, description, value) VALUES 
('1cf641f0-19a1-4699-94f6-5cc45c061ca8', 'Mochila', 'Mochila Black com compartimento para notebook', 200),
('9dc5bbbd-39f2-49ec-a8c2-7294b31e9385', 'Notebook', 'Core i9, 16 Gb DDR5', 3999.99),
('aee94fdd-fa8b-46c7-a6ad-c01e0f1c567e', 'Caneta', 'Bic Vermelha', 1.85);

CREATE TABLE users(
    id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(100) UNIQUE NOT NULL,
    senha VARCHAR(256) NOT NULL
);

INSERT INTO users(email, senha) VALUES 
('max.sys.pinheiro@gmail.com.br', '123456'),
('teste@teste.com.br', '777888');
-- GRANT ALL PRIVILEGES ON `lab2`.* TO 'test'@'localhost'; # Permite todos os privilegios (SELECT, INSERT, UPDATE e DELETE) para todas as tabelas do db lab2
--FLUSH PRIVILEGES;
