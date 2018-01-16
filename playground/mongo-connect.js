const MongoClient=require('mongodb').MongoClient;
MongoClient.connect('mongodb://localhost:27017/todo',(err,db)=>{
  if(err){
    return  console.log('error on connection',err);
  }
  console.log('connection suuccessfull on mogo server');
  db.collection('todo').insertOne({
    text:'node course',
    error:'no error'
  },(err,results)=>{
    if(err){
      return console.log(err);
    }
    console.log(JSON.stringify(results.ops,undefined,2))
  });
  db.collection('todo1').insertOne({
    name:'ranjan',
    age:22,
    location:'bangalore'
  },(err,results)=>{
    if(err){
      return console.log(err);
    }
    console.log(JSON.stringify(results.ops,undefined,2));
  });
  db.close();
});
