const express = require('express');
const routerMessages = new express.Router();
const apiMessage = require('../apiDossier/apiMessage');

// Route pour créer un nouveau message
routerMessages.post('/message/', apiMessage.createMessage);

// Route pour récupérer tous les messages de la base de données
routerMessages.get('/messageBD/', apiMessage.getBD);

routerMessages.patch('/message/:messageId/like', apiMessage.likeMessage);

routerMessages.patch('/message/:messageId/dislike', apiMessage.dislikeMessage);

module.exports = { routerMessages };