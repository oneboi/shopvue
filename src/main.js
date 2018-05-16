import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import vueQuillEditor from 'vue-quill-editor' // 引入富文本工具
Vue.use(vueQuillEditor)

Vue.use(ElementUI)
import router from './router'   //路由 
import global_ from './util/global.js'

Vue.prototype.GLOBAL = global_   //设置全局变量
import axios from './util/request.js'
new Vue({
  el: '#app',
  router,
  axios,
  render: h => h(App)
})
