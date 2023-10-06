const express = require('express');
const fs = require('fs');
const Fuse = require('fuse.js');

let movies = require('./database/movies.json');

let fuse = new Fuse(movies, {
    keys: ['title', 'cast']
  });

const writeAndReload = (newMovieList) => {
    fs.writeFile(__dirname + '/database/movies.json', JSON.stringify(newMovieList), (err) => {
        console.error(err);

        if(!err) {
            movies = newMovieList;
            fuse = new Fuse(movies, {
               keys: ['title', 'cast'] 
            });
        }
    });
}

const app = express();

app.use(express.json()); // Permet de dire a express que les corps de requête seront au format JSON

app.get('/', (req, res) => {
    res.json({
        'message': `O'mDB API 0.1 alpha`
    });
});

// Data Type : Movie
// Endpoint : /movie
// Get all movies : GET /movie
// Get one movie : GET /movie/:id
// Create a movie : POST /movie
// Update a movie : PUT/PATCH/(POST) /movie/:id
// Delete a movie : DELETE /movie/:id

// Implémenter
// GET /movie
// GET /movie/:id

// BONUS : Ajouter une pagination a GET /movie avec skip et limit en req.query


app.get('/movie', (req, res) => {

    let filteredMovies = movies;

 
    // Si req.query.search existe, je filtre mon tableau en fonction de la recherche
    if(req.query.search) {
        // J'utilise map mon tableau avec les resultats de recherche en tableau de film
        filteredMovies = fuse.search(req.query.search).map(searchResult => searchResult.item);
    }

    
    // Si req.query.skip existe, je le convertis en nombre et je l'affecte à ma variable skip
    // Si req.query.skip n'existe pas, j'affecte la valeur 0 à ma variable skip
    // Expression ternaire c'est : <comparaison/condition> ? <valeur si condition vrai> : <valeur si condition fausse>
    // Ce qui est chouette, c'est qu'on peut utiliser une expression ternaire lors de l'affection pour alléger le code

    
    // Rajouter un paramètre query genre qui permet de filtrer les resultats par genre.
    // Bonus : permettre de rajouter plusieurs genres séparé par une ,
    // ex : http://localhost:3000/movie?genre=action,comedy

    if(req.query.genre) {
        let genre = req.query.genre.split(',');
        console.log(genre);
        // Filtre tous les films ou chaque film doit contenir un genre qui se trouve dans la liste genre
        filteredMovies = filteredMovies.filter(movie => movie.genres.every(movieGenre => genre.includes(movieGenre)));
    }




    const skip = req.query.skip ? Number(req.query.skip) : 0;

    // la même chose.
    // let skip = 0;
    // if(req.query.skip) {
    //     skip = Number(req.query.skip);
    // }

    const limit = req.query.limit ? Number(req.query.limit) : 10;

    // pagination avec skip et limit
    
    // découper/trancher mon tableau à partir de skip jusqu'a skip + limit.
    let selectedMovies = filteredMovies.slice(skip, skip + limit);

    res.json({
        count: filteredMovies.length,
        data: selectedMovies
    });
});

app.get('/movie/:id', (req, res) => {
    let { id } = req.params;

    if(isNaN(id)) {
        return res.status(400).json({
            message: 'ID must be a number'
        });
    }

    id = Number(id); // je le convertis en nombre après avoir verifié que c'était bien un nombre

   

    let movie = movies.find(movie => movie.id === id);

    if(!movie) {
        return res.status(404).json({
            message: 'ID not found'
        });
    }

    res.json(movie);
});

app.post('/movie', (req, res) => {
    // Il va falloir que je l'ajoute a mon tableau
    // Que je récrive TOUT LE FICHIER 
    // Que je le recherche en RAM

    // req.body -> Le corps de ma requête | Présent sur toutes les requetes ou l'on envoi de la donnée (POST, PUT, PATCH)

    const item = req.body;
    item.id = movies.length;

    movies.push(item);

    writeAndReload(movies);

    res.status(201).json(item);
});

app.put('/movie/:id', (req, res) => {
    res.json({
        'message': `Update a movie`
    });
});

app.delete('/movie/:id', (req, res) => {
    res.json({
        'message': `Delete a movie`
    });
});


app.listen(3000, () => {
    console.log('Server is running on port 3000');
});