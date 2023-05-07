const Message = require('../entities/message');

//crée un message et le stock dans la BD
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
    dislike: 0,
    likedBy: [],
    dislikeBy: [],
    replyTo: null,
    replies: []
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

//crée une reponse a un message
/*
async function replyMessage(req, res, next) {
  const { content, author, replyTo } = req.body;
  if (!content || !author || !replyTo) {
    return res.status(400).json({ message: 'Le format du message est incorrect.' });
  }
  const message = new Message({
    content,
    author,
    createdAt: new Date(),
    like: 0,
    dislike: 0,
    likedBy: [],
    dislikeBy: [],
    replyTo,
    replies: []
  });
  try {
    const savedMessage = await message.save();
    console.log(`Nouvelle réponse de: ${savedMessage.author}`);
    res.json({message})
  } catch (error) {
    res.status(400).json({ error: 'Une erreur s\'est produite.' });
  }
}*/

async function replyMessage(req, res, next) {
  const { content, author, replyTo } = req.body;
  if (!content || !author || !replyTo) {
    return res.status(400).json({ message: 'Le format du message est incorrect.' });
  }
  try {
    const parentMessage = await Message.findById(replyTo);
    if (!parentMessage) {
      return res.status(404).json({ message: 'Le message parent n\'existe pas.' });
    }
    const message = new Message({
      content,
      author,
      createdAt: new Date(),
      like: 0,
      dislike: 0,
      likedBy: [],
      dislikeBy: [],
      replyTo,
      replies: []
    });
    const savedMessage = await message.save();
    parentMessage.replies.push(savedMessage._id);
    await parentMessage.save();
    console.log(`Nouvelle réponse de: ${savedMessage.author}`);
    res.json({ message: savedMessage });
  } catch (error) {
    res.status(400).json({ error: 'Une erreur s\'est produite.' });
  }
}



async function getBD(req,res,next){
    Message.find()
    .then(messages => res.json(messages))
    .catch(err => res.status(500).json({ error: err }));
}


async function getBDbyLogin(req, res, next) {
  const { login } = req.query; 
  Message.find({ author: login })
    .then(messages => {
      res.json(messages);
    })
    .catch(err => res.status(500).json({ error: err }));
}

async function likeMessage(req, res, next) {
  const { messageId } = req.params; 
  const { login } = req.body;

  try {
      const message = await Message.findById(messageId); 

      if (!message) { 
          return res.status(404).json({ error: 'Le message n\'a pas été trouvé.' });
      }

      if (message.likedBy.includes(login)) { 
          return res.status(400).json({ error: 'Vous avez déjà aimé ce message.' });
      }

      message.like += 1; 
      message.likedBy.push(login); 

      const updatedMessage = await message.save(); 

      res.json(updatedMessage); 
  } catch (error) {
      res.status(400).json({ error: 'Une erreur s\'est produite.' });
  }
}

async function dislikeMessage(req, res, next) {
  const { messageId } = req.params; 
  const { login } = req.body; 
  try {
    const message = await Message.findById(messageId); 
   
    if (!message) { 
      return res.status(404).json({ error: 'Le message n\'a pas été trouvé.' });
    }
    if (message.dislikeBy.includes(login)) { 
      return res.status(400).json({ error: 'Vous avez déjà disliké ce message.' });
    }
  
    message.dislike += 1; 
    message.dislikeBy.push(login); 

    const updatedMessage = await message.save();
    res.json(updatedMessage);
  } catch (error) { 
    res.status(400).json({ error: 'Une erreur s\'est produite.' });
  }
}
  async function deleteMessage(req, res, next) {
    const { messageId } = req.params;
    try {
      const message = await Message.findByIdAndDelete(messageId);
      if (!message) {
        return res.status(404).json({ error: 'Le message n\'a pas été trouvé.' });
      }
      // Supprime toutes les réponses associées à ce message
      await Message.deleteMany({ replyTo: messageId });
      console.log(`Le message ${messageId} a été supprimé avec succès.`);
      res.json({ message: 'Le message a été supprimé avec succès.' });
    } catch (error) {
      console.log(error);
      res.status(400).json({ error: 'Une erreur s\'est produite.' });
    }
  }


  async function getAllMessages(req, res, next) {
    try {
      const msg = await Message.find();
      res.json(msg.length);
    } catch (error) {
      next(error);
    }
  }

  async function getPopularTweet(req, res, next) {
    console.log('getPopularTweet');
    try {
      const msg = await Message.find().sort({ like: -1 }).limit(1);
      res.json(msg);
    
    }
    catch (error) {
      next(error);
    }

  }
  
  
  


module.exports = {createMessage,getBD, likeMessage,dislikeMessage, getBDbyLogin, deleteMessage, replyMessage, getAllMessages, getPopularTweet};
