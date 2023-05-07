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
routerUsers.get('/user/:username/getBio/', apiUsers.getBio);

// Route pour avoir le nombre de tous les utilisateurs
routerUsers.get('/user/getAllUsers/', apiUsers.getAllUsers);

// Route pour remplir sa date de naissance 
routerUsers.post('/user/date/', apiUsers.changeDate);

// Route pour avoir la date de naissance de quelqu'un
routerUsers.get('/user/:username/getDate/', apiUsers.getDate);


// Route pour avoir le dernier utilisateur
routerUsers.get('/user/getLastUser/', apiUsers.getLastUser);

// Route pour changer sa ville
routerUsers.patch('/user/ville/', apiUsers.ville_user);

// Route pour changer son status
routerUsers.post('/user/status/', apiUsers.status_user);

// Route pour changer son genre
routerUsers.post('/user/genre/', apiUsers.genre_user);

// Route pour avoir la ville de quelqu'un
routerUsers.get('/user/:username/getVille/', apiUsers.getVille);

// Route pour avoir le genre de quelqu'un
routerUsers.get('/user/:username/getGenre/', apiUsers.getGenre);

// Route pour avoir le status de quelqu'un
routerUsers.get('/user/:username/getStatus/', apiUsers.getStatus);




module.exports = {routerUsers };


