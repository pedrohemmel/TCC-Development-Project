const express = require('express');
const mysql = require('mysql2');
const app = express();
require('dotenv').config()

// Configuração da conexão com o banco de dados MySQL
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

// Conectando ao banco de dados
db.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err.stack);
    return;
  }
  console.log('Conectado ao banco de dados MySQL como ID:', db.threadId);
});

module.exports = {
    db
}

// Exemplo de uma rota que faz uma consulta ao banco de dados
app.get('/users', (req, res) => {
  db.query('SELECT * FROM users', (err, results) => {
    if (err) {
      return res.status(500).send('Erro ao buscar dados: ' + err);
    }
    res.json(results);
  });
});
