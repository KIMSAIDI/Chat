const mongoose = require('mongoose');
const messageSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  like: {
    type: Number,
    default: 0,
  },
  dislike: {
    type: Number,
    default: 0,
  },
  likedBy: {
    type: [String],
    default: [],
  },
  dislikeBy: {
    type: [String],
    default: [],
  }

});


const Message = mongoose.model('Message', messageSchema);
module.exports = Message;