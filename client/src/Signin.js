import React, { useState } from "react";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:3000";

const Signup = () => {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [lastname, setLastname] = useState("");
    const [firstname, setFirstname] = useState("");
    const [pass1, setPass1] = useState("");
    const [pass2, setPass2] = useState("");
    const [passOk, setPassOk] = useState(false);
    const [error, setError] = useState("");

    
    const handleSubmit = (e) => {  
        e.preventDefault();
        if (pass1===pass2) {
            setPassOk(true);
            axios.post('/api/user/',{
                login: login,
                password: pass1,
                lastname: lastname,
                firstname: firstname
            }) 
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                if (error.response && error.response.status === 409) {
                  setError("Ce login est déjà utilisé.");
                } else {
                  console.log(error);
                  setError("Une erreur s'est produite.");
                }
              });
        } else {
            setPassOk(false)
            setError("Les mots de passe ne correspondent pas");
            setPass1("");
            setPass2("");
        }
    };

    const handleReset = () => {
        setLogin("");
        setPass1("");
        setPass2("");
        setLastname("");
        setFirstname("");
        setError("");
    };


    return (
        <div className="signup">
        <form>
        <label>
            Login:
            <input type="email" value={login} onChange={(e) => setLogin(e.target.value)} name =  "login" />
        </label>
        <label>
            Password:
            <input type="password" value={pass1} onChange={(e) => setPass1(e.target.value)} name = "pass1" />
        </label>
        <label>
            Confirm Password:
            <input type="password" value={pass2} onChange={(e) => setPass2(e.target.value)} name = "pass2" />
        </label>
        <label>
            Lastname:
            <input type="text" value={lastname} onChange={(e) => setLastname(e.target.value)} name = "lastname" />
        </label>
        <label>
            Firstname:
            <input type="text" value={firstname} onChange={(e) => setFirstname(e.target.value)} name = "firstname" />
        </label>
        <button type="submit" onClick={handleSubmit}>Sign up</button>
            <button type="reset" onClick={handleReset}>Reset</button>
        {error && <p>{error}</p>}
        </form>
        </div>
    );
};
export default Signup;
