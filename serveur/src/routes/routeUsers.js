const express = require('express');
const routerUsers = new express.Router();
const apiUsers = require('../apiDossier/apiUsers');

// Route pour créer un nouvel utilisateur
routerUsers.post('/user/', apiUsers.createUsers);

// Route pour la connexion d'un utilisateur
routerUsers.post('/user/login/', apiUsers.login);

// Route pour la déconnexion d'un utilisateur
routerUsers.post('/user/logout/', apiUsers.logout);

module.exports = {routerUsers };


