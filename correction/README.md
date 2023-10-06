# Création d'une API avec Express.js et un fichier JSON

## Objectif:
Créer une API avec Express.js qui utilise les données disponibles à ce lien JSON pour fournir des informations sur les communes de France : https://raw.githubusercontent.com/high54/Communes-France-JSON/master/france.json

## Instructions:
Initialisation du Projet:

1. Créez un nouveau dossier pour votre projet.
2. Initialisez un projet Node.js et installez Express.js.
3. Ajouter le fichier JSON a votre projet
4. Parsez le fichier JSON pour obtenir un tableau d'objets.

## Routes de l'API:
- GET /communes/:codePostal: Retourne la liste des communes correspondant à un code postal donné.
- GET /commune/insee/:codeInsee: Retourne une commune spécifique basée sur le code INSEE.
- GET /commune/nom/:nomCommune: Retourne le code postal d'une commune donnée par son nom.
- GET /commune/inseeCode/:nomCommune: Retourne le code INSEE d'une commune donnée par son nom.

## Gestion des Erreurs:
- Gérez les erreurs de manière appropriée, comme les communes non trouvées.

## Test de l'API:
- Testez votre API avec des outils comme Postman ou Insomnia.

## Conseils:
- Utilisez des méthodes JavaScript comme filter, find ou map pour manipuler et rechercher dans les données.
- Soyez attentif à la casse des noms de communes lors de la recherche.
    - Vous pouvez utiliser toLowerCase() ou toUpperCase() pour rendre la recherche insensible à la casse.

## Bonus :
Pour un défi supplémentaire, implémentez une fonction de recherche "fuzzy" qui peut retourner des résultats même si l'entrée n'est pas exactement correcte.
Vous pouvez utiliser des bibliothèques comme [fuse.js](https://www.fusejs.io) pour cela. Voir [npmjs](https://www.npmjs.com/package/fuse.js)