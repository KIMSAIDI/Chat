
import React, { useEffect, useState } from 'react';
import ListeMessages from './ListeMessages';import './css/TimeLine.css';


import axios from 'axios';
axios.defaults.baseURL = "http://localhost:3000";

function TimeLine(props){
    //états
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [recherche, setRecherche] = useState('');
    const [displayForm, setDisplayForm] = useState(false);
    const [selectedTab, setSelectedTab] = useState('Accueil');
    const [nbUtilisateurs, setNbUtilisateurs] = useState(0);
    const [nbMessages, setNbMessages] = useState(0);
    
    const handleClickAcceuil = () => {
      setSelectedTab('Accueil');
     
  }

  const handleClickStat = () => {
      setSelectedTab('Stats');
     
  }

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
    

    
      const handleRecherche = () => {
        axios.get(`api/messagebyLogin/`, {
            params: {
                login: recherche
            }
        })
        .then(res => {
          console.log(res.data);
          setMessages(res.data);    
        })
        .catch(err => console.log(err))
      }

      const handleDisplayForm = () => {
        setDisplayForm(!displayForm);
      }

      const ReturnNbUtilisateurs = () => {
        const res = axios.get(`api/user/getAllUsers/`)
        .then(res => {
          console.log(res.data);
          setNbUtilisateurs(res.data);
        })
      .catch(err => console.log(err))
      }

      const ReturnNbMessages = () => {
        const res = axios.get(`api/message/getAllMessages`)
        .then(res => {
          console.log(res.data);
          setNbMessages(res.data);
        })
      .catch(err => console.log(err))
      }

    
      return (
        <div className='TimeLine'> 

        <nav className='nav'>
          <div className='nav-left'>
            Mood</div>
              
              <div className='nav-center'>
               {/* filtre */}
                <div className='barre-recherche'>
                  <input type="text" value={recherche} onChange={(e) => setRecherche(e.target.value)} />
                  <button type="submit" onClick={handleRecherche} >Recherche</button>
                </div>
              </div>

         
          <div className='nav-right'>

             {/* bouton PageProfile*/}
          <nav className="PageProfile" id = "nav">
              {props.boutton_page()} 
           </nav>
          </div>
            
        </nav>

          <div className='time-line-head'>
            {/* Titre Accueil
            <div className="timeline-title">
              <h1>Accueil</h1>
            </div> */}

            <div className='informations-bar'>
                    <ul>
                        <li className={selectedTab === 'Actualités' ? 'active' : ''} onClick={handleClickAcceuil}>Accueil</li>
                        <li className={selectedTab === 'Bio' ? 'active' : ''} onClick={handleClickStat}>Zone Statistique</li>  
                    </ul>
            </div>

          </div>

           
            
          {selectedTab === 'Accueil' && (

          <div>
          <div>
          {/* bouton afficher/masquer formulaire */}
          <button onClick={handleDisplayForm}>Nouveau message</button>
            
          {/* formulaire poster un new message */}
          {displayForm && (
            <div className="blur-bg">
              <div className="new-message-box">
                <button className="close-btn" onClick={handleDisplayForm}>
                  <ion-icon name="close-outline"></ion-icon>
                </button>
                <form onSubmit={handleSubmit}>
                  <label className="nouveau-message">
                      <textarea 
                        value={newMessage} 
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Quoi de neuf ?"
                      />
                       <button type="submit" className="submit-button">
                        Poster
                       </button>
                   </label>
                </form>
              </div>
             </div>
        )}
        </div>
       
      
         
          

          {/* mur de messages */}
          <div id="page">
            <ListeMessages messages={messages} setMessages={setMessages} userLogin={props.user.login} handleUserClick={props.handleUserClick} setUser={props.setUser} />
          </div>
          
          </div>
         )};

          {selectedTab === 'Stats' && (
            <div>
               {/* zone satistique */}
              <div className="statistique">
              
                
                <div className='nombre-utilisateurs'>
                  {ReturnNbUtilisateurs()}
                  <p>Nombre d'utilisateurs : {nbUtilisateurs}</p>
                </div>
              
                <div className='nombre-messages'>
                {ReturnNbMessages()}
                <p>Nombre de messages : {nbMessages}</p>            
                </div>


              </div>

            </div>
          )}

        </div>
      );
          
}

export default TimeLine;

