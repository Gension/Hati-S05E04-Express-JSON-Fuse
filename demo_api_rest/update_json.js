// Il va aller chercher le fichier ./database/movies.json
// le charger, rajouter un id
// re-écrire le fichier avec l'id rajouté 

const fs = require('fs');
let movies = require("./database/movies.json");

movies = movies.map((movie, index) => ({ 
    
    id: index,
    ...movie,
}));

fs.writeFileSync(__dirname + "/database/movies.json", JSON.stringify(movies));