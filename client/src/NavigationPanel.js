import Logout from './Logout';
import Login from './Login';

import './css/NavigationPanel.css';


function NavigationPanel(props){

   
    /*
    return(
        <div className="navigation_pan">
            {(props.isConnected) ? 
            <nav className="logout">
                <Logout logout={props.logout} user = {props.user}/>
            </nav>
            : 
            <nav className="login">
                <h1>Connectez-vous</h1>
                <Login connect={props.login} user = {props.user} setUser={props.setUser}  />
            </nav>
        }
        
    </div>   
    );
    */

    return(
        <div className="navigation_pan"> 
            <nav className="logout">
                <Logout logout={props.logout} user ={props.user}/>
            </nav>
        
         </div> 
    );
}
export default NavigationPanel;

