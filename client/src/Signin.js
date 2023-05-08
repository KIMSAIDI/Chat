import React, { useState } from "react";
import axios from "axios";
import Swal from 'sweetalert';


axios.defaults.baseURL = "http://localhost:3000";

const Signup = (props) => {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [lastname, setLastname] = useState("");
    const [firstname, setFirstname] = useState("");
    const [pass1, setPass1] = useState("");
    const [pass2, setPass2] = useState("");
    const [passOk, setPassOk] = useState(false);
    const [error, setError] = useState("");
    const [showSigninForm, setShowSigninForm] = useState(false);

    const [avatarUrl,setAvatarUrl] = useState("");

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
      if (pass1===pass2) {
          setPassOk(true);
          axios.post('/api/user/',{
              login: login,
              password: pass1,
              lastname: lastname,
              firstname: firstname,
              avatarUrl : avatarUrl
          }) 
          .then((response) => {
              console.log(response);
              Swal({
                title: "Inscription réussie !",
              });
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

    const handleLogin = () => {
        props.setPage('login_page');
    };

    function handleSigninClick() {
      setShowSigninForm(true);
   
    }

  

    function handleCloseSigninClick() {
      setShowSigninForm(false);
    }

  return (
    <div className="accueil">
      <div className="header">
        <a className="logo">MOOD</a>
        <nav className="navbar">
        
          
          <a onClick={handleSigninClick}>Signin</a>
          <a onClick={handleLogin}>Login</a>
        </nav>
      </div>

      {showSigninForm && (
        <div className="signin-form">
          <div className="wrapper">
            <span className="icon-close" onClick={handleCloseSigninClick}> 
               <ion-icon name="close-outline"></ion-icon>
             </span>
            <form>
              <h2>Signin</h2>
              <div className="input-box">
                <span className="icon"><ion-icon name="person-outline"></ion-icon></span>
                <input type="email" value={login} onChange={(e) => setLogin(e.target.value)} name="login" onFocus={handleFocus} onBlur={handleBlur} required />
                <label className={login ? 'filled' : ''}> Pseudo </label> 
              </div>

              <div className="input-box">
                <span className="icon"><ion-icon name="lock-closed-outline"></ion-icon></span>
                <input type="password" value={pass1} onChange={(e) => setPass1(e.target.value)} name="pass1" onFocus={handleFocus} onBlur={handleBlur} required />
                <label className={pass1 ? 'filled' : ''}> Mot de passe </label>
              </div>

              <div className="input-box">
                <span className="icon"><ion-icon name="lock-closed-outline"></ion-icon></span>
                <input type="password" value={pass2} onChange={(e) => setPass2(e.target.value)} name="pass2" onFocus={handleFocus} onBlur={handleBlur} required />
                <label className={pass2 ? 'filled' : ''}> Confirmer le mot de passe </label>
              </div>

              <div className="input-box">
                <span className="icon"><ion-icon name="body-outline"></ion-icon></span>
                <input type="text" value={lastname} onChange={(e) => setLastname(e.target.value)} name="lastname" onFocus={handleFocus} onBlur={handleBlur} required />
                <label className={lastname ? 'filled' : ''}> Nom </label> 
              </div>

              <div className="input-box">
                <span className="icon"><ion-icon name="body-outline"></ion-icon></span>
                <input type="text" value={firstname} onChange={(e) => setFirstname(e.target.value)} name="firstname" onFocus={handleFocus} onBlur={handleBlur} required />
                <label className={firstname ? 'filled' : ''}> Prénom </label> 
              </div>


              <div className="input-box">
                <span className="icon"><ion-icon name="body-outline"></ion-icon></span>
                <input 
                  type="text" 
                  value={avatarUrl} 
                  onChange={(e) => setAvatarUrl(e.target.value)} 
                  name="avatarUrl" 
                  onFocus={handleFocus} 
                  onBlur={handleBlur} 
                placeholder="Entrez l'URL de votre Avatar" 
                />
              </div>

              <div>
                <p>Lien pour crée son avatar : 
                <a href="https://getavataaars.com/" target="_blank" rel="noopener noreferrer"><a className="avatar-lien"> Avatar-lien </a></a></p>
              </div>


              <button type="submit" onClick={handleSubmit}>Inscription</button>
             
              <div className='error'>
                <span> {error && <div className="error">{error}</div>} </span>  
              
              </div>
              <div className="login-link">
                <p>Déjà un compte? <a onClick={handleLogin}>Connectez-vous ici</a></p>
              </div>
              </form>
              </div>
            </div>
              )}

              
          </div>
        );      
};
export default Signup;
