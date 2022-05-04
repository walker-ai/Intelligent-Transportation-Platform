// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import axios from 'axios'
import Element from 'element-ui'
import qs from 'qs'
import router from './view/router/Router.js'  // 引用Router.js声明为router
import echarts from "echarts";


Vue.prototype.$echarts = echarts;
import '../node_modules/element-ui/lib/theme-chalk/index.css'
import '../src/assets/style.css'
import './theme/index.css'

Vue.use(Element)
Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.prototype.$http = axios
Vue.prototype.qs = qs

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    render: h => h(App)
});
