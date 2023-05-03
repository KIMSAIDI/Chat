
//CE fichier contient les fonctions qui permettent de gerer les utilisateurs grace a la base de donnees mongoDB
/*
const { db } = require('../../db');
const {connectDb} = require('../../db');
const {getCollection} = require('../../db')
class Users {
    constructor(db) {
      this.db = db;
    }
    async create(login, password, lastname, firstname) {
      const user = {
        login: login,
        password: password,
        lastname: lastname,
        firstname: firstname
      };
      try{
        const collection = db.collection('users');
        const result = await collection.insertOne(user);
        return result.insertedId;
      } catch (err) {
        console.error(`Failed to create user: ${err}`);
        throw err;
      }
    }
  
    async get(userid) {
      try {
        const user = await this.collection('users').findOne({ _id: new ObjectId(userid) });
        return user;
      } catch (err) {
        console.error(`Failed to get user with id ${userid}: ${err}`);
        throw err;
      }
    }

    async exists(login) {
      try {
        const user = await this.collection('users').findOne({ login: login });
        return user !== null;
      } catch (err) {
        console.error(`Failed to check if user ${login} exists: ${err}`);
        throw err;
      }
    }
  
    async checkpassword(login, password) {
      try {
        const user = await this.collection('users').findOne({ login: login });
        if (user === null) {
          return null;
        }
        if (user.password === password) {
          return user._id;
        }
        return null;
      } catch (err) {
        console.error(`Failed to check password for user ${login}: ${err}`);
        throw err;
      }
    }
  }
  exports.default = Users;
*/


const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  
  login : {
    type : String,
    required: true,
  },
  password : {
    type : String,
    required : true
  },
  lastname : {
    type : String,
    required : true
  },
  firstname : {
    type : String,
    required : true
  },
  listAmis : {
    type : [String],
    default : []
  },
  bio : {
    type : String
  }
  
})

userSchema.pre('save',async function(){
  if(this.isModified('password')) this.password = await bcrypt.hash(this.password,8);
});
const User = mongoose.model('User',userSchema);
module.exports = User

