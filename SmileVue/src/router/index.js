import Vue from 'vue'
import Router from 'vue-router'
//正常路由加载组件
//import ShoppingMall from '@/components/pages/ShoppingMall'
//import gooddetails from '@/components/pages/gooddetails'
// 使用路由懒加载来加载组件(提高加载速度)
const ShoppingMall = () =>
  import ('@/components/pages/ShoppingMall')
const gooddetails = () =>
  import ('@/components/pages/gooddetails')
const Register = () =>
  import ('@/components/pages/Register')
Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      name: 'ShoppingMall',
      component: ShoppingMall
    },
    {
      path: '/gooddetails/:goodId',
      name: 'gooddetails',
      component: gooddetails
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    }
  ]
})
