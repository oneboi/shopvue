import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '../page/Login.vue'
import Home from '../page/Home.vue'

// 文章
import Articles from "../page/article/Articles.vue"
import ArticleCategory from "../page/article/ArticleCategory.vue"
import CallBack from "../page/article/CallBack.vue"
//system
import  Menu from '../page/system/Menu.vue'
import  User from '../page/system/User.vue'
import  Role from '../page/system/Role.vue'
import  Info from '../page/system/Info.vue'

//单页管理
import  About from '../page/single/About.vue'


//emement 

import  Form from '../page/element/Form.vue'



//商品分类


import  Category from '../page/category/Category.vue'



//门店

import  Store from  '../page/store/Store.vue'


import  StoreCategory from '../page/store/StoreCategory.vue'


//商品
import  Goods from '../page/goods/Goods.vue'
import  StoreGoods from '../page/store/StoreGoods.vue'

Vue.use(VueRouter)    
let routes = [
  {
    path: '/shopvue/Login',
    name: 'login',
    component: Login
  },
 
   {
    path: '/shopvue/',
    name: 'home',
    component: Home
   },
   


    {
    path: '/shopvue/',
    name: 'system',
    component: Home,
    children:[
      
       {
        path: '/user',
        name: 'user',
        component: User
       },
        {
        path: '/role',
        name: 'role',
        component: Role
       },
       {
        path: '/menu',
        name: 'menu',
        component: Menu
       },
       {
        path: '/info',
        name: 'info',
        component: Info
       }

     ]
   },
 // emement表单组件 
    {
    path: '/shopvue/',
    name: 'home2',
    component: Home,
    children:[
      
       {
        path: '/form',
        name: 'Form',
        component: Form
       },
      
     ]
   },

 // 商品分类 
    {
    path: '/shopvue/',
    name: 'home3',
    component: Home,
    children:[
      
       {
        path: '/category',
        name: 'category',
        component: Category
       },
      
     ]
   },


 // 商品分类 
    {
    path: '/shopvue/',
    name: 'element2',
    component: Home,
    children:[
      
       {
        path: '/store',
        name: 'store',
        component: Store
       },
      
     ]
   },

    // 商品分类 
    {
    path: '/shopvue/',
    name: '门店商品分类',
    component: Home,
    children:[
      
       {
        path: '/storecategory/:code',
        name: 'storecategory',
        component: StoreCategory
       },
      
     ]
   },
   
    // 商品分类 
    {
    path: '/shopvue/',
    name: '门店商品',
    component: Home,
    children:[
      
       {
        path: '/storegoods/:code',
        name: 'storegoods',
        component: StoreGoods
       },
      
     ]
   },

      // 商品
    
    {
    path: '/shopvue/',
    name: 'element',
    component: Home,
    children:[
      
       {
        path: '/goods',
        name: 'goods',
        component: Goods
       },
      
     ]
   },



]

const router = new VueRouter({
  mode: 'history',   // 默认以#号路由，
  routes
})

export default router