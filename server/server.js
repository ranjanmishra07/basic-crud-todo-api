const express=require('express');
const bodyParser=require('body-parser');
const _=require('lodash');
const jwt=require('jsonwebtoken');

var {mongoose}=require('./db/mongoose');
var {todos}=require('./models/todos');
var {User}=require('./models/user');
var {ObjectId}=require('mongodb');
var {authenticate}=require('./middleware/authenticate');

const app=express();
const port=process.env.PORT || 3000;

app.use(bodyParser.json());

//for posting routes todo
app.post('/todos',(req,res)=>{
  var todo=new todos({
    text:req.body.text
  });
  todo.save().then((docs)=>{
    res.send(docs);
  },(err)=>{
    res.status(400).send(err);
  })
});

// for get routes
app.get('/todos',(req,res)=>{
  todos.find().then((docs)=>{
    res.send({docs})
  },(err)=>{
    res.status(400).send(e);
  });
});

// for get routes by ids
app.get('/todos/:id',(req,res)=>{
  var id=req.params.id;
  if(!ObjectId.isValid(id)){
    return res.status(404).send('id was not found')

  }
  todos.findById(id).then((docs)=>{
    if(docs){
      res.send(docs);
    }else{
      res.status(404).send();
    }
  }).catch(()=>{
    rs.status(400).send()
  })

})

app.delete('/todos/:id',(req,res)=>{
  var id=req.params.id;
  if(!ObjectId.isValid(id)){
    return res.status(404).send();
  }
  todos.findByIdAndRemove(id).then((docs)=>{
    if(docs){
      res.send(docs);

    }else{res.status(404).send()}
  }).catch((e)=>{
    res.status(400).send();
  })
})
app.patch('/todos/:id',(req,res)=>{
  var id=req.params.id;
  var body=_.pick(req.body,['text','completed']);
  if(!ObjectId.isValid(id)){
    return res.status(404).send();
  }
  if(_.isBoolean(body.completed) && body.completed){
    body.completedAt=new Date().getTime();
  }else{
    body.completed=false;
    body.completedAt=null;
  }

  todos.findByIdAndUpdate(id,{$set:body},{new:true}).then((docs)=>{
    if(docs){
      res.send({docs})
    }else{
      res.status(404).send();
    }
  }).catch((err)=>{
    res.status(400).send()
  })
})


//user post routes
app.post('/user', (req, res) => {
  var body = _.pick(req.body, ['email', 'password']);
  var user = new User(body);
  var access='auth';
  var token = jwt.sign({_id: user._id.toHexString(), access}, 'abc123').toString();

  user.tokens.push({access, token});
  user.save().then(() => {
    // var userObject=user.toObject();
    // return _.pick(userObject,['_id','email']);

   res.header('x-auth',token).json({
     success:true,
     message:'user registered successully You can see the details of registration',

     user:{
       id:user._id,
       email:user.email
     }
   });
  // res.send(user.toJSON());


  }).catch((e) => {
    res.status(400).send(e);
  })
});


//for getting profiles
app.get('/user/profile',authenticate,(req,res)=>{
    res.json(req.user);
  // var token =req.header('x-auth');
  //
  // var decoded;
  // try{
  //   decoded=jwt.verify(token,'abc123');
  // }catch(e){
  //    return res.status(401).send(e);
  // }
  //     User.findOne({
  //   // 'tokens[0].token':token
  //      "tokens.access":"auth",
  //      "tokens.token":token
  //     }).then((user)=>{
  //   if(!user){
  //        return res.status(404).send('user not found');
  //       // return Promise.reject();
  //
  //   }
  //   // res.send(user);
  //   res.json({
  //     success:true,
  //     message:'you are authenticated and can visit your profile',
  //
  //     user:{
  //       id:user._id,
  //       email:user.email
  //     }
  //   });
  // }).catch((e)=> {
  //   res.status(401).send(e);
  // });

});

app.listen(port,()=>{
  console.log(`started up at ${port}`);
});



module.exports={app};
