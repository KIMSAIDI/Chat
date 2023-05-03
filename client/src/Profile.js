import { useState, useEffect } from 'react';
import React from 'react';
import axios from 'axios';
import Message from './Message';

import './css/Profile.css';

axios.defaults.baseURL = "http://localhost:3000";


const Profile = (props) => {
    const [ListeUserAmis, setListeUserAmis] = useState(props.friendsList);  
    const [selectedTab, setSelectedTab] = useState('Actualités');
    const [bio, setBio] = useState('');
    const [Biographie_utilisateur, setBiographie_utilisateur] = useState('');
    const [cmpt, setCmpt] = useState(0);

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

    const handleBio = async () => {
        try{
            const res = await axios.post(`/api/user/bio`,{
                bio: bio,
                login : props.user.login
            })
            console.log(res.data)    
        }
        catch(error){
           
            console.log(error)
        }
    }
    
    const afficheBio = () => {
        setCmpt(0)
        try {
            const res = axios.get(`/api/user/getBio`,{
                login : props.user.login
        })
        console.log(res.data)
        console.log("affichebio")
        setBiographie_utilisateur(res.data)

        return (Biographie_utilisateur)
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className='pageprofile'>
            
            <div className='container'>        
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
                    <h2>Biographie de {props.user.login} </h2>
                        {/* {afficheBio} */}
                        
                        <textarea className='bio' onChange={(e) => setBio(e.target.value)} placeholder="Racontez-nous qui vous êtes" />
                        <br/>
                        <button onClick={handleBio}>Valider</button>
                </div>
                )}
                
                {selectedTab === 'Amis' && (
                    <div className="delete">
                    {props.isMyProfile ? (
                    <ul>   
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
