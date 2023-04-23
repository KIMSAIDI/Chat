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
    dislike: 0,
    likedBy: [],
    dislikeBy: [],
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
module.exports = {createMessage,getBD, likeMessage,dislikeMessage, getBDbyLogin};
