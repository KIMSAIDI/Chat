import { useState, useEffect } from 'react';
import React from 'react';
import axios from 'axios';

const Profile = (props) => {
    const [ListeUserAmis, setListeUserAmis] = useState(props.friendsList);  
    console.log(ListeUserAmis)
    /*
    useEffect(() =>{
        axios.get('/api/user/getFriends', {
            params: {
                login: props.user.login
            }
        })
          .then(res => setListeUserAmis(res.data))
          .catch(err => console.log(err));
    },[ListeUserAmis]);
    */

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

            <div id="page">
                {props.isMyProfile ? <p>On est sur NOTRE page</p> : <p>On est sur la page de quelqu'un d'autre</p>}
            </div>

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



            {/* <nav id="msg">
                <TimeLine user = {props.user} setUser={props.setUser} handleUserClick={props.handleUserClick} setPage={props.setPage} setSelectedUser={props.setSelectedUser} boutton_page={props.boutton_page}/>
            </nav> */}
        </div>
    )
}

export default Profile;
