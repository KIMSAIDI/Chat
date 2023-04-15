const User = require('../entities/users');
const bcrypt = require('bcryptjs');


async function createUsers(req, res, next) {
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
}

async function login(req, res, next) {
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

    console.log(`Utilisateur ${user.login} connecté avec succès !`);
    return res.status(200).json({ user: user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erreur de connexion' });
  }
}


async function logout(req,res,next){
    const user = req.body.user;
    console.log(`L'utilisateur ${user.login} s'est déconnecté.`);
    res.status(200).send({ message: 'Déconnexion réussie.' });
}

async function getUser(req, res, next) {
  const username = req.params.username;
  
  console.log(`Recherche de l'utilisateur ${username}`);
  try {
    const user = await User.findOne({login: username});
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}





module.exports = {createUsers, login ,logout, getUser};