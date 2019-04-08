function getAll() {
    return fetch('http://localhost:3000/api/v1/movies')
        .then(result => result.json())
}

export default {
    getAll
}
