const {User}=require('./../models/user');
const jwt=require('jsonwebtoken');

var authenticate=(req,res,next)=>{
  var token =req.header('x-auth');

  var decoded;
  try{
    decoded=jwt.verify(token,'abc123');
  }catch(e){
     return res.status(401).send(e);
  }
      User.findOne({
    // 'tokens[0].token':token
       "tokens.access":"auth",
       "tokens.token":token
      }).then((user)=>{
    if(!user){
         return res.status(404).send('user not found');
        // return Promise.reject();

    }
    // res.send(user);

    req.user={
      success:true,
      message:'you are authenticated and can visit your profile',

      user:{
        id:user._id,
        email:user.email
      }
    };
    req.token=token;
    next();
  }).catch((e)=> {
    res.status(401).send(e);
  });

}
module.exports={authenticate};
