const express = require('express');
const routerMessages = new express.Router();
const apiMessage = require('../apiDossier/apiMessage');

// Route pour créer un nouveau message
routerMessages.post('/message/', apiMessage.createMessage);

// Route pour récupérer tous les messages de la base de données
routerMessages.get('/messageBD/', apiMessage.getBD);

// Route pour récupérer tous les messages d'un utilisateur 
routerMessages.get('/messagebyLogin/', apiMessage.getBDbyLogin);

// routerMessages.get('/messagebyContent/', apiMessage.getBDbyContent);

routerMessages.patch('/message/:messageId/like', apiMessage.likeMessage);

routerMessages.patch('/message/:messageId/dislike', apiMessage.dislikeMessage);

routerMessages.delete('/message/:messageId/deleteMessage', apiMessage.deleteMessage);

routerMessages.post('/message/reply', apiMessage.replyMessage);

routerMessages.get('/message/getAllMessages', apiMessage.getAllMessages);

routerMessages.get('/message/getPopularTweet', apiMessage.getPopularTweet);

module.exports = { routerMessages };