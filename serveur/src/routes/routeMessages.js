const express = require('express');
const routerMessages = new express.Router();
const apiMessages = require('../apiDossier/apiMessages');


routerMessages.post('/message/', apiMessages.createMessage);


module.exports = {routerMessages };

