import React, { useState, useEffect } from 'react';

import axios from 'axios';

 

const Reply = (props) => {

   

  const [replyContent, setReplyContent] = useState('');

  const [subReplies, setSubReplies] = useState([]);

  const [showReplyForm, setShowReplyForm] = useState(false);

  const [showReplies, setShowReplies] = useState(false);

  const [messages, setMessages] = useState(props.messages);

 

  useEffect(() => {

    setMessages(props.messages);

  }, [props.messages]);

 

  const handleReplySubmit = async () => {

    axios.post(`/api/message/reply`, {

      content: replyContent,

      author: props.userLogin,

      replyTo: props.reply._id

    })

    .then(function (response) {

      setSubReplies([...subReplies, response.data.message]);

      props.setMessages([...props.messages,response.data.message]);

      setReplyContent("");

    })

    .catch(function (error) {

      console.log(error);

    });

  };

 

  const handleShowReplyForm = () => {

    setShowReplyForm(!showReplyForm);

  };

 

  // Filter messages that reply to this reply

  const filteredMessages = messages.filter(message => message.replyTo === props.reply._id);

 
  return (
    <div>
      <div style={{display: 'flex', alignItems: 'center'}}>
        <h3 onClick={() => props.handleUserClick(props.reply.author)} className="user-link">{props.reply.author}</h3>
        <p style={{opacity: 0.5, fontSize: "0.8rem", textAlign: "right", marginLeft: "auto"}}>
          {new Date(props.reply.createdAt).toLocaleString()}
        </p>
      </div>
      <p>{props.reply.content}</p>
      <div className="reply-info">
      <div style={{display: 'flex', alignItems: 'center'}}>

  <button className='button-replytoreply' onClick={handleShowReplyForm}>Répondre</button>
  {filteredMessages.length > 0 && (
    <button className='show-replies-button' style={{marginLeft: '10px'}} onClick={() => setShowReplies(!showReplies)}>
      {showReplies ? (
        <div>
          <ion-icon name="caret-up-outline"></ion-icon>
          <span onClick={() => setShowReplies(true)}>
            {filteredMessages.length} {filteredMessages.length > 1 ? "réponses" : "réponse"}
          </span>
        </div>
      ) : (
        <div>
          <ion-icon name="caret-down-outline"></ion-icon>
          <span onClick={() => setShowReplies(true)}>
            {filteredMessages.length} {filteredMessages.length > 1 ? "réponses" : "réponse"}
          </span>
        </div>
      )}
    </button>
  )}
  
        </div>

        {showReplyForm && (
          <div className="comment-input">
            <label>
              <input
                type="text"
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
              />
            </label>
            <button className= "submit-comment" onClick={handleReplySubmit}>Envoyer</button>
          </div>
        )}

      </div>
      
      
      {showReplies && (
        <div className="reply-wall">
          {filteredMessages.map(subReply => (
            <Reply
              key={subReply._id}
              reply={subReply}
              userLogin={props.userLogin}
              messages={messages}
              setMessages={setMessages}
            />
          ))}
        </div>
      )}
  </div>
  );
 

};
 

export default Reply;