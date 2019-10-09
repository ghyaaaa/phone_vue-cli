<template>
    <div>
     <div class="user-info-warp">
         <div class="bg-show"></div>
         <div class=user-info-avatar>
             <img src="../../img/profile/200.jpg" alt="" width="64" hieght="64">
         </div>
         <div class="user-info-name">
            <p class="user-name" v-if="$store.getters.optIsLogin[0]">{{$store.getters.optIsLogin[1]}}
                  <a @click="signout()">退出登录</a>
            </p>
            <p class="user-name" v-else>当前还没登录
                <a @click="godetail()">立即登录</a>
            </p>
          
         </div>
     </div>
     <!-- 分割灰色 -->
     <div class="divider"></div>
    <!-- 下方导航 -->
    <div class="user-nav">
        <div class="cell arrow">
            <div class="cell-item ">
                <img src="../../img/icons/luntan.png" alt="">
                <span>我的论坛</span>
            </div>
        </div>
        <div class="cell arrow">
            <div class="cell-item">
                <img src="../../img/icons/wenda.png" alt="">
                <span>我的问答</span>
            </div>
        </div>
        <div class="cell arrow">
            <div class="cell-item">
                <img src="../../img/icons/jihua.png" alt="">
                <span>我的行程计划</span>
            </div>
        </div>
        <div class="cell arrow">
            <div class="cell-item">
                <img src="../../img/icons/youhuijuan.png" alt="">
                <span>穷游商城优惠券</span>
            </div>
        </div>
        <div class="cell arrow">
            <div class="cell-item ">
                <img src="../../img/icons/qianbi.png" alt="">
                <span>兑换我的穷币</span>
            </div>
        </div>
        <div class="divider"></div>
        <div class="cell arrow">
            <div class="cell-item">
                <img src="../../img/icons/seting.png" alt="">
                <span>关于与帮助</span>
            </div>
        </div>
      <div class="divider"></div>
     </div>
     <footer class="qui-footerBasic">
    <p class="copyright">2004-2017 © 穷游网™ qyer.com All rights reserved.</p>
  </footer>
    </div>
</template>
<script>
    export default{
        inject:["reload"],
    data(){
        return{
            islogin:true,
            uname:""
        }
    },
     methods:{
         //退出登录
          signout(){
        this.$axios.get("users/signout").then(res=>{
            this.reload()
        })
      },
      godetail(){
          this.$router.push("/home/users/login");
      }
     },
     created(){
    //  this.$axios.get("users/islogin").then(res=>{
    //      if(res.data.ok ==1){
    //        this.uname = res.data.uname;
    //        this.islogin = true;
    //        this.islogin_register = false
    //      }else{
    //         this.islogin = false
    //         this.islogin_register = true
    //      }
    //   })
       this.$store.dispatch("saveForm")
     }
   }
</script>
<style scoped>
*{
    margin:0;
    padding:0;
}
.user-info-warp{
   width:100%;
   position:relative;
   background: #fff url("../../img/profile/headImage_lite.png") no-repeat center center;
   background-size:cover; 
   height:184px;
}
.divider{
  height:10px;
  background: #f1f1f1;
  box-shadow: 0 5px 5px  rgba(0,0,0,.1) inset;  /*h v blur speard color inset*/
}
.user-info-avatar{
    width:64px;
    height:64px;
    border-radius: 50%;
    overflow: hidden;
    position: absolute;
    left:50%;
    top:50%;
    margin-top:-32px;
    margin-left:-32px;
}
.bg-show{
    width:100%;
    height:50px;
    position: absolute;
    bottom:0;
    background-image:linear-gradient(180deg,rgba(0,0,0,.3),rgba(0,0,0,.1)); 
}
.user-info-name{
    position: absolute;
    left:40%;
    top:75%;
    display: flex;
}
.user-info-name p{
    font-size:15px;
    color:#fff;
    font-weight: 600;
    margin-right:10px;
}
.user-info-name a{
 color:#fff;
 font-size:13px;
}
.user-info-name a:hover{
    text-decoration: underline;
}
/*3. 通用箭头大于 */
.arrow{
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.arrow::after{
  content:"";
  border-top:2px solid #ccc;
  border-right:2px solid #ccc;
  transform: rotate(45deg);
  width:12px;
  height:12px;
  z-index: 99;
  margin-right:10px;
}
.user-nav{
    background: #fff;
}
.cell{
  background-color:#fff;
  font-size: 16px;
  border-bottom:1px solid #ddd;
}
.cell-item{
  border-bottom: 1rpx solid #ddd;
  padding:20rpx 30rpx;
  display: flex;
  align-items: center;
  padding:15px 10px;
  font-size:15px;
}
.cell-item img{
    width:25px;
    height:25px;
}
.cell-item span{
    margin-left:10px;
}
  .qui-footerBasic{
    margin: 0 auto;
    padding: 20px 0 20px 0;
    background-color: #FFF;
    text-align: center;
  }
  .copyright{
     font-size:12px;
  }
</style>
