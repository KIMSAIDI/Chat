import React from 'react';


const Profile = (props) => {
  

    return (
        <div>
            <nav id = "nav">
                {props.boutton_page()}
            </nav>
            <h1>Profile {props.user.login} </h1>

            <div id="page">
                {props.isMyProfile ? <p>On est sur NOTRE page</p> : <p>On est sur la page de quelqu'un d'autre</p>}
            </div>

            <ul> Liste Amis : 
            {props.user.listAmis.map((friend) => (
                <li key={friend}>{friend}</li>
            ))}
            </ul>


            {/* <nav id="msg">
                <TimeLine user = {props.user} setUser={props.setUser} handleUserClick={props.handleUserClick} setPage={props.setPage} setSelectedUser={props.setSelectedUser} boutton_page={props.boutton_page}/>
            </nav> */}
        </div>
    )
}

export default Profile;
