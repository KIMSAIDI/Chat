const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const messageSchema = new mongoose.Schema({
    message: {
        type: String,
        required: true,
    },
    author: {
      type: String,
      required: true,
    }
  });



  const Message = mongoose.model('Message', messageSchema);
  module.exports = Message;

  
      
  