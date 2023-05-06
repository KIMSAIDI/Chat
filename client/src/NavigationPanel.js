import Logout from './Logout';
import Login from './Login';

import './css/NavigationPanel.css';


function NavigationPanel(props){

   
    

    return(
        <div className="navigation_pan"> 
            <nav className="logout">
                <Logout logout={props.logout} user ={props.user}/>
            </nav>
        
         </div> 
    );
}
export default NavigationPanel;

