const express = require('express')
const router = require('./router.js')

const app = express()

//Useful to define json syntax to the rest of the code
app.use(express.json())
app.use(router)

app.get('/', (_request, response) => response.status(200).send('Olá, Mundo!'))

module.exports = app