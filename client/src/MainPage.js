import { useState, useEffect } from 'react';
import NavigationPanel from "./NavigationPanel";
import Signin from "./Signin"
import TimeLine from './TimeLine';
import Profile from './Profile';


import axios from 'axios';
axios.defaults.baseURL = "http://localhost:3000";


function MainPage(props){
    //etats
    const [isConnected, setConnect] = useState(false);
    const [page, setPage] = useState("signin_page");
    const [user, setUser] = useState(null);

    const [selectedUser, setSelectedUser] = useState(props.user);
    
    const [isMyProfile, setIsMyProfile] = useState(false);
    
    


    //comportement 
    const getConnected = () => {
        setConnect(true);
        setPage("TimeLine");
        localStorage.setItem("isConnected", true);
        localStorage.setItem("user", JSON.stringify(user));
        
    };

   
    const setLogout = () => {
        setConnect(false);
        setUser(null);
        setPage("signin_page");
        localStorage.removeItem("isConnected");
        localStorage.removeItem("user");
        
    }
        

    const handleUserClick = async (author) => {
        try {
          const response = await axios.get(`/api/user/${author}/getUser`);
          setSelectedUser(response.data);
          setPage("PageProfile");
          if (response.data.login === user.login) {
            setIsMyProfile(true);
          }
        }
        catch (error) {
          console.error(error); 
        } 
      };

      const boutton_page = () => {
        return (
          <div>
            <button onClick={() => {
              setPage("PageProfile");
              setSelectedUser(user);
              setIsMyProfile(true);
            }}>Ma PageProfile</button>
      
            <button onClick={() => { 
              setPage("TimeLine");
              setIsMyProfile(false);
            }}>TimeLine</button>
          </div>
        );
      };

      useEffect(() => {
        const isConnected = localStorage.getItem("isConnected");
        const user = JSON.parse(localStorage.getItem("user"));
         if (isConnected && user) {
            setConnect(true);
            setUser(user);
            setPage("TimeLine");
        }
    }, []);

    return(
        <div>
            <nav id="navigation"> 
                <NavigationPanel login={getConnected} logout={setLogout} isConnected={isConnected} user={user} setUser={setUser}/>  
            </nav>

            <div id="page"> 

                {page === "signin_page" && <Signin/>} 
                {page === "PageProfile" && <Profile user={selectedUser} boutton_page={boutton_page} isMyProfile={isMyProfile}/>}
                
                {page === "TimeLine" && {user} && <TimeLine user={user} setUser={setUser} handleUserClick={handleUserClick} setPage={setPage} setSelectedUser={setSelectedUser} boutton_page={boutton_page}/>}
                
                
                
            </div>
        </div>    
    );
 }

 export default MainPage;



