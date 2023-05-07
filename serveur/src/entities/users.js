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
    type : String,
  },
  date : {
    type : Date,
    
  },
  ville : {
    type : String,
  },
  genre : {
    type : String,
  },
  status : {
    type : String,
  },
  avatarUrl: {
    type: String,
    default :'https://avataaars.io/?avatarStyle=Transparent&topType=WinterHat3&accessoriesType=Wayfarers&hatColor=PastelYellow&facialHairType=MoustacheMagnum&facialHairColor=BrownDark&clotheType=ShirtVNeck&clotheColor=Blue01&eyeType=Wink&eyebrowType=DefaultNatural&mouthType=Smile&skinColor=Brown',
    required: true
  }

  
})

userSchema.pre('save',async function(){
  if(this.isModified('password')) this.password = await bcrypt.hash(this.password,8);
});
const User = mongoose.model('User',userSchema);
module.exports = User

