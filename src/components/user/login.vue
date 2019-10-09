<template>
  <div>
    <mt-header fixed title="登录" style="background:#00A076">
       <div  slot="left">
                <mt-button icon="back" @click="goBackPage()">返回</mt-button>
            </div>
    </mt-header>
    <div class="register-container">
      <div>
        <input type="text" placeholder="请输入用户名" class="my_input" v-model="uname">
        <span style="font-size:10px;color:#fff">{{isuname}}</span>
        <input type="password" placeholder="请输入密码" class="my_input" v-model="upwd">
        <mt-button type="default" size="large" @click="login($event)">立即登录</mt-button>
      </div>
    </div>
  </div>
</template>
<script>
  import Qs from "qs"
  import {
    MessageBox
  } from 'mint-ui';
  export default {
    data() {
      return {
        uname: "",
        upwd: "",
        isuname: "",
        res: "",
        query_page:""//从哪里跳转过来的页面
      }
    },
    created() {

    },
    methods: {
      login(e) {
        this.$axios.post("users/signin",
          Qs.stringify({
            uname: this.uname,
            upwd: this.upwd
          })
        ).then(res => {
          this.res = res.data;
          if (res.data.ok == 0) {} else {
            this.query_page = this.$route.query.redirect
            if (this.$route.query.redirect != undefined) {
              this.$router.push({
                path: `${this.$route.query.redirect}`
              })
            } else {
              setTimeout(() => {
                if (e.Keycode == 13) {
                  this.$router.push({
                    path: "/home/index",
                  })
                }
                this.$router.push({
                  path: "/home/index",
                })
              }, 1000)
            }
          }
          MessageBox({
            title: "提示",
            message: "将返回页面.."
          })
        })

      },
      //回到页面
      goBackPage(){
          if(this.$route.query.redirect!=undefined){
             this.$router.push({
                 path: `${this.$route.query.redirect}`
              })
          }else{
               this.$router.push({
                 path: `/`
              })
          }
      }
    },
  }
</script>

<style scoped>
  .register-container {
    background-image: linear-gradient(180deg, #08B27F, #16B76A);
    text-align: center;
    position: relative;
    min-height: 667px;
  }

  .register-container div:first-child {
    list-style: none;
    position: absolute;
    left: 10%;
    top: 5%;
    width: 80%;
    text-align: left;
    margin-top: 20%;
  }

  [type="phone"] {
    margin-bottom: 5%;
  }

  #vify {
    width: 110px;
    height: 60px;
    position: absolute;
    top: 21%;
    right: -6%;
  }

  input {
    width: 100%;
    height: 40px;
    border-radius: 4px;
    padding-left: 14px;
    background: hsla(0, 0%, 100%, .2) !important;
    z-index: 99;
    color: #f5f5f5 !important;
    font-size: 13px;
    outline: 0;
  }

  .my_input {
    width: 100%;
  }
</style>