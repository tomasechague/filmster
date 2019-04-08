const express = require('express')
const MovieModel = require('../models/movie')
const router = express.Router()

router.get('/', function (req, res) {
	MovieModel.getAll().then((movies) =>
		res.status(200).send(movies)
	).catch(_ => res.status(400).send('Error al obtener las películas'))
})

router.post('/', function (req, res) {
	MovieModel.create(req.body).then(data =>
		res.status(201).send(data)
	).catch(_ => res.status(400).send('Error al crear película'))
})

module.exports = router
