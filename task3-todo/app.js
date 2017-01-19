import Vue from 'vue';

var app = new Vue({
  el: '#app',
  data: {
    newTodo: '',
    todoList: []
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
  	}
  }
})   


console.log(app.todoList)