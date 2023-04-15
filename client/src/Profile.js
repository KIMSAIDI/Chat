

const Profile = (props) => {
  

    return (
        <div>
            <nav id = "nav">
                {props.boutton_page()}
            </nav>
            <h1>Profile {props.user.login} </h1>
        </div>
    )
}

export default Profile;
