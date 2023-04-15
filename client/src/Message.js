import React, { useState } from 'react';
import axios from 'axios';

import './css/Message.css';



const Message = (props) => {
  const { _id, author, content, createdAt, like, dislike } = props.message;
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

 
  const handleProfileClick = () => {
    props.handleUserClick(author);
  };
  
  return (
    <div>
      <h3>Nom d'utilisateur : <span class="texte-cliquable" onClick={handleProfileClick}> {author}</span></h3>
      
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

