import { useState } from 'react';
import axios from "axios";
axios.defaults.baseURL = "http://localhost:3000";

function Login (props){
    //états
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
   

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
    
    return(
        <form>
            <link rel="stylesheet" href="css/style.css"></link>

            <label>
            Login:
            <input type="email" value={login} onChange={(e) => setLogin(e.target.value)} name =  "login" />
            </label>

           <label>
            Password:
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} name = "password" />
            </label>


            <button type="submit" onClick={handleSubmit}>connexion</button>
            
            {error && <p>{error}</p>}

         </form>
    );

};
export default Login;



