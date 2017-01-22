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
    
    window.onbeforeunload = ()=>{
      let dataString = JSON.stringify(this.todoList) 
      window.localStorage.setItem('myTodos', dataString) 
    }
    let oldDataString = window.localStorage.getItem('myTodos')
    let oldData = JSON.parse(oldDataString)
    this.todoList = oldData || []

  },
  methods: {
  	addTodo: function (){
  		var time=new Date();
  		this.todoList.push({
  			title:this.newTodo,
  			timeStr:time.getFullYear()+'年'+(time.getMonth()+1)+'月'
  				           +time.getDate()+'日 '+time.getHours()+':'
  				           +time.getMinutes()+':'+time.getSeconds(),
  			done:false
  		})
  		this.newTodo=''
  	},
  	removeTodo: function(todo){
  		let index = this.todoList.indexOf(todo)
  		this.todoList.splice(index,1)
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
      },function(error){
        alert('登录失败')
      });
    },
    getCurrentUser:function(){
      let {id,createdAt,attributes: {username}} = AV.User.current(); //解构赋值
      return {id,username,createdAt};
    },
    logOut:function(){
      AV.User.logOut();
      this.currentUser=null;
    }
  }
})   


console.log(app.todoList)