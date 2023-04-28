import React from 'react';
import Message from './Message';


const ListeMessages = (props) => {
  const messages = props.messages;
  const post = props.messages.filter((message) => !message.replyTo);
  return (
    <div>
      <nav id="page">
        {post.reverse().map((message) => (
          <Message key={message._id} message={message} userLogin={props.userLogin} handleUserClick = {props.handleUserClick} setUser = {props.setUser} messages = {messages}/> 
        ))}
      </nav>
    </div>
  );
};

export default ListeMessages;