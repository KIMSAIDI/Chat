// const express = require("express");
// const Users = require("./entities/users.js");

// // const express = require("express");
// // const Users = require("./entities/users.js");

// // function init(db) {
// //     const router = express.Router();
// //     // On utilise JSON
// //     router.use(express.json());
// //     // simple logger for this router's requests
// //     // all requests to this router will first hit this middleware
// //     router.use((req, res, next) => {
// //         console.log('API: method %s, path %s', req.method, req.path);
// //         console.log('Body', req.body);
// //         next();
// //     });
// //     const users = new Users.default(db);
// //     router.post("/user/login", async (req, res) => {
// //         try {
// //             const { login, password } = req.body;
// //             // Erreur sur la requête HTTP
// //             if (!login || !password) {
// //                 res.status(400).json({
// //                     status: 400,
// //                     "message": "Requête invalide : login et password nécessaires"
// //                 });
// //                 return;
// //             }
// //             if(! await users.exists(login)) {
// //                 res.status(401).json({
// //                     status: 401,
// //                     message: "Utilisateur inconnu"
// //                 });
// //                 return;
// //             }
// //             let userid = await users.checkpassword(login, password);
// //             if (userid) {
// //                 // Avec middleware express-session
// //                 req.session.regenerate(function (err) {
// //                     if (err) {
// //                         res.status(500).json({
// //                             status: 500,
// //                             message: "Erreur interne"
// //                         });
// //                     }
// //                     else {
// //                         // C'est bon, nouvelle session créée
// //                         req.session.userid = userid;
// //                         res.status(200).json({
// //                             status: 200,
// //                             message: "Login et mot de passe accepté"
// //                         });
// //                     }
// //                 });
// //                 return;
// //             }
// //             // Faux login : destruction de la session et erreur
// //             req.session.destroy((err) => { });
// //             res.status(403).json({
// //                 status: 403,
// //                 message: "login et/ou le mot de passe invalide(s)"
// //             });
// //             return;
// //         }
// //         catch (e) {
// //             // Toute autre erreur
// //             res.status(500).json({
// //                 status: 500,
// //                 message: "erreur interne",
// //                 details: (e || "Erreur inconnue").toString()
// //             });
// //         }
// //     });

// //     router
// //         .route("/user/:user_id(\\d+)")
// //         .get(async (req, res) => {
// //         try {
// //             const user = await users.get(req.params.user_id);
// //             if (!user)
// //                 res.sendStatus(404);
// //             else
// //                 res.send(user);
// //         }
// //         catch (e) {
// //             res.status(500).send(e);
// //         }
// //     })
// //         .delete((req, res, next) => res.send(`delete user ${req.params.user_id}`));

// //     router.post("/user", (req, res) => {
// //         const { login, password, lastname, firstname } = req.body;
// //         if (!login || !password || !lastname || !firstname) {
// //             res.status(400).send("Missing fields");
// //         } else {
// //             users.create(login, password, lastname, firstname)
// //                 .then((user_id) => res.status(201).send({ id: user_id }))
// //                 .catch((err) => res.status(500).send(err));
// //         }
// //     });

// //     return router;
// // }
// // exports.default = init;

/*
const express = require("express");
const Users = require("./src/entities/users.js");
const router = express.Router();
const db = require('./db');

router.use(express.json());
const users = new Users.default(db);
router.post("/user/", (req, res) =>{
  const { login, password, lastname, firstname } = req.body;
  res.status(200).send({message: "tout est bon"});
  if (!login || !password || !lastname || !firstname) {
    res.status(400).send("Missing fields");
  } else {
    try {
      const user_id = users.create(login, password, lastname, firstname);
      res.status(201).send({ id: user_id });
      console.log("Utilisateur créé");
      res.send("Utilisateur créé");
      res.end();
    } catch (err) {
      res.status(500).send(err);
    }
  } 
});

router.get('/', (req, res) => {
  res.setHeader('Content-Type', 'text/plain;charset=UTF-8');
  res.send("Serveur à l'écoute");	
})

module.exports = { router };
*/


const express = require('express');
const User = require('./src/entities/users');
const router = new express.Router();
const bcrypt = require('bcryptjs');

//INSCRIPTION
router.post('/user/', async (req, res, next) => {
  const existingUser = await User.findOne({ login: req.body.login });
  if (existingUser) {
    return res.status(409).send({ error: 'Ce login est déjà utilisé.' });
  }
  const user = new User(req.body);
  try {
    const saveUser = await user.save();
    console.log(`Nouvel utilisateur créé : ${saveUser.login}`);
    res.status(201).send({
      message: 'Utilisateur créé avec succès.',
      user: saveUser
    });
  } catch(error) {
    res.status(400).send({ error: 'Une erreur s\'est produite.' });
  }
});


//CONNEXION
router.post('/user/login/', async (req, res) => {
  const { login, password } = req.body;

  try {
    const user = await User.findOne({ login: login });
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Mot de passe incorrect' });
    }

    // Si l'utilisateur est trouvé et que le mot de passe est correct, renvoyer l'objet utilisateur en réponse
    console.log("Utilisateur " + user.login + " connecté avec succès !");
    return res.status(200).json({ user: user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erreur de connexion' });
  }
});

//DECONNEXION
router.post('/user/logout/', (req, res) => {
  const user = req.body.user;
  console.log(`L'utilisateur ${user.login} s'est déconnecté.`);
  res.status(200).send({ message: 'Déconnexion réussie.' });
});

module.exports = { router };






