import React, { useState } from 'react';
import axios from 'axios';

import './css/Message.css';

const Message = (props) => {
  const { _id, author, content, createdAt, like, dislike } = props.message;
  const [likeCount, setLikeCount] = useState(like);
  const [dislikeCount, setDislikeCount] = useState(dislike);
  

  const handleLike = async () => {
    try {
      const response = await axios.patch(`/api/message/${_id}/like`, { login: props.userLogin });
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
      const response = await axios.patch(`/api/message/${_id}/dislike`, { login: props.userLogin });
      setDislikeCount(response.data.dislike);
    } catch (error) {
      if (error.response && error.response.status === 400 && error.response.data.error === 'Vous avez déjà disliké ce message.') {
        alert('Vous avez déjà disliké ce message.');
      } else {
        console.log("Erreur de dislike")
        console.error(error);
      }
    }
  };

  const handleProfileClick = () => {
    props.handleUserClick(author);
  };

  const handleAjoutAmis = async () => {
    try {
      console.log("me", props.userLogin)
      console.log("friend", author)
      const response = await axios.patch(`/api/user/${author}/ajout/`, {
        me: props.userLogin,
        friend: author
      });
      
      console.log(response.data)
      
    } catch (error) {
      if (error.response && error.response.status === 409 && error.response.data.message === 'Cet utilisateur est déjà votre ami') {
        alert('Vous avez déjà ajouté cet utilisateur en ami.');
      }
      if (error.response && error.response.status === 409 && error.response.data.message === 'Vous ne pouvez pas vous ajouter en ami') {
        alert('Vous ne pouvez pas vous ajouter en ami.');
      } else {
        console.log("Erreur d'ajout d'ami")
        console.error(error);
      }
      
    }
};
  
  
  return (
    <div>
      <h3><span className="texte-cliquable" onClick={handleProfileClick}> {author}</span></h3>
      <button onClick={handleAjoutAmis}>Follow</button>

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
