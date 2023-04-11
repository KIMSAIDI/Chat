import { useState } from 'react'
import axios from "axios";

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
    <div>
      <button type="submit" onClick={() => handleLogout(props.user)}>
        deconnexion
      </button>
    </div>
  );
}

export default Logout;