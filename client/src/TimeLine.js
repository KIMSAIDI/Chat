
import React, { useEffect, useState } from 'react';
import ListeMessages from './ListeMessages';
import './css/TimeLine.css';


import axios from 'axios';
axios.defaults.baseURL = "http://localhost:3000";

function TimeLine(props){
    //états
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
   
    

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
    

     return (
        <div>
          
          <br></br>
          <p className="p">Timeline de l'utilisateur : {props.user.login}</p>
          <nav className="PageProfile" id = "nav">
            {props.boutton_page()} 
            {/* { <button onClick={() => props.boutton_page()}>pageprofil</button> */}

          </nav>
          <form onSubmit={handleSubmit}>            
            <label className="nouveau-message">
              Nouveau message:
              <input type="text" value={newMessage} onChange={(e) => setNewMessage(e.target.value)} />
            </label>
            <button type="submit">Poster</button>
          </form>

          
          
          <div id = "page">
            
          <ListeMessages messages={messages} userLogin={props.user.login} handleUserClick={props.handleUserClick} setUser= {props.setUser} />
           
            
          </div>
        
        </div>
      );
}

export default TimeLine;

