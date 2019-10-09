<template>
  <div>
    <div class="mui-card">
      <div class="mui-card-header" v-for="(item,i) in products_res" :key="i" @click="goDetails(item.tid)">
        <div class="cart_info">
          <div style="width:100%;">
            <h5>{{item.title |ellipse(40)}}</h5>
            <h6 class="price">{{item.price}}</h6>
             <mt-button size="small" type="danger" @click="del(item.tid,i)" style="margin-left:75%;">删除</mt-button>
          </div>
          <div class="img_container" style="padding-left:5%;">
            <img v-lazy="item.md_pic" style="width:108px;">
          </div>
        </div>
      </div>
      <div class="mui-card-footer"><span>总共有{{num}}件</span> </div>
      <div class="mui-card-footer" v-if="isLogin_show"><span style="font-size:15px;font-weight:600">当前还没有登录,请登录后再看您的宝贝哦,点击下方按钮登录!!</span> 
      </div>
      <mt-button v-if="isLogin_show" type="primary" size="large" @click="goLogin()">登录</mt-button>
    </div>
  </div>
</template>
<script>
  import Qs from "qs";
  import {
    Toast
  } from "mint-ui";
  import {
    MessageBox
  } from "mint-ui";
  export default {
    inject: ['reload'],
    data() {
      return {
        products_res: "",
        res_msg: "",
        ifshow: false, //当前提示消息是否显示
        uname: "",
        num: '',
        isLogin_show:true //当前是否登录
      };
    },
    methods: {
      //跳转到当前产品的详情页
      goDetails(tid) {
        this.$router.push(`/home/goodsinfo/${tid}`);
      },
      del(tid, index) {
        MessageBox.confirm("确定要删除这个商品吗?").then(() => {
          this.$axios.post("/collection/delete", Qs.stringify({
            tid
          })).then(res => {
            if (res.data.code == 1) {
              var msg = res.data.msg;
              Toast({
                message: msg,
                duration: 1500
              })
            } else {
              Toast({
                message: res.data.msg,
                duration: 1500
              })
            }
            //更新页面的状态
            this.$store.dispatch("saveForm")
            this.reload();
          })
        }).catch(v => {
          console.info(v);
        })
      },
      //跳转登录页面
      goLogin() {
        this.$router.push({
          path:"/home/users/login",
          query:{redirect:"/home/shopcart"}
        })
      }
    },
    computed: {
    },
    created() {
      (async function (self) {
        //1.判断用户是否登录
         var res = await self.$axios.get("/users/islogin")
        if (res.data.ok == 1) {
          self.isLogin = true;
          self.uname = res.data.uname;
          self.uid = res.data.uid;
          //关闭未登录的提示
          self.isLogin_show = false;
        } else {
          self.isLogin = false;
        }
        //2.查询当前用户的购物车
        var res = await self.$axios.get(`/collection/searchlist?uname=${self.uname}`)
          self.products_res = res.data.data;
         self.num = self.products_res.length;
          if (res.data.code == -1) {
            self.ifshow = true;
            self.res_msg = res.data.msg;
          } else {
            self.ifshow = false;
          }
      })(this)
    }
  };
</script>
<style scoped>
  .cart_info {
    width: 355px;
    display: flex;
    justify-content: space-between;
  }

  .cart_info .price {
    color: #ff7363;
    font-weight: 600;
  }

  .img_container{
     width:190px;
     height:80px;
  }
  .img_container img{
    width:100%;
    height:80px;
  }
</style>