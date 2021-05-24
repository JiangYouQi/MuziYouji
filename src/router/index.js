import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  
  {
    path: '/classify',
    name: 'Classify',
    component: () => import('@/views/Classify.vue'),
    meta:{
      BtomNav:true
    }
  },
  {
    path: '/personal',
    name: 'Personal',
    component: () => import('@/views/Personal.vue'),
    meta:{
      BtomNav:true
    }
  },
  {
    path: '/shopping',
    name: 'Shopping',
    component: () => import('@/views/Shopping.vue'),
    meta:{
      BtomNav:true
    }
  },
  {
    path: '/search',
    name: 'Search',
    component: () => import('@/views/Search.vue'),
    meta:{
      BtomNav:false
    }
  },
  {
    path: '/ordercontacts',
    name: 'OrderContacts',
    component: () => import('@/views/OrderContacts.vue'),
    meta:{
      BtomNav:false
    }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login.vue'),
    meta:{
      BtomNav:false
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/views/Register.vue'),
    meta:{
      BtomNav:false
    }
  },
  {
    path: '/forget',
    name: 'Forget',
    component: () => import('@/views/Forget.vue'),
    meta:{
      BtomNav:true
    }
  },
  {
    path: '/details/:id',
    name: 'Details',
    props:true,
    component: () => import('@/views/Details.vue'),
    meta:{
      BtomNav:false
    }
  },
  {
    path: '/order/:ids',
    name: 'Order',
    props:true,
    component: () => import('@/views/Order.vue'),
    meta:{
      BtomNav:false
    }
  },
  {
    path: '/zhifustatus/:orderId',
    name: 'ZhifuStatus',
    props:true,
    component: () => import('@/views/zhifustatus.vue'),
    meta:{
      BtomNav:false
    }
  },
  {
    path: '/OrderDetails/:orderId',
    name: 'OrderDetails',
    props:true,
    component: () => import('@/views/OrderDetails.vue'),
    meta:{
      BtomNav:false
    }
  },
  {
    path: '/AllOrder/:pernumber',
    name: 'AllOrder',
    props:true,
    component: () => import('@/views/AllOrder.vue'),
    meta:{
      BtomNav:false
    }
  },
  {
    path: '/Collection',
    name: 'Collection',
    // props:true,
    component: () => import('@/views/Collection.vue'),
    meta:{
      BtomNav:false
    }
  },
  {
    path: '/AddRess',
    name: 'AddRess',
    // props:true,
    component: () => import('@/views/AddRess.vue'),
    meta:{
      BtomNav:false
    }
  },
  {
    path: '/Set',
    name: 'Set',
    // props:true,
    component: () => import('@/views/Set.vue'),
    meta:{
      BtomNav:false
    }
  },
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta:{
      BtomNav:true
    }
  },

]

const router = new VueRouter({
  routes
})

export default router
