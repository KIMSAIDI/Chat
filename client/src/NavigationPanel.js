import { useState } from 'react';
import Logout from './Logout';
import Login from './Login';

import './css/NavigationPanel.css';


function NavigationPanel(props){
    return(
    <nav className="navigation_pan">
        {(props.isConnected) ? <Logout logout={props.logout} user = {props.user}/> : <Login connect={props.login} user = {props.user} setUser={props.setUser}  />}
    </nav>    
    );

}
export default NavigationPanel;