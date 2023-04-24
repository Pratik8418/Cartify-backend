const mongoose = require('mongoose'); 
const bcrypt = require('bcrypt')

var userSchema = new mongoose.Schema({
    firstname:{
        type:String,
        required:true
    },
    lastname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    mobile:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    role: {
      type: String,
      default : "user"
    },
    cart: {
      type: Array,
      default: []
    },
    address: 
      [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Address"
      }],
    wishlist: 
    [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product"
    }],
    refreshToken : {
      type : String
    }
},
{
  timestamps : true
},

);

userSchema.pre('save', async function (next) {
  const user = this

  if(user.isModified('password')){
    user.password =  await bcrypt.hash(user.password,8);
  }
  next();
})

userSchema.methods.isPasswordMatched = async function(enteredPassword){
  return await bcrypt.compare(enteredPassword, this.password)
}
const User = mongoose.model('User', userSchema);
//Export the model
module.exports = User;