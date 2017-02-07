<template>
  <div class="page">
    <header>
      <Topbar/>
    </header>
    <main>
      <Editor/>
      <Preview/>
    </main>
  </div>
</template>

<script>
import 'normalize.css/normalize.css'
import './assets/reset.css'

import Topbar from './components/Topbar.vue'
import Editor from './components/Editor.vue'
import Preview from './components/Preview.vue'


export default {
  name: 'app',
  components: {
    Topbar, Editor, Preview
  },
  data:function(){
    return {
    text:'hello w'
    }
  }
}
</script>

<style>
.page{
  height: 100vh;  /* 100%窗口高度*/
  display:flex;
  flex-direction: column;
  background: #EAEBEC; 
}
.page>main{
  flex-grow: 1;
  min-width: 1024px;
  max-width: 1440px;
  margin-top:16px;
  margin-bottom: 16px;
  width: 100%;
  display: flex;
  align-self: center;
  justify-content: space-between; 
  padding:0 16px;
}

</style>
