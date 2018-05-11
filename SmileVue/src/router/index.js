import Vue from 'vue'
import Router from 'vue-router'
import ShoppingMall from '@/components/pages/ShoppingMall'
import gooddetails from '@/components/pages/gooddetails'

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

    }
  ]
})
