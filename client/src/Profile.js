import { useState, useEffect } from 'react';
import React from 'react';
import axios from 'axios';
import Message from './Message';

const Profile = (props) => {
    const [ListeUserAmis, setListeUserAmis] = useState(props.friendsList);  
    
    
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
        <div>
            <nav id = "nav">
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

            {/* pour afficher les messages de l'utilisateur sélectionné */}
            <div>
                <nav id="page">
                    {props.message.map((message) => (
                        <Message key={message._id} message={message} userLogin={props.userLogin} handleUserClick = {props.handleUserClick} setUser = {props.setUser} isMyProfile = {props.isMyProfile}/> 
                    ))}
                </nav>
            </div>

        </div>
    )
}

export default Profile;
