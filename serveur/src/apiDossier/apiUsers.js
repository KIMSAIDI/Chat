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

async function addFriend(req, res, next) {
  const friend = req.body.friend;  
  const me = req.body.me;
  
  try {
    const user = await User.findOne({login: me});
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }
    if (user.login === friend) {

      return res.status(409).json({ message: 'Vous ne pouvez pas vous ajouter en ami' });
    }
    if (user.listAmis.includes(friend)) {
      return res.status(409).json({ message: 'Cet utilisateur est déjà votre ami' });
    }
    user.listAmis.push(friend);
    const saveUser = await user.save();
    res.status(201).send({
      message: 'Utilisateur ajouté en ami avec succès.',
      user: saveUser
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function deleteFriend(req, res, next) {
  const me = req.body.me;
  const friend = req.body.friend;

  try {
    const user = await User.findOne({login :me})
    if (!user) {
      return res.status(404).json({message : 'Utilisateur non trouvé'});
    }
    if (!user.listAmis.includes(friend)) {
      return res.status(409).json({message : 'Cet utilisateur n\'est pas votre ami'});
    }
    user.listAmis.splice(user.listAmis.indexOf(friend), 1);
    const saveUser = await user.save();
    res.status(201).send({
      message: 'Utilisateur supprimé de vos amis avec succès.',
      user: saveUser
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
   

async function getFriends(req, res, next) {
  const login = req.query.login;
  try {
    const user = await User.findOne({login: login});
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }
    res.json(user.listAmis);
  } catch (error) {
    next(error);
  }
}

async function changeBio(req, res, next) {
  const {bio, login} = req.body;
  try {
    const user = await User.findOne({login: login});
    
    if (!user) {
      return res.status(404).json({message : 'Utilisateur non trouvé'});
    }
    user.bio = bio;
    const saveUser = await user.save();
    res.status(201).send({
      message: 'Bio modifiée avec succès.',
      user: saveUser
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
    }
  }

async function getBio(req, res, next) {
  const login = req.params.username;
  try {
    const user = await User.findOne({login: login});
    
    if (!user) {
      return res.status(404).json({message : 'Utilisateur non trouvé'});
    }
    res.json(user.bio);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getAllUsers(req, res, next) {
  try {
    const users = await User.find();
    res.json(users.length);
  } catch (error) {
    next(error);
  }
}

async function changeDate(req, res, next) {
  
  const {date, login} = req.body;
  console.log("date = ", date)
  try {
    const user = await User.findOne({login: login});
    if (!user) {
      return res.status(404).json({message : 'Utilisateur non trouvé'});
    }
   
    user.date = date;
    console.log(user.date)
    const saveUser = await user.save();
    
    res.status(201).send({
      message: 'Date modifiée avec succès.',
      user: saveUser
    });
   
  } catch (error) {
    res.status(500).json({ error: error.message });
    }
  }

  async function getDate(req, res, next) {
    const login = req.params.username;
    try {
      const user = await User.findOne({login: login});
      if (!user) {
        return res.status(404).json({message : 'Utilisateur non trouvé'});
      }
      res.json(user.date);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }



  async function getLastUser(req, res, next) {

    try {
      const users = await User.find();
      if (!users) {
        return res.status(404).json({message : 'Utilisateur non trouvé'});
      }
      res.json(users[users.length-1]);
     
    } catch (error) {
      next(error);
    }
  }

async function ville_user(req, res, next) {
  const {ville, login} = req.body;
  try {
    const user = await User.findOne({login: login});
    if (!user) {
      return res.status(404).json({message : 'Utilisateur non trouvé'});
    }
    user.ville = ville;
    const saveUser = await user.save();
    res.status(201).send({
      message: 'Ville modifiée avec succès.',
      user: saveUser
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
    }
  }

  async function status_user(req, res, next) {
    const {status, login} = req.body;
    try {
      const user = await User.findOne({login: login});
      if (!user) {
        return res.status(404).json({message : 'Utilisateur non trouvé'});
      }
      user.status = status;
      const saveUser = await user.save();
      res.status(201).send({
        message: 'Status modifié avec succès.',
        user: saveUser
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
      }
    }

    async function genre_user(req, res, next) {
      const {genre, login} = req.body;
      try {
        const user = await User.findOne({login: login});
        if (!user) {
          return res.status(404).json({message : 'Utilisateur non trouvé'});
        }
        user.genre = genre;
        const saveUser = await user.save();
        res.status(201).send({
          message: 'Genre modifié avec succès.',
          user: saveUser
        });
      } catch (error) {
        res.status(500).json({ error: error.message });
        }
      }

  async function getVille(req, res, next) {
 
    const login = req.params.username;
    try {
     const user = await User.findOne({login: login});
        if (!user) {
          return res.status(404).json({message : 'Utilisateur non trouvé'});
        }
        res.json(user.ville);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    }
  
  async function getGenre(req, res, next) {
    const login = req.params.username;
    try {
      const user = await User.findOne({login: login});
      if (!user) {
        return res.status(404).json({message : 'Utilisateur non trouvé'});
      }
      res.json(user.genre);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async function getStatus(req, res, next) {
    const login = req.params.username;
    try {
      const user = await User.findOne({login: login});
      if (!user) {
        return res.status(404).json({message : 'Utilisateur non trouvé'});
      }
      res.json(user.status);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async function getUrl(req, res, next) {
    const login = req.params.username;
    try {
      const user = await User.findOne({login: login});
      if (!user) {
        return res.status(404).json({message : 'Utilisateur non trouvé'});
      }
      res.json(user.url);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

    


module.exports = {createUsers, login ,logout, getUser, addFriend, deleteFriend, getFriends, changeBio, getBio, getAllUsers, changeDate, getLastUser, ville_user, status_user, genre_user, getVille, getGenre, getStatus, getDate, getUrl};