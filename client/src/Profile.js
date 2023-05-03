import { useState, useEffect } from 'react';
import React from 'react';
import axios from 'axios';
import Message from './Message';

import './css/Profile.css';

const Profile = (props) => {
    const [ListeUserAmis, setListeUserAmis] = useState(props.friendsList);  
    
    const [selectedTab, setSelectedTab] = useState('Actualités');

    const handleClickActu = () => {
        setSelectedTab('Actualités');
       
    }

    const handleClickBio = () => {
        setSelectedTab('Bio');
       
    }

    const handleClickAmis = () => {
        setSelectedTab('Amis');
    }
        
    // useEffect(() => {
    //     axios.get(`/api/messagebyLogin/`, {
    //         params: {
    //             login : props.userLogin
    //         }
    //     })
    //       .then(res => props.setMessage(res.data))
    //       .catch(err => console.log(err));
    //   }, []);
    
    const handleDeleteFriend = async (friend) => {
        try {
          const response = await axios.patch(`/api/user/${friend}/delete/`, {
            me: props.user.login,
            friend: friend
          });
          console.log(response.data);
      
          // Mettre à jour l'utilisateur avec ses nouveaux amis
          props.setUser(response.data.user);
          
          setListeUserAmis(ListeAmis => ListeAmis.filter(ami => ami !== friend));
        } catch (error) {
          if (error.response && error.response.status === 409 && error.response.data.message === 'Cet utilisateur n\'est pas votre ami') {
            alert('Vous avez déjà supprimé cet utilisateur en ami.');
          } else {
            console.error(error);
          }
        }
    }

    

    return (
        <div className='pageprofile'>
            
            <div className='container'>
                {/* <nav id = "nav">
                    {props.boutton_page()}
                </nav>
                <h1>Profile {props.user.login} </h1>

                <div id="delete">
                    {props.isMyProfile ? (
                        <ul> Liste Amis : 
                            {ListeUserAmis.map((friend) => (
                                <li key={friend}>
                                    {friend}
                                    <button onClick={() => handleDeleteFriend(friend)}>Supprimer</button>
                                
                                </li>
                                ))}
                        </ul>
                    ) : (
                        <ul>
                            Liste Amis :
                            {props.user.listAmis.map((friend) => (
                                <li key={friend}>{friend}</li>
                            ))}
                        </ul>
                    )}
                </div>

            
                <div>
                    <nav id="page">
                        {props.message.map((message) => (
                            <Message key={message._id} message={message} userLogin={props.userLogin} handleUserClick = {props.handleUserClick} setUser = {props.setUser} isMyProfile = {props.isMyProfile}/> 
                        ))}
                    </nav>
                </div> */}
                
                
                    <div className='informations-bar'>
                        <ul>
                            
                            <li className={selectedTab === 'Actualités' ? 'active' : ''} onClick={handleClickActu}>Actualités</li>
                            <li className={selectedTab === 'Bio' ? 'active' : ''} onClick={handleClickBio}>Bio</li>
                            <li className={selectedTab === 'Amis' ? 'active' : ''} onClick={handleClickAmis}>Amis</li>
                            
                        </ul>

                        <div className='profile'>
                            <img src="https://institutcommotions.com/wp-content/uploads/2018/05/blank-profile-picture-973460_960_720-1.png" alt="Photo de profil" /> 
                            <p className='name'>{props.user.login}</p>
                        </div>

                        
                    </div>
                </div>
                
                <div className="content">
                <nav id = "nav">
                    {props.boutton_page()}
                </nav> 
                    {selectedTab === 'Actualités' && (<div className="ListeDeNosMessages">
                        <div>
                             
                            <nav id="page">
                                {props.message.map((message) => (
                                    <Message key={message._id} message={message} userLogin={props.userLogin} handleUserClick = {props.handleUserClick} setUser = {props.setUser} isMyProfile = {props.isMyProfile}/> 
                            ))}
                            </nav>
                        </div>
                    </div>)}
                        
                    {selectedTab === 'Bio' && (
                    <div>
                        <h2>Bio</h2>
                            <p>Coucou, voici la section Bio.</p>
                    </div>
                    )}
                    
                    {selectedTab === 'Amis' && (
                        <div id="delete">
                        {props.isMyProfile ? (
                            <ul> Liste Amis : 
                                {ListeUserAmis.map((friend) => (
                                    <li key={friend}>
                                        {friend}
                                        <button onClick={() => handleDeleteFriend(friend)}>Supprimer</button>
                                    
                                    </li>
                                    ))}
                            </ul>
                        ) : (
                            <ul>
                                Liste Amis :
                                {props.user.listAmis.map((friend) => (
                                    <li key={friend}>{friend}</li>
                                    
                                ))}
                            </ul>
                        )}
                    </div>
                    )}
                
                </div>
                
        </div>
       

    )
}

export default Profile;
