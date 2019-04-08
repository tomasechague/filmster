const Sequelize = require('sequelize')

const db = require('../db.js')

const Movie = db.define('Movie', {
	// attributes
	title: {
		type: Sequelize.STRING,
		allowNull: false
	},
	description: {
		type: Sequelize.STRING
	},
	year: {
		type: Sequelize.INTEGER,
		allowNull: false
	},
	runtime: {
		type: Sequelize.INTEGER,
		allowNull: false
	},
	country: {
		type: Sequelize.STRING,
		allowNull: false
	},
	language: {
		type: Sequelize.STRING,
		allowNull: false
	},
	genres: {
		type: Sequelize.JSON
	},
	directors: {
		type: Sequelize.JSON
	},
	writers: {
		type: Sequelize.JSON
	}
}, {
  tableName: 'Movie'
})

const initMovies = () => {
	Movie.sync({ force: true }).then(() =>
		Movie.create({
			title: 'Back to the Future',
			description: 'Marty McFly, a 17-year-old high school student, is accidentally sent thirty years into the past in a time-traveling DeLorean invented by his close friend, the maverick scientist Doc Brown.',
			year: 1985,
			runtime: 116,
			country: 'United States',
			language: 'English',
			genres: ['Adventure', 'Comedy', 'Science Fiction'],
			directors: ['Robert Zemeckis'],
			writers: ['Robert Zemeckis', 'Bob Gale']
		})
	)
	Movie.sync({ force: true }).then(() =>
		Movie.create({
			title: 'Back to the Future Part II',
			description: 'After visiting 2015, Marty McFly must repeat his visit to 1955 to prevent disastrous changes to 1985...without interfering with his first trip.',
			year: 1989,
			runtime: 108,
			country: 'United States',
			language: 'English',
			genres: ['Adventure', 'Comedy', 'Science Fiction'],
			directors: ['Robert Zemeckis'],
			writers: ['Robert Zemeckis', 'Bob Gale']
		})
	)
}


const getAll = () => Movie.findAll().then(movies => movies)

const create = (data) =>
	Movie.sync().then(() =>
		Movie.create(data)
	)

const MovieModel = {
	Movie: Movie,
	initMovies: initMovies,
	getAll: getAll,
	create: create
}

module.exports = MovieModel