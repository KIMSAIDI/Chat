import { useState } from 'react';
import axios from "axios";
import './css/styles.css';

axios.defaults.baseURL = "http://localhost:3000";

function Login (props){
    //états
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    const handleFocus = (e) => {
        e.target.previousElementSibling.classList.add('active');
    }

    const handleBlur = (e) => {
        if (e.target.value === '') {
            e.target.previousElementSibling.classList.remove('active');
        } else {
            e.target.previousElementSibling.classList.add('filled');
        }
    }
   

    const handleSubmit = (e) => {  
        e.preventDefault();
        const configuration = {
            method: 'POST',
            url: "/api/user/login/",
            data: {
                login: login,
                password: password,
            }
        };
        axios(configuration)
            .then((res) => {
                console.log(res);
                if (res.status === 200) {
                    
                    props.setUser(res.data.user);  // Mettre à jour l'état user dans MainPage
                    props.connect();
                    console.log("Utilisateur " + res.data.user.login + " connecté avec succès !");
                } else {
                    console.log("Login ou mot de passe incorrect");
                    setError("Login ou mot de passe incorrect");
                }
            })
            .catch((error) => {
                console.log(error);
                setError("Login ou mot de passe incorrect");
            });
    };

    const handleSignin = () => {
        props.setPage('signin_page');
    };

    /*
    return(
        <div className="wrapper">
            <form >
                <h2>Login </h2>
                <div className="input-box">
                    <span className="icon"><ion-icon name="person-outline"></ion-icon></span>
                    <input type="email" value={login} onChange={(e) => setLogin(e.target.value)} name="login" />
                    <label> pseudo </label> 
                </div>

                <div className="input-box">
                    <span className="icon"><ion-icon name="lock-closed-outline"></ion-icon></span>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} name="password" />
                    <label> password </label>
                </div>


                <button type="submit" onClick={handleSubmit}>connexion</button>
                <div className="register-link">
                <p>Pas encore de compte? <a onClick={handleSignin}>S'inscrire</a></p>
                </div>
                {error && <p>{error}</p>}

            </form>
         </div>
    );
    */
    return (
        <div className="login-form"> 
            <div className = "blob"></div>
            <div className="wrapper">
            <form>
                <h2>Login </h2>
                <div className="input-box">
                    <span className="icon"><ion-icon name="person-outline"></ion-icon></span>
                    <input type="email" value={login} onChange={(e) => setLogin(e.target.value)} name="login" onFocus={handleFocus} onBlur={handleBlur} required />
                    <label className={login ? 'filled' : ''}> Pseudo </label> 
                </div>

                <div className="input-box">
                    <span className="icon"><ion-icon name="lock-closed-outline"></ion-icon></span>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} name="password" onFocus={handleFocus} onBlur={handleBlur} required />
                    <label className={password ? 'filled' : ''}> Mot de passe </label>
                </div>

                <button type="submit" onClick={handleSubmit}>Connexion</button>
                <div className="register-link">
                    <p>Pas encore de compte? <a onClick={handleSignin}>S'inscrire</a></p>
                </div>
                {error && <p>{error}</p>}
            </form>
            </div>
         </div>
    );


};
export default Login;



