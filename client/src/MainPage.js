import { useState } from 'react';
import NavigationPanel from "./NavigationPanel";
import Signin from "./Signin"
import TimeLine from './TimeLine';
import Profile from './Profile';
import NotreProfile from './NotreProfile';

import axios from 'axios';
axios.defaults.baseURL = "http://localhost:3000";


function MainPage(props){
    //etats
    const [isConnected, setConnect] = useState(false);
    const [page, setPage] = useState("signin_page");
    const [user, setUser] = useState(null);

    const [selectedUser, setSelectedUser] = useState(props.user);

    

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
    }

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

      const boutton_page = () => {
        return (
          <div>
            <button onClick={() => {
              setPage("PageProfile");
              setSelectedUser(user);
            }}>Ma PageProfile</button>
      
            <button onClick={() => setPage("TimeLine")}>TimeLine</button>
          </div>
        );
      };


    return(
        <div>
            <nav id = "navigation"> 
                <NavigationPanel login={getConnected} logout={setLogout} isConnected={isConnected} user={user} setUser={setUser}/>  
            </nav>

            <div id = "page"> 
                {page === "TimeLine" && <TimeLine user = {user} setUser={setUser} handleUserClick={handleUserClick} setPage={setPage} setSelectedUser={setSelectedUser} boutton_page={boutton_page}/>}
                {page === "signin_page" && <Signin/>} 
                
                {page === "PageProfile" && selectedUser.login === user.login  && <NotreProfile user={user} boutton_page={boutton_page} />}
                
                {page === "PageProfile" && selectedUser.login !== user.login &&  <Profile user={selectedUser} boutton_page={boutton_page} />}
            </div>
        </div>    
    );
 }

 export default MainPage;



