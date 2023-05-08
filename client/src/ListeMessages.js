import React, { useState, useEffect } from 'react';
import Message from './Message';
import axios from 'axios';

const ListeMessages = (props) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const authors = new Set(props.messages.map((message) => message.author));
    const promises = [];
    authors.forEach((author) => {
      promises.push(
        axios.get(`/api/user/${author}/getUser`)
          .then((response) => {
            return { login: author, user: response.data };
          })
          .catch((error) => {
            console.log(error);
            return null;
          })
      );
    });
    Promise.all(promises).then((results) => {
      setUsers(results.filter((result) => result !== null));
    });
  }, [props.messages]);

  const post = props.messages.filter((message) => !message.replyTo);
  const messages = props.messages;
  console.log(users);

  return (
    <div>
      <nav id="page">
        {post.reverse().map((message) => (
          <Message
          key={message._id}
          message={message}
          authorUser={users.find((user) => user.login === message.author)?.user ?? {}}
          userLogin={props.userLogin}
          handleUserClick={props.handleUserClick}
          setUser={props.setUser}
          replies={props.messages.filter((reply) => reply.replyTo === message._id)}
          messages={props.messages}
          setMessages={props.setMessages}
        />
        ))}
      </nav>
    </div>
  );
};

export default ListeMessages;