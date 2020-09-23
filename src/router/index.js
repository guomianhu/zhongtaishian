
import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

import Header from '../components/common/Header'
import Footer from '../components/common/Footer'
import Home from '../components/Home'
import Banner from '../components/common/Banner'

import Kecheng from '../components/views/Kecheng'
import Kaoshi from '../components/views/Kaoshi'
import jigou from '../components/views/jigou'
import News from '../components/views/News'
import zhengshucx from '../components/views/zhengshucx'
import Kechenglist from '../components/views/Kechenglist'
import video from '../components/views/video'
import xuexijl from '../components/views/xuexijl'
import goumaikc from '../components/views/goumaikc'
import kaoshijilu from '../components/views/kaoshijilu'
import kechenggl from '../components/views/kechenggl'
import shoucang from '../components/views/shoucang'
import zhengshu from '../components/views/zhengshu'
import fapiao from '../components/views/fapiao'
import addfapiao from '../components/views/addfapiao'
import tuiguang from '../components/views/tuiguang'
import Newsshow from '../components/views/Newsshow'
import Order from '../components/views/Order'
import Orderxq from '../components/views/Orderxq'
import Pay from '../components/views/Pay'
import Addaddress from '../components/views/Addaddress'
import Selectaddress from '../components/views/Selectaddress'
import Aboutus from '../components/views/Aboutus'
import Register_success from '../components/views/Register_success'
import Pay_success from '../components/views/Pay_success'
import teacher from '../components/views/teacher'
import Cart from '../components/views/Cart'
import xiaoxishow from '../components/views/xiaoxishow'
import exam from '../components/views/exam'

import Me from '../components/user/Me'
import userinfo from '../components/user/userinfo'
import xiaoxi from '../components/user/xiaoxi'
import zhanghu from '../components/user/zhanghu'
import Login from '../components/user/Login'
import Register from '../components/user/Register'
import Findpasd from '../components/user/Findpasd'
import Cantantus from '../components/views/Cantantus'

  const routes = [
    {
        path: '/',
        redirect: '/home'
    },
    {
        path: '/Header',
        name: 'Header',
        component: Header
    },
    {
        path: '/footer',
        name: 'footer',
        component: Footer
    },
    {
        path: '/Banner',
        name: 'Banner',
        component: Banner
    },
    {
      path:'/Home',
      component: (resolve)=>require(['@/components/Home'],resolve),
      meta:{
        title:'首页'
      }
    },
    {
      path:'/Kecheng',
      component: (resolve)=>require(['@/components/views/Kecheng'],resolve),
      meta:{
        title:'课程'
      }
    },
    {
      path:'/Me',
      component: (resolve)=>require(['@/components/user/Me'],resolve),
      meta:{
        title:'我的',
		requireAuth: true
      }
    },
    {
      path:'/exam',
      component: (resolve)=>require(['@/components/views/exam'],resolve),
      meta:{
        title:'在线考试',
		requireAuth: true
      }
    },
    {
      path:'/jigou',
      component: (resolve)=>require(['@/components/views/jigou'],resolve),
      meta:{
        title:'关于我们'
      }
    },
    {
      path:'/News',
      component: (resolve)=>require(['@/components/views/News'],resolve),
      meta:{
        title:'新闻中心'
      }
    },
    {
      path:'/zhengshucx',
      component: (resolve)=>require(['@/components/views/zhengshucx'],resolve),
      meta:{
        title:'证书查询',
		requireAuth: true
      }
    },
    {
      path:'/Kechenglist',
      component: (resolve)=>require(['@/components/views/Kechenglist'],resolve),
      meta:{
        title:'课程分类'
      }
    },
    {
      path:'/video',
      component: (resolve)=>require(['@/components/views/video'],resolve),
      meta:{
        title:'视频学习'
      }
    },
    {
      path:'/xuexijl',
      component: (resolve)=>require(['@/components/views/xuexijl'],resolve),
      meta:{
        title:'学习指南'
      }
    },
    {
      path:'/goumaikc',
      component: (resolve)=>require(['@/components/views/goumaikc'],resolve),
      meta:{
        title:'购买记录'
      }
    },
    {
      path:'/kaoshijilu',
      component: kaoshijilu,
      meta:{
        title:'考试记录'
      }
    },
    {
      path:'/kechenggl',
      component: (resolve)=>require(['@/components/views/kechenggl'],resolve),
      meta:{
        title:'课程管理'
      }
    },
    {
      path:'/shoucang',
      component: (resolve)=>require(['@/components/views/shoucang'],resolve),
      meta:{
        title:'我的收藏',
		requireAuth: true
      }
    },
    {
      path:'/zhengshu',
      component: (resolve)=>require(['@/components/views/zhengshu'],resolve),
      meta:{
        title:'我的证书',
      }
    },
    {
      path:'/fapiao',
      component: (resolve)=>require(['@/components/views/fapiao'],resolve),
      meta:{
        title:'发票管理'
      }
    },
    {
      path:'/addfapiao',
      component: (resolve)=>require(['@/components/views/addfapiao'],resolve),
      meta:{
        title:'添加发票'
      }
    },
    {
      path:'/userinfo',
      component: (resolve)=>require(['@/components/user/userinfo'],resolve),
      meta:{
        title:'用户设置'
      }
    },
    {
      path:'/xiaoxi',
      component: (resolve)=>require(['@/components/user/xiaoxi'],resolve),
      meta:{
        title:'我的消息'
      }
    },
    {
      path:'/tuiguang',
      component: (resolve)=>require(['@/components/views/tuiguang'],resolve),
      meta:{
        title:'我的推广'
      }
    },
    {
      path:'/zhanghu',
      component: (resolve)=>require(['@/components/user/zhanghu'],resolve),
      meta:{
        title:'我的账户'
      }
    },
    {
      path:'/Login',
      component: (resolve)=>require(['@/components/user/Login'],resolve),
      meta:{
        title:'登录'
      }
    },
    {
      path:'/Register',
      component: (resolve)=>require(['@/components/user/Register'],resolve),
      meta:{
        title:'会员注册'
      }
    },
    {
      path:'/Findpasd',
      component: (resolve)=>require(['@/components/user/Findpasd'],resolve),
      meta:{
        title:'找回密码'
      }
    },
    {
      path:'/Newsshow/:desc/:passtime/:author/',
      name:'Newsshow',
      component: (resolve)=>require(['@/components/views/Newsshow'],resolve),
      meta:{
        title:'文章详情'
      }
    },
    {
      path:'/Order',
      component: (resolve)=>require(['@/components/views/Order'],resolve),
      meta:{
        title:'提交订单'
      }
    },
    {
      path:'/Orderxq',
      component: (resolve)=>require(['@/components/views/Orderxq'],resolve),
      meta:{
        title:'订单详情'
      }
    },
    {
      path:'/Pay/:total/:totalPrice',
      name: 'Pay',
      component: (resolve)=>require(['@/components/views/Pay'],resolve),
      meta:{
        title:'订单支付'
      }
    },
    {
      path:'/Addaddress',
      component: (resolve)=>require(['@/components/views/Addaddress'],resolve),
      meta:{
        title:'添加收获地址'
      }
    },
    {
      path:'/Selectaddress',
      name:'Selectaddress',
      component: (resolve)=>require(['@/components/views/Selectaddress'],resolve),
      meta:{
        title:'选择收获地址'
      }
    },
    {
      path:'/Aboutus',
      component: (resolve)=>require(['@/components/views/Aboutus'],resolve),
      meta:{
        title:'关于我们'
      }
    },
    {
      path:'/Register_success',
      component: (resolve)=>require(['@/components/views/Register_success'],resolve),
      meta:{
        title:'注册成功'
      }
    },
    {
      path:'/Pay_success',
      component: (resolve)=>require(['@/components/views/Pay_success'],resolve),
      meta:{
        title:'支付成功'
      }
    },
    {
      path:'/teacher',
      component: (resolve)=>require(['@/components/views/teacher'],resolve),
      meta:{
        title:'师资团队'
      }
    },
    {
      path:'/Cart',
      component: (resolve)=>require(['@/components/views/Cart'],resolve),
      meta:{
        title:'购物车',
		requireAuth: true
      }
    },
    {
      path:'/xiaoxishow/:movieId',
      name:'xiaoxishow',
      component: (resolve)=>require(['@/components/views/xiaoxishow'],resolve),
      props:true,
      meta:{
        title:'消息详情'
      }
    },
    {
      path:'/Cantantus',
      component: (resolve)=>require(['@/components/views/Cantantus'],resolve),
      meta:{
        title:'常用联系人'
      }
    },
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
