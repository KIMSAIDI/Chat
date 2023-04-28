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

      <p>Réponse de {props.reply.author} à {props.reply.replyTo}</p>

      <p>Message : {props.reply.content}</p>

      <p>Date : {new Date(props.reply.createdAt).toLocaleString()}</p>

      <button onClick={handleShowReplyForm}>Répondre</button>

      {filteredMessages.length > 0 && (

        <button onClick={() => setShowReplies(!showReplies)}>

          {showReplies ? (

            <div>

              <ion-icon name="caret-up-outline"></ion-icon>

              <span onClick={() => setShowReplies(true)}>{filteredMessages.length} réponses</span>

            </div>

          ) : (

            <div>

              <ion-icon name="caret-down-outline"></ion-icon>

              <span onClick={() => setShowReplies(true)}>{filteredMessages.length} réponses</span>

            </div>

          )}

        </button>

      )}

      {showReplyForm &&

        <div>

          <label>

            <input type="text" value={replyContent} onChange={(e) => setReplyContent(e.target.value)}></input>

          </label>

          <button onClick={handleReplySubmit}>Envoyer</button>

        </div>

      }

      {showReplies && filteredMessages.map(subReply => (

        <Reply key={subReply._id} reply={subReply} userLogin={props.userLogin} messages={messages} setMessages={setMessages} />

      ))}

    </div>

  );

 

};

 

export default Reply;