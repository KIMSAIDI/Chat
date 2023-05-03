import React from 'react';
import Message from './Message';


const ListeMessages = (props) => {
  const post = props.messages.filter((message) => !message.replyTo);
  const messages = props.messages
  return (
    <div>
      <nav id="page">
        {post.reverse().map((message) => (
          <Message
            key={message._id}
            message={message}
            userLogin={props.userLogin}
            handleUserClick={props.handleUserClick}
            setUser={props.setUser}
            replies={props.messages.filter((reply) => reply.replyTo === message._id)}
            messages = {props.messages}
            setMessages = {props.setMessages}

          />
        ))}
      </nav>
    </div>
  );
};

export default ListeMessages;