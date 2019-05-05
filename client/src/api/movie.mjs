function getAll() {
    return fetch('/api/v1/movies')
        .then(result => result.json())
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
    deleteMovie
}
