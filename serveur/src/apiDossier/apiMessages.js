
const express = require('express');
const Message = require('../entities/message');
const router = new express.Router();
const bcrypt = require('bcryptjs');


async function createMessage(req, res, next) {
    const msg = new Message(req.body);
    try {
        const saveMsg = await msg.save();
        console.log('Nouveau message posté');
        res.status(201).send({
            message: 'Message posté avec succès.',
            msg: saveMsg
        });
    }catch(error) {
        res.status(400).send({ error: 'Une erreur s\'est produite.' });
    }
}

module.exports = {createMessage};