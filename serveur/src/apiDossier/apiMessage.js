const Message = require('../entities/message');


async function createMessage(req, res, next) {
    const { content, author } = req.body;
  
    if (!content || !author) {
      return res.status(400).json({ message: 'Le format du message est incorrect.' });
    }

  
    const message = new Message({
      content,
      author,
      createdAt: new Date(),
      like: 0,
      dislike: 0
    });
   
    try {
      const savedMessage = await message.save();
      console.log(`Nouveau message de: ${savedMessage.author}`);
      res.status(201).json({
        message_send: 'Message posté avec succès.',
        message: savedMessage
      });
    } catch (error) {
      res.status(400).json({ error: 'Une erreur s\'est produite.' });
    }
  }

async function getBD(req,res,next){
    Message.find()
    .then(messages => res.json(messages))
    .catch(err => res.status(500).json({ error: err }));
}

async function likeMessage(req, res, next) {
    const { messageId } = req.params; // Récupère l'ID du message à partir de l'URL
  
    try {
      const message = await Message.findById(messageId); // Trouve le message correspondant dans la base de données à partir de l'ID
  
      if (!message) { // Si le message n'est pas trouvé, renvoie une réponse d'erreur 404
        return res.status(404).json({ error: 'Le message n\'a pas été trouvé.' });
      }
  
      message.like += 1; // Augmente le nombre de likes du message de 1
  
      const updatedMessage = await message.save(); // Enregistre le message mis à jour dans la base de données
  
      res.json(updatedMessage); // Renvoie le message mis à jour avec le nouveau nombre de likes dans la réponse
    } catch (error) { // Gère les erreurs qui pourraient survenir lors de la recherche ou de la mise à jour du message
      res.status(400).json({ error: 'Une erreur s\'est produite.' });
    }
  }

  async function dislikeMessage(req, res, next) {
    const { messageId } = req.params;
  
    try {
      const message = await Message.findById(messageId);
      
      if (!message) {
        return res.status(404).json({ error: 'Le message n\'a pas été trouvé.' });
      }
  
      message.dislike += 1;
  
      const updatedMessage = await message.save();
  
      res.json(updatedMessage);
    } catch (error) {
      res.status(400).json({ error: 'Une erreur s\'est produite.' });
    }
  }

module.exports = {createMessage,getBD, likeMessage,dislikeMessage};

