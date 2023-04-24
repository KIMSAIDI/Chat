import { useState, useEffect } from 'react';
import NavigationPanel from "./NavigationPanel";
import Signin from "./Signin";
import TimeLine from './TimeLine';
import Profile from './Profile';
import Login from './Login';
import axios from 'axios';

axios.defaults.baseURL = "http://localhost:3000";


function MainPage(props){
    //etats
    const [isConnected, setConnect] = useState(false);
    const [page, setPage] = useState("login_page");
    const [user, setUser] = useState(null);
    const [friendsList, setFriendsList] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [isMyProfile, setIsMyProfile] = useState(false);
    const [messages_by_login, setMessages_by_login] = useState([]);

    
    //comportement 

    //se connecter
    const getConnected = () =>{
      setConnect(true);
      setPage("TimeLine");
      localStorage.removeItem("isConnected"); // Supprimer les données stockées localement
      localStorage.removeItem("user"); // Supprimer les données stockées localement
      localStorage.setItem("isConnected", true);
      localStorage.setItem("user", JSON.stringify(user));
  };

   //se deconnecter
    const setLogout = () => {
        setConnect(false);
        setUser(null);
        setPage("login_page");
        localStorage.removeItem("isConnected");
        localStorage.removeItem("user");
        
    }
        
    // Methode permettant d'acceder a un profil
    const handleUserClick = async (author) => {
        try {
          const response = await axios.get(`/api/user/${author}/getUser`);
          setSelectedUser(response.data);
          if (response.data.login === user.login) {
            setIsMyProfile(true);
          }
          setPage("PageProfile");
          getmessage(response.data.login);
          
        }
        catch (error) {
          console.error(error); 
        } 
        
      };


      const getmessage = (auteur) => {
        axios.get(`/api/messagebyLogin/`, {
          params: {
              login: auteur
              }
          })
        .then(res => setMessages_by_login(res.data))
        .catch(err => console.log(err));
      }

       //Bouton pou switch entre la TL et les pages de profils
     const boutton_page = () => {  
      
      return (
        <div>
          {page === "PageProfile" ? (
            <button
              onClick={() => {
                setPage("TimeLine");
                setIsMyProfile(false);
                
              }}
            >
              TimeLine
            </button>
          ) : (
            <button
              onClick={() => {
                setSelectedUser(user);
                getmessage(user.login);
                setPage("PageProfile");
                setIsMyProfile(true);
              }}
            >
              Ma PageProfile
            </button>
          )}
        </div>
      );
      };
    

      // ??
      
      useEffect(() => {
        const isConnected = localStorage.getItem("isConnected");
        const user = JSON.parse(localStorage.getItem("user"));
         if (isConnected && user) {
            setConnect(true);

            setUser(user);
            setPage("TimeLine");
        }
    }, []);
    

    // met a jour la liste d'amis de  l'utilisateur a chaque fois qu'il est modifié 
    useEffect(() => {
      const majfriendsList = async () => {
        try {
          const response = await axios.get('/api/user/getFriends', {
          params: { login: user.login }
          });
          setFriendsList(response.data);
        } catch (error) {
          console.error(error);
        }
      };
    
      if (user) { 
        majfriendsList();
      }
    }, [user]);
       
    return (
      <div>
        {isConnected && <NavigationPanel logout={setLogout} user={user} setUser={setUser} />}
        <div id="page">
          {!isConnected && page === "signin_page" && <Signin setPage = {setPage} />}
          {!isConnected && page === "login_page" &&  <Login connect={getConnected} user = {user} setUser={setUser} setPage = {setPage} />}
          {isConnected && (
            <>
              {page === "PageProfile" && (
                <Profile
                  setUser={setUser}
                  user={selectedUser}
                  boutton_page={boutton_page}
                  isMyProfile={isMyProfile}
                  friendsList={friendsList}
                  setFriendsList={setFriendsList}
                  message = {messages_by_login}
                />
              )}
              {page === "TimeLine" && user && (
                <TimeLine
                  user={user}
                  setUser={setUser}
                  handleUserClick={handleUserClick}
                  setPage={setPage}
                  setSelectedUser={setSelectedUser}
                  boutton_page={boutton_page}
                />
              )}
            </>
          )}
        </div>
      </div>
    );



 }

 export default MainPage;



