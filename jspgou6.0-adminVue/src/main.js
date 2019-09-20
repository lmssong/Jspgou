// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import $ from 'jquery'
import echarts from 'echarts'
import "babel-polyfill";
import './plugs/jquery.ztree.all.min'
import './plugs/slimscroll.min'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from './router'
import store from'./store/index'//vuex
import App from './App'
import './permission'
import '../static/css/common.css'
import './untils/global'
Vue.prototype.$echarts = echarts
Vue.config.productionTip = false
Vue.use(ElementUI)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
}).$mount('#app')//挂载
