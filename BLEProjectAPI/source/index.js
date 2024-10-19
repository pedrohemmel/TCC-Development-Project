const express = require('express');
const app = express();
require('dotenv').config()

port = process.env.LOCAL_PORT

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});