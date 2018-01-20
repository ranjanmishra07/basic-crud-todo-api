const mongoose=require('mongoose');

mongoose.Promise=global.Promise;
mongoose.connect('mongodb://raja:raja.mlab.com:63847/todoapi');
// mongoose.connect('mongodb://localhost:/27017/TodoApp');


module.exports={mongoose};
