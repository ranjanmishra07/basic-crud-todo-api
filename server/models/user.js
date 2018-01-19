const mongoose=require('mongoose');
const validator=require('validator');
const jwt=require('jsonwebtoken');
const _=require('lodash');
const bcrypt = require('bcryptjs');

var genders='male female'.split(' ');

var UserSchema=new mongoose.Schema({
  name:{
    // required:true,
    type:String,
    minlength:4,
    trim:true
  },
  email:{
    type:String,
    required:true,
    unique:true,
    minlength:1,
    trim:true,
    validate:{
      validator:validator.isEmail
    }
  },
  password:{
    type:String,
    required:true,
    minlength:4
  },
  mobileNumber:{
    type:String,
    // required:true,
    unique:true,
    minlength:10,
    maxlength:10
  },gender: {
    type: String,
     enum: genders
   },

  tokens:[{
    access:{
      type:String,
      required:true
    },
    token:{
      type:String,
      required:true
    }
  }]
});



// module.exports.toJSON=function toJSON(){
//   var user=this;
//   var userObject=user.toObject();
//   return _.pick(userObject,['_id','email']);
// }

// UserSchema.methods.generateAuthToken = function () {
//   var user = this;
//   var access = 'auth';
//   var token = jwt.sign({_id: user._id.toHexString(), access}, 'abc123').toString();
//
//   user.tokens.push({access, token});
//
//   return user.save().then(() => {
//     return token;
//   });
// };

// module.exports.findByToken=function(token){
//   var User=this;
//   var decoded;
//   try{
//     decoded=jwt.verify(token,'abc123');
//   }catch(e){
//
//   }
//       User.findOne({
//     '_id':decoded._id,
//     'access':'auth',
//     'token':token
//   })
// }


//hashing of password
UserSchema.pre('save', function(next) {
  var user=this;
  if(user.isModified('password')){
    bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(user.password, salt, function(err, hash) {
        // Store hash in password DB.
        user.password=hash;
        next();
    });
});
  }else{
   next();
  }

});

var User=mongoose.model('User',UserSchema);
module.exports={User};
