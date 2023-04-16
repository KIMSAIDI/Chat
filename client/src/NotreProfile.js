const NotreProfile = (props) => {
  

    return (
        <div>
            <nav id = "nav">
                {props.boutton_page()}
            </nav>
            <h1>Notre Profile {props.user.login} </h1>
            <ul>
                Liste Amis : 
                {props.user.listAmis.map((friend) => (
                    <li key={friend}>{friend}</li>
                ))}
            </ul>

            
        </div>
    )
}

export default NotreProfile;
