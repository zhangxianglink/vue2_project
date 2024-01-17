import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import store from './store'

//引入VueRouter
import VueRouter from 'vue-router'
//引入路由器
import router from './router'
Vue.use(ElementUI);
Vue.config.productionTip = false
Vue.use(VueRouter)

new Vue({
  render: h => h(App),
  store:store,
  router:router
}).$mount('#app')
