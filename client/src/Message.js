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
      
      // Mise à jour de l'utilisateur avec ses nouveaux amis
      props.setUser(response.data.user);
  
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
  
  const handleDeleteMessage = async () => {
    try {
      const response = await axios.delete(`/api/message/${_id}/deleteMessage`);
      props.setMessages(props.messages.filter(message => message._id !== _id));
    } catch (error) {
      if (error.response && error.response.status === 400 && error.response.data.error === 'Vous n\'êtes pas autorisé à supprimer ce message.') {
        alert('Vous n\'êtes pas autorisé à supprimer ce message.');
      } if (error.response && error.response.status === 404 && error.response.data.error === 'Le message n\'a pas été trouvé.') {
        alert('Message déja supprimé.');
      } else {
        console.log("Erreur de suppression de message")
        console.error(error);
      }
    }
  };
  
  return (
    <div className='Message'>
      <div className="titre-et-bouton">
        <h3><span className="texte-cliquable" onClick={handleProfileClick}>{author}</span></h3>
        <button onClick={handleAjoutAmis}>Follow</button>
      </div>

      <div>
        { props.isMyProfile && props.isMyProfile ? ( <button onClick={handleDeleteMessage}>Delete</button> ) : ( <div></div> ) }
      </div>

      <p>Message : {content}</p>
      <p>Date : {new Date(createdAt).toLocaleString()}</p>
      
      <div className="boutons-like-dislike">
        <div>
          <button onClick={handleLike}>Like</button>
          <span>{likeCount} likes</span>
        </div>
        <div>
          <button onClick={handleDislike}>Dislike</button>
          <span>{dislikeCount} dislikes</span>
        </div>
      </div>

      <br></br>

      <button>Répondre</button>
    </div>
  );
};

export default Message;