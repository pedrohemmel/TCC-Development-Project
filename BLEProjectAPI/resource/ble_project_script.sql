CREATE DATABASE ble_project_db;

USE ble_project_db;

-- Tabela de Dispositivos
CREATE TABLE Devices (
    id_device VARCHAR(36) PRIMARY KEY,
    first_seen DATETIME,
    last_seen DATETIME
);

-- Tabela de Localizações dos Beacons
CREATE TABLE Beacon_Locations (
    local_beacon_id INT PRIMARY KEY AUTO_INCREMENT,
    location_name VARCHAR(100) NOT NULL
);

-- Tabela de Eventos
CREATE TABLE Events (
    event_id INT PRIMARY KEY AUTO_INCREMENT,
    event_name VARCHAR(100) NOT NULL,
    event_start DATETIME NOT NULL,
    event_end DATETIME,
    location VARCHAR(100),
    description TEXT
);

-- Tabela de Detecção de Dispositivos
CREATE TABLE Device_Detection (
    detection_id INT PRIMARY KEY AUTO_INCREMENT,
    id_device VARCHAR(36) NOT NULL,
    local_beacon_id INT NOT NULL,
    event_id INT NOT NULL,
    date_time_in_beacon DATETIME NOT NULL,
    dwell_time INT, -- Tempo de permanência em segundos
    FOREIGN KEY (id_device) REFERENCES Devices(id_device),
    FOREIGN KEY (local_beacon_id) REFERENCES Beacon_Locations(local_beacon_id),
    FOREIGN KEY (event_id) REFERENCES Events(event_id)
);

-- Tabela de Eventos e Alertas
CREATE TABLE Events_Alerts (
    alert_id INT PRIMARY KEY AUTO_INCREMENT,
    event_id INT NOT NULL,
    local_beacon_id INT NOT NULL,
    date_time_event DATETIME NOT NULL,
    event_type VARCHAR(50),
    description TEXT,
    resolved BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (event_id) REFERENCES Events(event_id),
    FOREIGN KEY (local_beacon_id) REFERENCES Beacon_Locations(local_beacon_id)
);
