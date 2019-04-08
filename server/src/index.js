const path = require('path')

const morgan = require('morgan')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')

const MovieModel = require('./models/movie.js')

const movieRouter = require('./routes/movie.js')

const client = path.resolve(__dirname, '..', '..', 'client', 'src')

app.use(bodyParser.json())

app.use(morgan('dev'))
app.use(express.static(client))

// Rutas
app.use('/api/v1/movies', movieRouter)

app.listen(3000, function (server) {
    console.log('Server started')
})

MovieModel.initMovies()