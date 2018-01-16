const {MongoClient,ObjectID}=require('mongodb');
MongoClient.connect('mongodb://localhost:27017/todo',(err,db)=>{
  if(err){
    return  console.log('error on connection',err);
  }
  console.log('connection suuccessfull on mogo server');
   db.collection('todo1').findOneAndUpdate({
     _id:new ObjectID("5a5e06860783b1179113a067")
   },{$set:
     {
     name:'amitaaa'
   },$inc:
   {
     age:+5
   }
   },{returnOriginal:false}).then((result)=>{
     console.log(result);
   })
});
