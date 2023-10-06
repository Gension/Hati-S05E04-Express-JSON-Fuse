const express = require('express');
const communes = require('./france.json');

const app = express();

//  Retourne la liste des communes correspondant à un code postal donné.
app.get('/communes/:codePostal', (req, res) => {
    const { codePostal } = req.params;

    if (isNaN(codePostal)) {
        return res.status(400).json({ message: 'Invalid Code Postal' });
    }
 
    const communesCorrespondantes = communes.filter(c => c.Code_postal === Number(codePostal));
    
    res.json(communesCorrespondantes);
});


app.get('/communes/insee/:insee', (req, res) => {

    const { insee } = req.params;

    if (isNaN(insee)) {
        return res.status(400).json({ message: 'Invalid Code Insee' });
    }
 
    const communesCorrespondantes = communes.filter(c => c.Code_commune_INSEE === Number(insee));
    
    res.json(communesCorrespondantes);
});

// GET /commune/codePostal/:nomCommune: Retourne le code postal d'une commune donnée par son nom.
app.get('/communes/codePostal/:nomCommune', (req, res) => {
    const { nomCommune } = req.params;

    const communeCorrespondant = communes.find(c => c.Nom_commune === nomCommune.toUpperCase());

    if(!communeCorrespondant) {
        return res.status(404).json({ message: 'Commune not found' });
    }

    res.json({
        Code_postal: communeCorrespondant.Code_postal,
    });
});

// GET /commune/inseeCode/:nomCommune: Retourne le code INSEE d'une commune donnée par son nom
app.get('/communes/inseeCode/:nomCommune', (req, res) => {
    const { nomCommune } = req.params;

    const communesCorrespondant = communes.filter(c => c.Nom_commune === nomCommune.toUpperCase());


    // .map() permet de transformer un tableau avec des éléments de type A en éléments de typeB
    // ici, on transforme un tableau de communes correspondant à un nom de commune en tableau de codes INSEE
    res.json(communesCorrespondant.map(c => { return { Code_commune_INSEE: c.Code_commune_INSEE }}));
});


app.listen(3000, () => {
    console.log('Server is running on port 3000');
});