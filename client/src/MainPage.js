import { useState } from 'react';
import NavigationPanel from "./NavigationPanel";
import Signin from "./Signin"
import TimeLine from './TimeLine';


function MainPage(props){
    //etats
    const [isConnected, setConnect] = useState(false);
    const [page, setPage] = useState("signin_page");
    const [user, setUser] = useState(null);
    

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

    return(
        <div>
            <nav id = "navigation"> 
                <NavigationPanel login={getConnected} logout={setLogout} isConnected={isConnected} user={user} setUser={setUser}/>  
            </nav>

            <div id = "page"> 
                {page === "TimeLine" && <TimeLine user = {user} setUser={setUser} />}
                {page === "signin_page" && <Signin/>}   
            </div>
        </div>    
    );
 }

 export default MainPage;



