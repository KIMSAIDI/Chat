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

const Message = ({ message }) => {
  const { _id, author, content, createdAt, like, dislike } = message;
  const [likeCount, setLikeCount] = useState(like);
  const [dislikeCount, setDislikeCount] = useState(dislike);

  const handleLike = async () => {
    try {
      const response = await axios.patch(`/api/message/${_id}/like`);
      setLikeCount(response.data.like);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDislike = async () => {
    try {
      const response = await axios.patch(`/api/message/${_id}/dislike`);
      setDislikeCount(response.data.dislike);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <p>Nom d'utilisateur : {author}</p>
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

