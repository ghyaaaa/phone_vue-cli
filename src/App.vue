<template>
    <div class="app-container" v-if="isRouterAlive">
        <!-- 1:顶部导航 -->
        <mt-header title="心灵旅游" fixed style="background: linear-gradient(180deg, #43C67B, #10BFA4);">
            <!-- <router-link to="/" slot="left">
    <mt-button icon="back">返回</mt-button>
  </router-link> -->
            <mt-button slot="right" @click="gouserinfo()" v-if="$store.getters.optIsLogin[0]">{{$store.getters.optIsLogin[1]}}</mt-button>
            <mt-button slot="right" style="margin:0 5px;" @click="signout()" v-if="$store.getters.optIsLogin[0]">退出登录</mt-button>
            <mt-button slot="right" style="margin:0 5px;" @click="goregister()" v-if="$store.getters.optIsLogin[2]">注册</mt-button>
            <mt-button slot="right" @click="gologin()" v-if="$store.getters.optIsLogin[2]">登录</mt-button>
        </mt-header>
        <!-- 2:路由 -->
        <router-view v-if="isRouterAlive"></router-view>
        <!-- 3:tabbar -->
        <nav class="mui-bar mui-bar-tab">
            <router-link class="mui-tab-item " to="/home/index">
                <span class="mui-icon mui-icon-home"></span>
                <span class="mui-tab-label">首页</span>
            </router-link>

            <router-link class="mui-tab-item" to="/home/search">
                <span class="mui-icon  mui-icon-search"></span>
                <span class="mui-tab-label">搜索</span>
            </router-link>
            <router-link class="mui-tab-item" to="/home/shopcart">
                <!-- <span class="mui-icon mui-icon-extra mui-icon-extra-heart"><span class="mui-badge">{{$store.getters.optCount}}</span></span> -->
                <span class="mui-icon mui-icon-extra mui-icon-extra-heart"><span class="mui-badge">{{$store.getters.optCount}}</span></span>
                <span class="mui-tab-label">我的收藏</span>
            </router-link>

            <router-link class="mui-tab-item " to="/home/member">
                <span class="mui-icon mui-icon-contact"></span>
                <span class="mui-tab-label">会员</span>
            </router-link>
        </nav>
    </div>
</template>
<script>
    export default {
        name: "app",
        provide() {
            return {
                reload: this.reload,

            }
        },
        data() {
            return {
                isRouterAlive: true,
                list: [],
                num: 0,
                if_tab_show: true,
                islogin: false,
                islogin_register: true,
                uname: "", //d当前session中的名字

            }
        },
        methods: {
            reload() {
                this.isRouterAlive = false;
                this.$nextTick(() => {
                    this.isRouterAlive = true;
                })
            },
            //跳转用户信息
            gouserinfo() {
                this.$router.push({
                    path: "/home/member"
                })
            },
            //跳转用户注册
            goregister() {
                this.$router.push({
                    path: "/home/users/register"
                })
            },
            //跳转用户登录
            gologin() {
                this.$router.push({
                    path: "/home/users/login"
                });

            },
            //退出登录
            signout() {
                this.$axios.get("users/signout").then(res => {
                    this.$store.state.isLogin = false;
                    this.$store.state.islogin_register = true;
                })
            }
        },
        created() {
            (async function(self){
            self.$store.dispatch("saveForm")
             })(this)
        },
        watch: {
            '$route'(to, from) {
                document.body.scrollTop = 0;
                document.documentElement.scrollTop =0;
                window.pageYOffset = 0;
                // this.isLogin();
                (async function (self) {
                    self.$store.dispatch("saveForm")
                })(this)
            }
        }
    }
</script>
<style>
    .app-container {
        padding-top: 40px;
        padding-bottom: 50px;
        overflow-x: hidden;
    }

    .mui-bar-tab .mui-tab-item-tao.mui-active {
        color: #007aff;
    }

    .mui-bar-tab .mui-tab-item-tao {
        display: table-cell;
        overflow: hidden;
        width: 1%;
        height: 50px;
        text-align: center;
        vertical-align: middle;
        white-space: nowrap;
        text-overflow: ellipsis;
        color: #929292;
    }

    .mui-bar-tab .mui-tab-item-tao .mui-icon {
        top: 3px;
        width: 24px;
        height: 24px;
        padding-top: 0;
        padding-bottom: 0;
    }

    .mui-bar-tab .mui-tab-item-tao .mui-icon~.mui-tab-label {
        font-size: 11px;
        display: block;
        overflow: hidden;
        text-overflow: ellipsis;
    }
</style>