# Création d'une API REST avec users.json

## Objectif:
Créer une API REST avec Express.js en utilisant un fichier users.json fourni comme source de données. Implémentez des routes pour la récupération des données avec des filtres spécifiques, et préparez des routes pour la mise à jour et la suppression (sans les implémenter).

## Instructions:
1. Initialisation du Projet:
    - Créez un nouveau dossier pour votre projet.
    - Initialisez un projet Node.js et installez Express.js.
2. Préparation des Données:
    - Utilisez le fichier users.json fourni avec la structure d'utilisateur donnée.
3. Routes de l'API:
    - GET `/users`: Retourne la liste de tous les utilisateurs 
    - GET `/users/:id`: Retourne un utilisateur spécifique basé sur l'ID.
    - POST `/users/:id`: Préparez cette route pour la création d'un utilisateur (ne l'implémentez pas complètement).
    - PUT `/users/:id`: Préparez cette route pour la mise à jour d'un utilisateur (ne l'implémentez pas complètement).
    - DELETE `/users/:id`: Préparez cette route pour la suppression d'un utilisateur (ne l'implémentez pas complètement).

4. Implémentation des Filtres:
    - Utilisez req.query pour accéder aux query strings et implémentez les filtres sur la route /users.
        - Modifier la route GET `/users` pour qu'il utilise des filtres via des query strings pour:
            - Rechercher par `firstName` ou `lastName` (ou les deux) avec un paramètre search à l'aide de `fuse.js`
            - Filtrer par `bloodGroup`.
            - Filtrer par `address.city`.
5. Test de l'API:
    - Testez votre API avec des outils comme Postman ou Insomnia.