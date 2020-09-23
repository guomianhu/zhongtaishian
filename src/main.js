import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ViewUI from 'view-design'
import 'view-design/dist/styles/iview.css'
import './assets/css/global.css'
import './assets/css/css.css'
import axios from 'axios'
import Vuex from 'vuex'
import index from './store/index'

import Swiper from 'swiper'
import 'swiper/dist/css/swiper.css'

import Vant from 'vant';
import 'vant/lib/index.css';
Vue.use(Vant);

import VueLazyload from 'vue-lazyload'  //引入这个懒加载插件
Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: 'dist/error.png',
  loading: 'dist/loading.gif',
  attempt: 1,
  // the default is ['scroll', 'wheel', 'mousewheel', 'resize', 'animationend', 'transitionend']
  listenEvents: [ 'scroll' ]
})

Vue.prototype.$axios = axios    //全局注册，使用方法为:this.$axios
Vue.config.productionTip = false;

Vue.use(ViewUI);
Vue.use(Vuex);

//获取url后面的参数方法一
import {UrlSearch} from "./assets/js/Fun"
let Request = new UrlSearch();
Vue.prototype.$Request = Request;

//获取url后面的参数方法二
import utils from './assets/js/utils'//获取url参数
Vue.prototype.$utils=utils//注册全局方法

//路由发生变化修改页面title
router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
  
  // 判断该路由是否需要登录权限
  const type = to.meta.requireAuth
  if (type) {
    if (sessionStorage.getItem("token") == 'true') {
      next()
    } else {
      next('/login')
    }
  } else {
    next()
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
