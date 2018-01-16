const MongoClient=require('mongodb').MongoClient;
MongoClient.connect('mongodb://localhost:27017/todo',(err,db)=>{
  if(err){
    return  console.log('error on connection',err);
  }
  console.log('connection suuccessfull on mogo server');
  // db.collection('todo1').deleteMany({name:'raj'}).then((results)=>{
  //   console.log(results);
  // })

 // db.collection('todo1').findOneAndDelete({name:'raj'}).then((results)=>{
 //   console.log(results);
 // });
 db.collection('todo1').find({name:'raj'}).toArray().then((results)=>{
   console.log('todo1');
   console.log(JSON.stringify(results,undefined,2));
 },(err)=>{
   console.log(err);
 });
 // db.collection('todo1').insertOne({
 //   name:'rajan',age:20,location:'chennai'
 // },(err,esults)=>{
 //   if(err){
 //     return console.log(err);
 //   }
 //   console.log(JSON.stringify(esults.ops,undefined,2));
 // });
db.collection('todo1').deleteMany({name:'rajan'}).then((res)=>{
  console.log(res);
});

});
