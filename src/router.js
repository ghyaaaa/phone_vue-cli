import Vue from 'vue'
import Router from 'vue-router'

//src/router.js 配置组件访问路由
//1.引入自定义组件
import HomeContainer from "./components/tabbar/HomeContainer.vue"
import NewsContainer from "./components/news/NewsContainer.vue"
import HomeMember from "./components/tabbar/HomeMember.vue"
import HomeShopCart from "./components/tabbar/HomeShopCart.vue"
import HomeSearch from "./components/tabbar/HomeSearch.vue"
import NewsDetailsContainer from "./components/news/NewsDetailContainer.vue"
//商品列表
import GoodList from "./components/goods/GoodList.vue"
import GoodInfo from "./components/goods/GoodsInfo.vue"
//用户列表
import Register from "./components/user/register.vue"
import Login from "./components/user/login.vue"
//位置页面
import PositionPage from "./components/subcomponents/position.vue";
//正在开发页面
import Onbuild from "./components/subcomponents/onbuild.vue"
//404
import NotFound from "./components/subcomponents/notFound.vue"




Vue.use(Router)
//2.指定该组件的访问路径
export default new Router({
  linkActiveClass:"mui-active",//覆盖默认路由高亮类
  routes: [
    // {path:'/',component:HelloContainer},
    {path:'/',redirect:'/home/index'},
    {path:'/home/index',component:HomeContainer},
    {path:'/home/newslist',component:NewsContainer},
    {path:'/home/member',component:HomeMember},
    {path:'/home/shopcart',component:HomeShopCart},
    {path:'/home/search',component:HomeSearch},
    {path:'/newsdetail/:id',component:NewsDetailsContainer},
    {path:'/home/goodslist',component:GoodList},
    {path:'/home/goodsinfo/:id',component:GoodInfo},
    {path:'/home/users/register',component:Register},
    {path:'/home/users/login',component:Login},
    {path:'/onbuild',component:Onbuild},
    {path:'/position',component:PositionPage},
    {path:'*',component:NotFound}
    // {path:'/home/goodsinfo/:id',component:GoodInfo,name:"goodsinfo"}
  ]
})
