// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import '@/assets/css/base.css'
import Vue from 'vue'
import App from './App'
import router from './router'
import api from './api'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist//css//swiper.css'
import {Button, Row, Col,Swipe,SwipeItem,Lazyload} from 'vant'
//require('./assets/util/vconsole.js')
Vue.prototype.$http = api;
Vue.use(Button).use(Row).use(Col).use(Swipe).use(SwipeItem).use(Lazyload).use(VueAwesomeSwiper, /* { default global options } */)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
