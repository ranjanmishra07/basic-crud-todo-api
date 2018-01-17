const expect=require('expect');
const request=require('supertest');

var {todos}=require('./../models/todos');
var {app}=require('./../server');

beforeEach((done)=>{
  todos.remove({}).then(()=>done());
});

describe('POST /todos',()=>{
  it('should create a new todo',(done)=>{
    var text='new todo';
    request(app)
    .post('/todos')
    .send({text})
    .expect(200)
    .expect((res)=>{
      expect(res.body.text).toBe(text)
    })
    .end((err,res)=>{
      if(err){
        return done(err);
      }
      todos.find().then((todos)=>{
        expect(todos.length).toBe(1);
        expect(todos[0].text).toBe(text);
        done();
      }).catch((e)=>done(e));
    })
  })

it('should not create a todo',(done)=>{
  request(app).
  post('/todos')
  .send({})
  .expect(400)
  .end((err,res)=>{
    if(err){
      return done(err)
    }
    todos.find().then((todos)=>{
      expect(todos.length).toBe(0);
      done();
    }).catch((e)=>done(e));
  })
})

});
