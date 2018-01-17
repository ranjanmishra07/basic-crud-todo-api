var mongoose=require('mongoose');

var todos=mongoose.model('todos',{
  text:{
    type:String,
    required:true,
    minlengh:1,
    trim:true
  },completed:{
    type:Boolean,
    default:false
  },completedAt:{
    type:Number,
    default:null
  }
});
module.exports={todos};
