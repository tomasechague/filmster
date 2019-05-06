function getAll() {
    return fetch('/api/v1/movies')
        .then(result => result.json())
}


function createMovie(movie){
	const año = movie.year.toString().slice(10, 15);
	const data = JSON.stringify({ 
		title: movie.title, 
		description: movie.plot, 
		year: año, 
		country: movie.country, 
		runtime: movie.runtime, 
		language: movie.language, 
		generes: movie.generes, 
		writers: movie.writers, 
		directors: movie.directors 
	})
	
	return fetch('/api/v1/movies', {
        method: 'POST',
        body:    data,
        headers: { 'Content-Type': 'application/json' },
    })
	.then(res => res)
    .then(json => console.log(json));
}    

function deleteMovie(id){
	const url = '/api/v1/movies/'+id
	return fetch(url, {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'},
	})
	.then(res => res)
    .then(json => console.log(json));
}

export default {
    getAll,
    createMovie,
	deleteMovie
}
