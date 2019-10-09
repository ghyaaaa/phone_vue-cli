import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Qs from 'qs'


import 'mint-ui/lib/style.css'


Vue.config.productionTip = false
//5: 设置请求的根路径 
//Vue.http.options.root = "http://127.0.0.1/vue_ser/";
//6:全局设置post 时候表音的数据组织格式为 application/x-www-form-urlencoded
//Vue.http.options.emulateJSON = true;
// 导入 MUI 的样式表， 和 Bootstrap 用法没有差别
import './lib/mui/css/mui.css'
// 导入 MUI 的样式表，扩展图标样式，购物车图标
// 还需要加载图标字体文件
import './lib/mui/css/icons-extra.css'
//引入vuex组建
import Vuex from "vuex";
//引入懒加载
import VueLazyLoad from 'vue-lazyload';
//注册
Vue.use(VueLazyLoad);
//注册
Vue.use(Vuex);

//创建vuex的对象:共享数据,操作方法,获取并监听数据的方法


//main.js
//1.引入Header组件
import {
    Header,
    Button,
    Tabbar,
    TabItem,
    Loadmore,
    InfiniteScroll
} from "mint-ui"
//2.注册        标签名称     组件对象
Vue.component(Header.name, Header);
Vue.component(Button.name, Button);
Vue.component(Tabbar.name, Tabbar);
Vue.component(TabItem.name, TabItem);
Vue.component(Loadmore.name, Loadmore);
Vue.use(InfiniteScroll);

//引入Swipe 轮播组件
import {
    Swipe,
    SwipeItem
} from "mint-ui"
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
//3.引入vueResource 到当前项目中
import VueResource from "vue-resource"
//加载
Vue.use(VueResource)
//5.定义全局过滤器(日期)
//第三方模块 moment 过滤器日期
//-自定义  //过滤器名             用户日期
Vue.filter("dateFormat", function (datestr, pattern = "YYY-MM-DD") {
    return new Date(datestr).toLocaleString();
})
Vue.filter("ellipse", function (val, len) {
    if (val.length <= len) {
        return val;
    } else {
        return val.slice(0, len) + "....."
    }
})
Vue.prototype.$bus = new Vue();
//引入axios
import axios from 'axios'
Vue.prototype.$axios = axios;
//设置axios-ajax访问记基础路径
axios.defaults.baseURL = "http://47.107.120.137:3000/"
// axios.defaults.baseURL = "http://127.0.0.1:3000/"
//设置axios-ajx访问格式
// axios.defaults.headers = {
//     'Content-Type': 'application/x-www-form-urlencoded'
// }
axios.defaults.withCredentials = true;
//6.全局的ajax访问基础路径  Vue-Resource
Vue.http.options.root = "http://47.107.120.137:3000/"
// Vue.http.options.root = "http://127.0.0.1:3000/"
//7.设置全局ajax post访问格式
Vue.http.options.emulateJSON = true;
var store = new Vuex.Store({
    state:{   //共享的数据
        carCount:0,  //购物车中的数量
        isLogin:false, //控制用户是否登录
        uname:"",//用户的姓名
        islogin_register:false,
    },   
    actions:{
        saveForm(context) {
          axios({
              method:'get',
              url:'users/islogin',
            //   data:context.state.isLogin
          }).then((res)=>{
              if(res.data.ok==1){
                store.state.isLogin = true;
                store.state.uname = res.data.uname;
                store.state.islogin_register = false;
              }else{
                store.state.isLogin = false;
                store.state.islogin_register = true;
              }
              axios({
                  method:'get',
                  url:`/collection/searchlist?uname=${store.state.uname}`
              }).then((res)=>{
                  store.state.carCount = res.data.data.length;
              })
          }).catch((err)=>{
              console.info(err)
          })
        },
       
        
        
    },     
    mutations:{   //操作共享数据的方法
      increment(state,count){
          state.carCount+=count;
      },
      substract(state,count){
        state.carCount-=count;
        if(state.carCount<=0){
            state.carCount=0;
        }
      },
      clearcount(state){
        state.carCount=0;
      },
    },    
    getters:{ //获取并监听数据的方法
        optCount:function(state){
            return state.carCount
        },
        optIsLogin:function(state){
            return [state.isLogin,state.uname,state.islogin_register]
        }
    }       
});
export default store
new Vue({
    router,
    render: h => h(App),
    store  //将Vuex对象注册到vue对象中
}).$mount('#app')