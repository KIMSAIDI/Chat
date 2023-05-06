import { useState } from 'react'
import axios from "axios";
import './css/Logout.css';
function Logout(props) {
  const handleLogout = (user) => { 
    axios
      .post('/api/user/logout/', { user })
      .then((res) => {
        console.log(res);
        props.logout();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className='logout'>
      <button type="submit" onClick={() => handleLogout(props.user)}>
       
        <ion-icon name="log-out-outline"></ion-icon>
      </button>
    </div>
  );
}

export default Logout;