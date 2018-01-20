const express=require('express');
const bodyParser=require('body-parser');
const _=require('lodash');
const jwt=require('jsonwebtoken');

var {mongoose}=require('./db/mongoose');
// var {todos}=require('./models/todos');
var {User}=require('./models/user');
var {ObjectId}=require('mongodb');
var {authenticate}=require('./middleware/authenticate');

const app=express();
const port=process.env.PORT || 3000;

app.use(bodyParser.json());



//user post route for registering user
app.post('/user', (req, res) => {
  var body = _.pick(req.body, ['name','email', 'password','phone','gender']);
  var user = new User(body);
  user.save().then(() => {
      return user.generateAuthToken();
    }).then((token) => {
      res.header('x-auth', token).send(user);
    }).catch((e) => {
      res.status(400).send(e);
    })
});

//for viewing user profile
app.get('/user/me',authenticate,(req,res)=>{
  res.send(req.user);
})
// 8521622565

//for getting profiles and updating
// set headers as x-auth and copy x-auth token from headers while posting/registering a new user
// then you will be able to access the delete option once authenticated
app.patch('/user/profile',authenticate,(req,res)=>{
      var body=_.pick(req.body,['name','phone']);
      User.findOneAndUpdate(req.user.id,req.body,{new:true}).then((user)=>{
        if(user){
          res.json({
              success:true,
              message:'your profile is successully updated',

              user:{
                id:user._id,
                email:user.email,
                name:user.name,
                phone:user.phone
              }
            });
        }else{
          res.status(404).send();
        }
      }).catch((err)=>{
        res.status(400).send();
      });

});


//for logging in the user after succesfful registration with valid x-auth token
app.post('/user/login',(req,res)=>{
  var body = _.pick(req.body, ['email', 'password']);

  User.findByCredentials(body.email,body.password).then((user)=>{
    return user.generateAuthToken().then((token) => {
      res.header('x-auth', token).send(user);
    });
  }).catch((e)=>{res.status(400).send()});
})

//for deleting the profile .set headers as x-auth and copy x-auth token from headers while posting/registering a new user
// then you will be able to access the delete option once authenticated
app.delete('/user/:id',authenticate,(req,res)=>{

  User.remove({_id:req.params.id}).then((user)=>{
    res.send('profile deleted successfully');
  }).catch((e)=>{
    res.status(400).send(e)
  })
})



app.listen(port,()=>{
  console.log(`started up at ${port}`);
});



module.exports={app};
