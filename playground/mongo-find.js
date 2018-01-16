const MongoClient=require('mongodb').MongoClient;
MongoClient.connect('mongodb://localhost:27017/todo',(err,db)=>{
  if(err){
    return  console.log('error on connection',err);
  }
  console.log('connection suuccessfull on mogo server');
  // db.collection('todo').find({text:'old node course'}).toArray().then((docs)=>{
  //   console.log('todo');
  //   console.log(JSON.stringify(docs,undefined,2));
  // },(err)=>{
  //   console.log('unable to ffetch data');
  // });

  db.collection('todo1').find().count().then((count)=>{
    console.log(count);

  },(err)=>{
console.log('unable',err);
  })
});
