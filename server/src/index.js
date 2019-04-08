const path = require('path');

const morgan = require('morgan');
const express = require('express');
const app = express();

const movieRouter = require('./routes/movie.js');
const client = path.resolve(__dirname, '..', '..', 'client');

app.use(morgan('dev'));
app.use(express.static(path.resolve(client, 'src')));
app.use('/assets', express.static(path.resolve(client, 'assets')));

// Rutas
app.use('/api/v1/movie', movieRouter);

app.listen(3000, function (server) {
    console.log('Server started');
});
