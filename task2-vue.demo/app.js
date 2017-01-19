import bar from './bar';
import Vue from 'vue';


var app = new Vue({
  el: '#app',
  data: {
    message: 'Hello Vue!My first vue-demo.'
  }
})   
var app2 = new Vue({
  el: '#app-2',
  data: {
    message: 'You loaded this page on ' + new Date()
  }
})

