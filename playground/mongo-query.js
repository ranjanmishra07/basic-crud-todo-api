const {ObjectId}=require('mongodb');


const {mongoose}=require('./../server/db/mongoose');
const {todos}=require('./../server/models/todos.js');


 var id="5a5f93d21309e83964aebfea"

todos.findById(id).then((todo)=>{
  console.log(todo);
});
