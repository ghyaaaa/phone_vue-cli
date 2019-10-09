<template>
<div>
  <div class="mui-content" style="background-color:#fff">
    <h5 style="background-color:#efeff4;font-weight:600;">为你精选</h5>
    <ul class="mui-table-view mui-grid-view">
   
      <li class="mui-table-view-cell mui-media mui-col-xs-6" v-for="(item,i) in list">
        <a @click="getDetail(item.tid)">
          <img class="mui-media-object" :src="item.pic">
          <div class="mui-media-body">{{item.details | ellipse(28)}}</div>
          <div class="mui-media-body subbody">{{item.price}} <span>元起</span></div>
        </a>
      </li>
         <!-- <span class="mui-spinner" v-if="ifshow"></span> -->
    </ul>
    
  </div>
   <mt-button type="default" size="large" @click="getmore()">加载更多</mt-button>
  <footer class="qui-footerBasic">
    <p class="copyright">2004-2017 © 穷游网™ qyer.com All rights reserved.</p>
  </footer>
</div>

</template>
<script>
  import {
    Toast,
    Button
  } from 'mint-ui';
  export default {
    data() {
      return {
        list: [],
        pno: 0, //当前页数
        length: 0, //保存当前返回回来的数据的长度
       pageSize:6,
       ifshow:false
      };
    },
    methods: {
      getDetail(tid, e) {
        this.$router.push("/home/goodsinfo/" + tid);
      },
      getMsg() {
        this.pno++;
        this.$axios.get("index/recommend?pno=" + this.pno+"&pageSize="+this.pageSize).then(res => {
          this.list = res.data.data.products;
          this.pno = res.data.data.pno;
          this.pageSize = res.data.data.pageSize;
          this.pageCount = res.data.data.pageCount;
        });
      },
      getmore(){
        this.pno++;
         this.$axios.get("index/recommend?pno=" + this.pno+"&pageSize="+this.pageSize).then(res => {
            this.list=this.list.concat(res.data.data.products);
            this.ifshow=true;
            if(res.data.data.products.length>0){
              Toast({
                message:"加载成功",
                duration:1000
              })
            }else{
              Toast({
                message:"已经到底了",
                duration:1000
              })
            }
         })
    
      }

    },
    created() {
      this.getMsg();

    }
  };
  //点击当前商品跳转,商品详细信息组件
  //标签  <router-link></router-link>
  //编程  this.$router.push("/路由")
</script>
<style scoped>
  .mui-media-body{
    width:100% !important;
    white-space: normal;
    height: 30px !important;
    display: -webkit-box !important;
    -webkit-box-orient: vertical;
    -webkit-line-clamp:2;
    text-align: left;
  }
  .subbody{
    color:#FF7467 !important;
    height:15px !important;
  }
  .subbody span{
    color:#636363;
    font-size:12px;
  }
  .mui-media-object{
    height:112.3px !important;
  }
  .mui-spinner{
    margin-left:50%;
  }
  .qui-footerBasic{
    margin: 0 auto;
    padding: 20px 0 20px 0;
    background-color: #F5F5F5;
    text-align: center;
  }
  .copyright{
     font-size:12px;
  }
</style>