const express = require('express');
const routerUsers = new express.Router();
const apiUsers = require('../apiDossier/apiUsers');

// Route pour créer un nouvel utilisateur
routerUsers.post('/user/', apiUsers.createUsers);

// Route pour la connexion d'un utilisateur
routerUsers.post('/user/login/', apiUsers.login);

// Route pour la déconnexion d'un utilisateur
routerUsers.post('/user/logout/', apiUsers.logout);

// Route pour récupérer un utilisateur de la base de données
routerUsers.get('/user/:username/getUser', apiUsers.getUser);

// Route pour ajouter un ami à un utilisateur
routerUsers.patch('/user/:username/ajout', apiUsers.addFriend);

// Route pour effacer un ami à un utilisateur
routerUsers.patch('/user/:username/delete', apiUsers.deleteFriend);

// Route pour avoir la liste d'amis d'un utilisateur
routerUsers.get('/user/getFriends', apiUsers.getFriends);

// Route pour changer sa bio 
routerUsers.post('/user/bio/', apiUsers.changeBio);

// Route pour avoir la bio de quequ'un
routerUsers.get('/user/getBio/', apiUsers.getBio);

// Route pour avoir le nombre de tous les utilisateurs
routerUsers.get('/user/getAllUsers/', apiUsers.getAllUsers);

module.exports = {routerUsers };


