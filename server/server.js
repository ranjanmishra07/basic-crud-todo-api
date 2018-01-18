const express=require('express');
const bodyParser=require('body-parser');

var {mongoose}=require('./db/mongoose');
var {todos}=require('./models/todos');
var {ObjectId}=require('mongodb');
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

app.listen(port,()=>{
  console.log(`started up at ${port}`);
});



module.exports={app};
