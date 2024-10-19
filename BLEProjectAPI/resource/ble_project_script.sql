CREATE DATABASE ble_project_db;

USE ble_project_db;

CREATE TABLE devices (
    id SERIAL PRIMARY KEY,
    local_name VARCHAR(255) NOT NULL,
    device_id VARCHAR(255) NOT NULL,
    timestamp TIMESTAMP NOT NULL
);

-- Adiciona um índice opcional para acelerar buscas por device_id
CREATE INDEX idx_device_id ON devices (device_id);
