/*
import { useState } from 'react';
//import './css/Message.css';
import React from 'react';
const Message = ({ message }) => {
  const { author, content, createdAt } = message;

  return (
    <div>
      <p>Nom d'utilisateur : {author}</p>
      <p>Message : {content}</p>
      <p>Date : {new Date(createdAt).toLocaleString()}</p>
    </div>
  );
};

export default Message;
*/
import React, { useState } from 'react';
import axios from 'axios';

const Message = ({ message, userLogin }) => {
  const { _id, author, content, createdAt, like, dislike } = message;
  const [likeCount, setLikeCount] = useState(like);
  const [dislikeCount, setDislikeCount] = useState(dislike);

  const handleLike = async () => {
    try {
      const response = await axios.patch(`/api/message/${_id}/like`, { login: userLogin });
      setLikeCount(response.data.like);
    } catch (error) {
      if (error.response && error.response.status === 400 && error.response.data.error === 'Vous avez déjà aimé ce message.') {
        alert('Vous avez déjà aimé ce message.');
      } else {
        console.error(error);
      }
    }
  };

  const handleDislike = async () => {
    try {
      const response = await axios.patch(`/api/message/${_id}/dislike`, { login: userLogin });
      setDislikeCount(response.data.dislike);
    } catch (error) {
      if (error.response && error.response.status === 400 && error.response.data.error === 'Vous avez déjà disliké ce message.') {
        alert('Vous avez déjà disliké ce message.');
      } else {
        console.error(error);
      }
    }
  };

  return (
    <div>
      <h3>Nom d'utilisateur : {author}</h3>
      <p>Message : {content}</p>
      <p>Date : {new Date(createdAt).toLocaleString()}</p>
      <div>
        <button onClick={handleLike}>Like</button>
        <span>{likeCount} likes</span>
      </div>
      <div>
        <button onClick={handleDislike}>Dislike</button>
        <span>{dislikeCount} dislikes</span>
      </div>
    </div>
  );
};

export default Message;
