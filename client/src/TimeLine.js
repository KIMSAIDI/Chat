
import React, { useEffect, useState } from 'react';
import ListeMessages from './ListeMessages';
import Profile from './Profile';
import axios from 'axios';
axios.defaults.baseURL = "http://localhost:3000";

function TimeLine(props){
    //états
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [page, setPage] = useState("ListeMessage");
   

    const [selectedUser, setSelectedUser] = useState(props.user);



    useEffect(() => {
      axios.get('/api/messageBD')
        .then(res => setMessages(res.data))
        .catch(err => console.log(err));
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('/api/message', { 
            content: newMessage,
            author : props.user.login
          })
          .then(res => {
            setMessages([...messages, res.data]);
            setNewMessage('');
      
            // Mettre à jour la liste des messages immédiatement après l'envoi d'un nouveau message
            axios.get('/api/messageBD')
              .then(res => setMessages(res.data))
              .catch(err => console.log(err));
          })
          .catch(err => console.log(err));
      };

      const handleUserClick = async (author) => {
        try {
          const response = await axios.get(`/api/user/${author}/getUser`);
          setSelectedUser(response.data);
          setPage("PageProfile");

        }
        catch (error) {
          console.error(error); 
        } 
      };


     return (
        <div>
          <p>Timeline de l'utilisateur : {props.user.login}</p>
          <form onSubmit={handleSubmit}>
            <label>
              Nouveau message:
              <input type="text" value={newMessage} onChange={(e) => setNewMessage(e.target.value)} />
            </label>
            <button type="submit">Poster</button>
          </form>

          <nav id = "nav">
          <button onClick={() => {
              setPage("PageProfile");
              setSelectedUser(props.user);
            }}>Ma PageProfile</button>

            <button onClick={() => setPage("ListeMessage")}>ListeMessage</button>
          </nav>
          <div id = "page">
            {page === "ListeMessage" && <ListeMessages messages={messages} handleUserClick={handleUserClick} />}
            {page === "PageProfile" && <Profile user={selectedUser}  />}
            
          </div>
        
        </div>
      );
}


export default TimeLine;


