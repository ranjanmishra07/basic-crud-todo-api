const express=require('express');
const bodyParser=require('body-parser');

var {mongoose}=require('./db/mongoose');
var {todos}=require('./models/todos');

const app=express();
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

app.listen(3000,()=>{
  console.log('server up at 3000');
});

module.exports={app};
