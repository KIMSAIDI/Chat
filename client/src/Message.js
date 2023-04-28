// import React, { useState } from 'react';
// import axios from 'axios';

// import './css/Message.css';

// const Message = (props) => {
//   const { content, author, createdAt, like, dislike, replyto, replies_content, replies_to, replies_auth, _id } = props.message;
 
//   const [likeCount, setLikeCount] = useState(like);
//   const [dislikeCount, setDislikeCount] = useState(dislike);
//   const [showReply, setShowReply] = useState(false);
  
//   const [reply, setReply] = useState(""); // définir l'état local pour stocker la réponse à poster
//   const [autre_reply, setAutreReply] = useState("");
  
  
//   const [autresReplies, setAutresReplies] = useState([]);

  
  
//   const handleLike = async () => {
//     try {
//       const response = await axios.patch(`/api/message/${_id}/like`, { login: props.userLogin });
//       setLikeCount(response.data.like);
//     } catch (error) {
//       if (error.response && error.response.status === 400 && error.response.data.error === 'Vous avez déjà aimé ce message.') {
//         alert('Vous avez déjà aimé ce message.');
//       } else {
//         console.error(error);
//       }
//     }
//   };

//   const handleDislike = async () => {
//     try {
//       const response = await axios.patch(`/api/message/${_id}/dislike`, { login: props.userLogin });
//       setDislikeCount(response.data.dislike);
//     } catch (error) {
//       if (error.response && error.response.status === 400 && error.response.data.error === 'Vous avez déjà disliké ce message.') {
//         alert('Vous avez déjà disliké ce message.');
//       } else {
//         console.log("Erreur de dislike")
//         console.error(error);
//       }
//     }
//   };

//   const handleProfileClick = () => {
//     props.handleUserClick(author);
//   };

//   const handleAjoutAmis = async () => {
//     try {
//       console.log("me", props.userLogin)
//       console.log("friend", author)
//       const response = await axios.patch(`/api/user/${author}/ajout/`, {
//         me: props.userLogin,
//         friend: author
//       });
    
//       console.log(response.data)
      
//       // Mise à jour de l'utilisateur avec ses nouveaux amis
//       props.setUser(response.data.user);
  
//     } catch (error) {
//       if (error.response && error.response.status === 409 && error.response.data.message === 'Cet utilisateur est déjà votre ami') {
//         alert('Vous avez déjà ajouté cet utilisateur en ami.');
//       }
//       if (error.response && error.response.status === 409 && error.response.data.message === 'Vous ne pouvez pas vous ajouter en ami') {
//         alert('Vous ne pouvez pas vous ajouter en ami.');
//       } else {
//         console.log("Erreur d'ajout d'ami")
//         console.error(error);
//       }
      
//     }
//   };
  
//   const handleDeleteMessage = async () => {
//     try {
//       const response = await axios.delete(`/api/message/${_id}/deleteMessage`);
//       props.setMessages(props.messages.filter(message => message._id !== _id));
//     } catch (error) {
//       if (error.response && error.response.status === 400 && error.response.data.error === 'Vous n\'êtes pas autorisé à supprimer ce message.') {
//         alert('Vous n\'êtes pas autorisé à supprimer ce message.');
//       } else {
        
//         console.error(error);
//       }
//     }
//   };

//   const handleReply = () => {
//     if (showReply) {
//       setShowReply(false);
//     }else {
//     setShowReply(true);
//     }
//   };

//   const handleReplySubmit = (index) => {
    
//     // const autre_reply = autresReplies[index];
//     // setReply(autresReplies[index]);
   
    
    
//     axios.post(`/api/message/reply`, {
//       content : reply,
//       author : props.userLogin,
//       replyTo : author,
//       id : _id
//     })
//     .then(function (response) {
//       setAutreReply("");
//       setReply("");
      
//     })
//     .catch(function (error) {
//       console.log(error);
//     });
//     }

//       const handleInputChange = (e, index) => {
//         const value = e.target.value;
//         const newReplies = [...autresReplies]; // on copie le tableau actuel pour le modifier
//         newReplies[index] = value;
//         setAutresReplies(newReplies);
//       }



//   return (
//     <div className='Message'>

//       <div className="titre-et-bouton">
//         <p><span className="texte-cliquable" onClick={handleProfileClick}>{author}</span></p>
//         <button onClick={handleAjoutAmis}>Follow</button>
//         </div>
//       <div>
//         { props.isMyProfile && props.isMyProfile ? ( <button onClick={handleDeleteMessage}>Delete</button> ) : ( <div></div> ) }
//       </div>

//       <p className='message-content'>{content}</p>
      
//       <div className="boutons-like-dislike">
//         <div className='like'>
//           <button onClick={handleLike}>Like</button>
//           <span>{likeCount} likes</span>
//         </div>
//         <div className='dislike'>
//           <button onClick={handleDislike}>Dislike</button>
//           <span>{dislikeCount} dislikes</span>
//         </div>
//       </div>

//       <br></br>

//       <div className="show-reply">
//       <button onClick={handleReply}>Réponses</button>
//       </div>

//       <p>Date : {new Date(createdAt).toLocaleString()}</p>
      

//       {showReply ? (
       
//         <div className="reply-wall">
//           <label>
//             <input type="text" value={reply} onChange={(e) => setReply(e.target.value)}></input>
//           </label>
          
//           <button onClick={handleReplySubmit}>Poster</button>
          
//           {replies_content.map((rep, index) => (
//             <div key={index}>
//               <p>Réponse de {replies_auth[index]} à {replies_to[index]}</p>
//               <p>Message : {rep}</p>
//               {/* <input type="text" value={autresReplies[index]} onChange={(e) => handleInputChange(e, index)}></input>
//               <button onClick={() => {
               
//                 handleReplySubmit(index);
//               }}>Répondre</button> */}
//               <p>------------------</p>
//             </div>
//           ))}

        
//         </div>
//       ) : null}
//     </div>
//   );
// };

// export default Message;

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
          <span>{likeCount} </span>
        </div>
        <div>
          <button onClick={handleDislike}>Dislike</button>
          <span>{dislikeCount} </span>
        </div>
      </div>
      <label>
          <input type="text" value={reply} onChange={(e) => setReply(e.target.value)}></input>
          </label>
          <button onClick={handleReplySubmit}>Ajouter un commentaire</button>
         
          {replies && replies.length > 0 && (
          <button onClick={handleReply}>
            {replies.length > 1 ? `${replies.length} commentaires` : `${replies.length} commentaire`}
          </button>
        )}


      {showReply ? (
        
        <div className="reply-wall">
          
          {replies.map(reply => (
            
              <Reply key={reply._id} reply={reply} userLogin = {props.userLogin} messages = {props.messages} setMessages = {props.setMessages}/>
        ))}
        </div>
      ) : null}
    </div>
  );
};

export default Message;