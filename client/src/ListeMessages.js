import React from 'react';
import Message from './Message';

const ListeMessages = ({ messages, userLogin }) => {
  return (
    <div>
      {messages.reverse().map((message) => (
        <Message key={message._id} message={message} userLogin={userLogin} /> 
      ))}
    </div>
  );
};

export default ListeMessages;