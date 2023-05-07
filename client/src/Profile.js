import { useState, useEffect } from 'react';
import React from 'react';
import axios from 'axios';
import Message from './Message';

import './css/Profile.css';
import Swal from 'sweetalert';

axios.defaults.baseURL = "http://localhost:3000";


const Profile = (props) => {
    const [ListeUserAmis, setListeUserAmis] = useState(props.friendsList);  
    const [selectedTab, setSelectedTab] = useState('Actualités');
    const [bio, setBio] = useState('');
    const [Biographie_utilisateur, setBiographie_utilisateur] = useState('');
    const [dateNaissance, setDateNaissance] = useState('');
    const [ville, setVille] = useState('');
    const [status, setStatus] = useState('');
    const [genre, setGenre] = useState('');
    const [avatarUrl,setAvatarUrl] = useState(props.user.avatarUrl);
   
    useEffect(() => {
        afficheBio();
    }, [bio])


    useEffect(() => {
        afficheVille();
      }, []);

    useEffect(() => {
        afficheStatus();
    }, []);

    useEffect(() => {
        afficheGenre();
    }, []);

    useEffect(() => {
        afficheDate();
    }, []);
   

    const handleClickActu = () => {
        setSelectedTab('Actualités');
       
    }
    const handleClickBio = () => {
        setSelectedTab('Bio');  
    }
    const handleClickAmis = () => {
        setSelectedTab('Amis');
    }   
    
    const handleChangeDate = (e) => {
        setDateNaissance(e.target.value);
      };

    const handleChangeVille = (e) => {
        setVille(e.target.value);
        };
    
    const handleChangeStatus = (e) => {
        setStatus(e.target.value);
    };

    const handleChangeGenre = (e) => {
        setGenre(e.target.value);
    };

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
            afficheBio();
            setBio('');  
            Swal('Votre biographie a bien été modifiée')
        }
        catch(error){
           
            console.log(error)
        }
    }
    
    const afficheBio = async () => {
        try {
            const res = await axios.get(`/api/user/${props.user.login}/getBio/`)
            setBiographie_utilisateur(res.data)
    
       
        } catch (error) {
            if (error.response && error.response.status === 404) {
                alert('Cet utilisateur n\'existe pas.');
            }
            console.log(error)
        }
    }

    
    const handleDate = async (e) => {
        e.preventDefault();
        console.log(dateNaissance);
        try {
          const formattedDate = new Date(dateNaissance).toISOString().substring(0, 10);
          const res = await axios.post(`/api/user/date/`, {
            date: formattedDate,
            login: props.user.login,
          });
          console.log(res.data);
          setDateNaissance('');
        } catch (error) {
          console.log(error);
        }
      };
      
      

    const afficheDate = async () => {
        try {
            const res = await axios.get(`/api/user/${props.user.login}/getDate/`)
            setDateNaissance(res.data)
        }
        catch(error){
            console.log(error)
        }
    }


    const handleVille = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.patch(`/api/user/ville/`,{
                ville: ville,
                login : props.user.login
            })
            console.log(res.data)
          
            setVille('');   
            Swal('Votre ville a bien été modifiée') 
        }
        catch(error){
            console.log(error)
        }
    }

   

    const afficheVille = async () => {
        try {
            const res = await axios.get(`/api/user/${props.user.login}/getVille/`)
            setVille(res.data)
          
        }
        catch(error){
            console.log(error)
        }
    }

    const afficheStatus = async () => {
        try {
            const res = await axios.get(`/api/user/${props.user.login}/getStatus/`)
            setStatus(res.data)
        }
        catch(error){
            console.log(error)
        }
    }
    const afficheGenre = async () => {
        try {
            const res = await axios.get(`/api/user/${props.user.login}/getGenre/`)
            setGenre(res.data)
        }
        catch(error){
            console.log(error)
        }
    }


    const handleStatus = async (e) => {
        e.preventDefault(); 
        try {
            const res = await axios.post(`/api/user/status/`,{
                status: status,
                login : props.user.login
            })
            console.log(res.data)
            setStatus('');
            Swal('Votre status a bien été modifié')

        }
        catch(error){
            console.log(error)
        }
    }
    const handleGenre = async (event) => {
        event.preventDefault(); 
        try {
            const res = await axios.post(`/api/user/genre/`,{
                genre: genre,
                login : props.user.login
            })
            console.log(res.data)
            setGenre(''); 
            Swal('Votre genre a bien été modifié')   
        }
        catch(error){
            console.log(error)
        }
    }

    

  


    return (
        <div className='pageprofile'>
             <nav className="nav">
                    {props.boutton_page()}
            </nav> 
            {/* tête de page profil */}
            <div className='container'>  
                  {/* barre selection  */}
                <div className='informations-bar'>
                    <ul>
                        <li className={selectedTab === 'Actualités' ? 'active' : ''} onClick={handleClickActu}>Page de Profile</li>
                        <li className={selectedTab === 'Bio' ? 'active' : ''} onClick={handleClickBio}>Bio</li>
                        <li className={selectedTab === 'Amis' ? 'active' : ''} onClick={handleClickAmis}>Amis</li> 
                        {/* boutton pour revenir a la timeline */}
                    </ul>
                    <br />
                    
                    
                    {/* photo profil et nom de l'utilisateur */}
                    <div className='profile'>
                        <a href='https://getavataaars.com/?accessoriesType=Round&avatarStyle=Transparent&clotheColor=Heather&clotheType=Hoodie&eyeType=Hearts&eyebrowType=UpDownNatural&facialHairColor=Blonde&facialHairType=BeardLight&graphicType=SkullOutline&hairColor=Red&mouthType=Serious&skinColor=Yellow&topType=LongHairCurvy' target='_blank'>
                            <img src={avatarUrl} alt='Avatar'/>
                            </a >
                    <p className='name'>{props.user.login}</p>
                </div>
        
                </div>
            </div>

           
                {/* contenu des selection */}
            <div className="content">
                <div style={{ marginBottom: "100px" }}></div>
                {/* listes des messages */}
                {selectedTab === 'Actualités' && (<div className="ListeDeNosMessages">
                    <div>
                        <nav id="page">
                            {props.message.map((message) => (
                               <Message key={message._id} message={message} userLogin={props.userLogin} handleUserClick = {props.handleUserClick} setUser = {props.setUser} isMyProfile = {props.isMyProfile} /> 
                        ))}
                        </nav>
                    </div>
                </div>)}

                {/* Biographie */}
                {selectedTab === 'Bio' && (
                <div className='Bio'>
                    <h2>Biographie de {props.user.login} </h2>
                        
                        {/* modifier la bio */}
                        {props.isMyProfile ? (
                        <div className="bio-container_my_profil">

                            {/* biographie */}
                            <div className="bio-input">
                            <textarea className="bio" onChange={(e) => setBio(e.target.value)} placeholder="Racontez-nous qui vous êtes" />
                            <button onClick={handleBio}>Valider</button>
                            </div>
                                <p className="biographie">Biographie de l'utilisateur : {Biographie_utilisateur}</p>
                        
                            {/* Date de naissance */}
                            < br />

                            <div className="date">
                            <form onSubmit={handleDate}>
                                <label htmlFor="dateNaissance">Date de naissance :</label>
                                <input
                                    type="date"
                                    id="dateNaissance"
                                    value={dateNaissance}
                                    onChange={handleChangeDate}
                                    
                                />
                                <button type="submit">Soumettre</button>    
                            </form>
                            </div>
                            {dateNaissance}
                       
                    
                        
                        {/* ville */}
                        <div className="ville">
                        <form onSubmit={handleVille}>
                        <label htmlFor="ville">Ville :</label>
                        <input
                            type="text"
                            id="ville"
                            value={ville}
                            onChange={handleChangeVille}
                        />
                        <button type="submit">Soumettre</button>
                        </form>
                        

                        </div>

                        <div>{ville}</div>

                        <div className="status">
                            <form onSubmit={handleStatus}>
                                <label htmlFor="status">Statut :</label>
                                <select id="status" value={status} onChange={handleChangeStatus} required>
                                <option value="">Sélectionner le statut</option>
                                <option value="célibat">Célibat</option>
                                <option value="en-couple">En couple</option>
                                <option value="marié">Marié</option>
                                <option value="concubinage">Concubinage</option>
                                <option value="mineur">Mineure</option>
                                <option value="recherche-amour">En recherche de l'amour</option>
                                </select>
                                <button type="submit">Soumettre</button>
                            </form>
                            
                            </div>
                            
                            {status}


                        {/* genre */}
                        <div className="genre">
                            <form onSubmit={handleGenre}>
                                <label htmlFor="genre">Genre :</label>
                                <select id="genre" value={genre} onChange={handleChangeGenre} required>
                                <option value="">Sélectionner le genre</option>
                                <option value="homme">Homme</option>
                                <option value="femme">Femme</option>
                                <option value="non-spécifié">Non spécifié</option>
                                </select>
                                <button type="submit">Soumettre</button>
                            </form>
                            {genre}
                            </div>
                          

                        </div>
                        ) : (
                        <div className='bio-container'>
                            <p>Biographie de l'utilisateur : {Biographie_utilisateur}</p>
                       
                                <p>{dateNaissance}</p>
                                {ville}
                                {status}
                                {genre}
                        </div>

                        )}
                        
                       

                      
                        </div>
                
                )}
                
                {/* liste des amis */}
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
