
import React, { useState } from 'react';
import Reply from './Reply';
import axios from 'axios';
import './css/Message.css';

const Message = (props) =>{
  const { _id, author, content, createdAt, like, dislike } = props.message;
  const [likeCount, setLikeCount] = useState(like);
  const [dislikeCount, setDislikeCount] = useState(dislike);
  const [showReply, setShowReply] = useState(false);
  const [replies, setReplies] = useState(props.replies); // définir l'état local pour stocker les réponses
  const [reply, setReply] = useState(""); // définir l'état local pour stocker la réponse à poster
  const [showReplyForm, setShowReplyForm] = useState(false);

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

  const handleReply = () => {
    if (showReply) {
      setShowReply(false);
    }else {
    setShowReply(true);
    }
  };

  const handleReplySubmit = async () => {
    axios.post(`/api/message/reply`, {
      content : reply,
      author : props.userLogin,
      replyTo : _id
    })
    .then(function (response) {
      setReplies([...replies, response.data.message]);
      props.setMessages([...props.messages,response.data.message])
      setReply("");
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  function handleShowReplyForm() {
    setShowReplyForm(true);
  }


  return (
    <div className='Message'>
      {/* Login cliquable et bouton ajouter en amis */}
      <div className="titre-et-bouton">
        <h3><span className="texte-cliquable" onClick={handleProfileClick}>{author}</span></h3>
        {props.userLogin === author || props.isMyProfile ? null : <button className='bouton-ajout-ami' onClick={handleAjoutAmis}><ion-icon name="person-add-outline"></ion-icon></button>}
      </div>

    {/* Bouton delete si c'est mon profile */}
      <div className='Delete'>
        { props.isMyProfile && props.isMyProfile ? ( <button onClick={handleDeleteMessage}>Delete</button> ) : ( <div></div> ) }
      </div>
        {/* Contenu du message */}
      <div className=' Content'>
        {props.message.replyTo ? <h3>Reply to : {props.message.replyTo}</h3> : null}

        <p> {content}</p>
      </div>

    {/* Date */}
    <div className='Date'>
      <p>{new Date(createdAt).toLocaleString()}</p>
    </div>
    
    {/* Boutons container */}
    
    <div className = 'boutons-container'>
      <div className="boutons-like-dislike">

          <div className="Like">
              <button onClick={handleLike}>
                <ion-icon name="heart-outline"></ion-icon>
              </button>
              <span>{likeCount} </span>
          </div>

          <div className="Dislike">
              <button onClick={handleDislike}>
                <ion-icon name="heart-dislike-outline"></ion-icon>
              </button>
              <span>{dislikeCount} </span>
          </div>
      </div>

      <div className="bouton-comment">
        <div style={{ display: "flex", alignItems: "center" }}>
          <button onClick={handleReply}>
            <ion-icon name="chatbubble-outline"></ion-icon>
          </button>
          <span style={{ marginLeft: "auto" }}>{replies ? replies.length : 0}</span>
        </div>
      </div>

      <div className='bouton-addcomment'>
        <button onClick={() => setShowReplyForm(!showReplyForm)}>
          <ion-icon name="arrow-undo-outline"></ion-icon>
         </button>
</div>
  </div>

  
  {showReplyForm && (
      <div className="comment-input">
          <label>
         <input 
        type="text" 
        value={reply} 
        onChange={(e) => setReply(e.target.value)} 
        placeholder="Ajouter un commentaire..."
      />
    </label>
     <button className="submit-comment" onClick={handleReplySubmit}>
      Envoyer
    </button>
  </div>
  )}
  
      {showReply ? (
        <div className="reply-container">
        <div className="reply-box">
          {replies.map(reply => (           
              <Reply key={reply._id} reply={reply} userLogin = {props.userLogin} messages = {props.messages} setMessages = {props.setMessages} handleUserClick = {props.handleUserClick}/>
          ))}
        </div>
      </div>
      ) : null}
    </div>
  );
};

export default Message;