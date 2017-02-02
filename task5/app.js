import Vue from 'vue';

//---初始化----

import AV from 'leancloud-storage';

var APP_ID = 'Mpfk11sYsLVxxL5E6Wy0qPkX-gzGzoHsz';
var APP_KEY = 'IRu6dhi7CBA9Xkk3XV8VTyrB';
AV.init({
  appId: APP_ID,
  appKey: APP_KEY
});

// var TestObject = AV.Object.extend('TestObject');
// var testObject = new TestObject();
// testObject.save({
//   words: 'Hello World!'
// }).then(function(object) {
//   alert('LeanCloud Rocks!');
// })

//-----

var app = new Vue({
  el: '#app',
  data: {
    actionType:'signUp',
    formData:{
      username:'',
      password:''
    },
    newTodo: '',
    todoList: [],
    currentUser:null
  },
  created: function(){
    this.currentUser=this.getCurrentUser();
    this.fetchTodos();
  },
  methods: {
    fetchTodos:function(){
      if(this.currentUser){
        var query=new AV.Query('AllTodos');
        query.find().then((todos)=>{
          let avAllTodos = todos[0];
          let id = avAllTodos.id;
          this.todoList=JSON.parse(avAllTodos.attributes.content)
          this.todoList.id=id;
        },function(error){
          console.log(error);
        })
      }
    },
    updateTodos:function(){
      let dataString = JSON.stringify(this.todoList);
      let avTodos=AV.Object.createWithoutData('AllTodos',this.todoList.id)
      avTodos.set('content',dataString);
      avTodos.save().then(() =>{
        console.log('更新成功');
      })
    },
    saveTodos: function(){
      let dataString = JSON.stringify(this.todoList);
      var AVTodos = AV.Object.extend('AllTodos');
      var avTodos=new AVTodos();
      var acl = new AV.ACL();
      acl.setReadAccess(AV.User.current(),true); // 只有这个 user 能读
      acl.setWriteAccess(AV.User.current(),true);// 只有这个 user 能写
      avTodos.set('content',dataString);
      avTodos.setACL(acl);//设置访问控制
      avTodos.save().then((todo)=>{
        this.todoList.id=todo.id;
        console.log('保存成功');
      },function(error){
        alert('保存失败');
      });
    },
    saveOrUpdateTodos:function(){
      if(this.todoList.id){
        this.updateTodos();
      }else{
        this.saveTodos()
      }
    },
  	addTodo: function(){
  		var time=new Date();
  		this.todoList.push({
  			title:this.newTodo,
  			timeStr:time.getFullYear()+'年'+(time.getMonth()+1)+'月'
  				           +time.getDate()+'日 '+time.getHours()+':'
  				           +time.getMinutes()+':'+time.getSeconds(),
  			done:false
  		});
  		this.newTodo='';
      this.saveOrUpdateTodos();
  	},
  	removeTodo: function(todo){
  		let index = this.todoList.indexOf(todo);
  		this.todoList.splice(index,1);
      this.saveOrUpdateTodos();
  	},
    signUp: function(){
      let user = new AV.User();
      user.setUsername(this.formData.username);
      user.setPassword(this.formData.password);
      user.signUp().then((loginedUser)=>{
        this.currentUser=this.getCurrentUser();
        // console.log(this.currentUser);
      },function(error){
        alert('注册失败')
      });
    },
    login:function(){
      AV.User.logIn(this.formData.username,this.formData.password).then((loginedUser)=>{
        this.currentUser=this.getCurrentUser();
        this.fetchTodos();
      },function(error){
        alert('登录失败')
      });
    },
    getCurrentUser:function(){
      let current=AV.User.current();
      if(current){
        let {id, createdAt, attributes: {username}}=current;
        return {id,username,createdAt};
      }else{
        return null;
      }
    },
    logOut:function(){
      AV.User.logOut();
      this.currentUser=null;
      window.location.reload();
    }
  }
})   


