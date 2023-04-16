const NotreProfile = (props) => {
  

    return (
        <div>
            <nav id = "nav">
                {props.boutton_page()}
            </nav>
            <h1>Notre Profile {props.user.login} </h1>

            {/* <p>{props.user.listAmis}</p> */}
        </div>
    )
}

export default NotreProfile;
