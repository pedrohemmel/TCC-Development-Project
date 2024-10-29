CREATE DATABASE ble_project_db;

USE ble_project_db;

-- Tabela de Dispositivos
CREATE TABLE Devices (
    id_device INT PRIMARY KEY AUTO_INCREMENT,
    first_seen DATETIME,
    last_seen DATETIME
);

-- Tabela de Localizações dos Beacons
CREATE TABLE Beacon_Locations (
    local_beacon_id INT PRIMARY KEY AUTO_INCREMENT,
    location_name VARCHAR(100) NOT NULL
);

-- Tabela de Detecção de Dispositivos
CREATE TABLE Device_Detection (
    detection_id INT PRIMARY KEY AUTO_INCREMENT,
    id_device INT NOT NULL,
    local_beacon_id INT NOT NULL,
    date_time_in_beacon DATETIME NOT NULL,
    dwell_time INT, -- Tempo de permanência em segundos
    FOREIGN KEY (id_device) REFERENCES Devices(id_device),
    FOREIGN KEY (local_beacon_id) REFERENCES Beacon_Locations(local_beacon_id)
);

-- Tabela de Fluxo Temporal
CREATE TABLE Time_Flow (
    time_slot DATETIME NOT NULL,
    local_beacon_id INT NOT NULL,
    total_devices_detected INT DEFAULT 0,
    average_dwell_time INT DEFAULT 0, -- Tempo médio de permanência em segundos
    PRIMARY KEY (time_slot, local_beacon_id),
    FOREIGN KEY (local_beacon_id) REFERENCES Beacon_Locations(local_beacon_id)
);

-- Tabela de Eventos e Alertas
CREATE TABLE Events_Alerts (
    event_id INT PRIMARY KEY AUTO_INCREMENT,
    local_beacon_id INT NOT NULL,
    date_time_event DATETIME NOT NULL,
    event_type VARCHAR(50),
    description TEXT,
    resolved BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (local_beacon_id) REFERENCES Beacon_Locations(local_beacon_id)
);

