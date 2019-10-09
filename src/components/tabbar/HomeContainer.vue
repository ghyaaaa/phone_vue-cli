<template>
  <div class="app">
    <!-- 主页组件 HomeContainer.vue -->
    <!-- 1:轮播图 -->
  <!-- <router-link to="/" slot="left">
    <mt-button icon="back">返回</mt-button>
  </router-link> -->
    <mt-swipe :auto="3000">
      <mt-swipe-item v-for="item in list" :key="item.id">
        <img :src="item.img" alt="">
      </mt-swipe-item>
    </mt-swipe>
    <div class="divider"></div>
    <!-- 2:六宫格 -->
    <ul class="mui-table-view mui-grid-view mui-grid-9">
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/home/newslist">
          <img src="../../img/icons/Music Equalizer.png" />
          <div class="mui-media-body">新闻资讯</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/home/goodslist">
          <img src="../../img/icons/Beach.png" />
          <div class="mui-media-body" id="badge">商品
          </div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/onbuild">
          <img src="../../img/icons/Old Car 2.png" />
          <div class="mui-media-body">租车</div>
        </router-link></li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/position">
          <img src="../../img/icons/Paper Plane.png" />
          <div class="mui-media-body">位置</div>
        </router-link></li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/onbuild">
          <img src="../../img/icons/Apartment.png" />
          <div class="mui-media-body">酒店</div>
        </router-link></li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/onbuild">
          <img src="../../img/icons/Wind Wheel.png" />
          <div class="mui-media-body">天气</div>
        </router-link></li>
    </ul>
    <div class="divider"></div>
    <!-- 精选折扣 每日更新 -->
    <div class="recommend">
      <h4>精选折扣 每日更新</h4>
      <span class="change" @click="changeMsg()">换一批</span>
      <div class="recommend-product-warp">
        <div class="recommend-prodcut" v-for="(item,i) in recommendlist" @click="shopinfo(item.tid)">
          <img :src="item.pic">
          <p class="text-ellipse">{{item.details}}</p>
          <p class="now-price">{{item.price}} <span>元起</span></p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  //加载当前组件需要第三方模块
  import {
    Toast
  } from "mint-ui";

  export default {
    inject:['reload'],
    data() {
      return {
        list: [],
        recommendlist: [],
        pno: 0,
        pageSize: 4,
        pageCount: "",
        islogin:false,
        islogin_register:true,
        uname:"",//d当前session中的名字
      };
    },
    methods: {
      getImageList() {
        //获取图片轮播数据
        this.$http.get("index/list").then(res => {
          //   console.log(res)
          //nodejs发送字符串 通过VueResource转换成js对象
          if (res.status == 200) {
            this.list = res.body;
          } else {
            //出错提示 Toast()
            Toast("加载轮播图片失败");
          }
        });
      },
      // 获取推荐
      getRecommendList() {
        this.$axios.get(`index/recommend?pno=${this.pno}&pageSize=${this.pageSize}`).then(res => {
          this.recommendlist = res.data.data.products;
          this.pno = res.data.data.pno;
          this.pageSize = res.data.data.pageSize;
          this.pageCount = res.data.data.pageCount;

        })
      },
      //换一批
      changeMsg() {
        if (this.pno < this.pageCount) {
          this.pno++
          this.getRecommendList();
        } else {
          this.pno = parseInt(Math.random() * this.pageCount);
          this.getRecommendList();
        }
      },
      //展示详情
      shopinfo(tid){
          this.$router.push({path:`goodsinfo/${tid}`})
      }
    },
    created() {
      this.getImageList();
      this.getRecommendList();
    },
    mounted(){
    }
  };
</script>
<style scoped>

  .app .mint-swipe {
    height: 160px;
  }

  .app .mint-swipe img {
    width: 100%;
    height: 160px;
  }

  .app .mui-grid-view.mui-grid-9 {
    background-color: #fff;
    border: 0;
  }

  .mui-grid-view.mui-grid-9 img {
    width: 60px;
    height: 60px;
  }

  .mui-grid-view.mui-grid-9 .mui-media-body {
    font-size: 13px;
  }

  .app .mui-grid-view.mui-grid-9 .mui-table-view-cell {
    border: 0;
  }

  .divider {
    height: 15px;
    background: #f1f1f1;
    box-shadow: 0 5px 5px rgba(0, 0, 0, .1) inset;
    /*h v blur speard color inset*/
  }

  .recommend {
    padding: 18px 0;
    text-align: center;
    background: #fff;
    position: relative;
  }

  .recommend h4 {
    margin-bottom: 18px;
  }

  .recommend .change {
    color: #666;
    font-size: 12px;
    position: absolute;
    ;
    top: 30px;
    right: 20px;
    cursor: pointer;
  }

  .recommend .change:active {
    color: #36C586;
  }

  /* 精选折扣 */
  .recommend-product-warp {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
   
  }

  .recommend-prodcut {
     width:160px;
    text-align: left;
    margin: 0 3%;
    overflow: hidden;
  }

  .text-ellipse {
    display: -webkit-box;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    text-align: left;
  }

  .recommend-prodcut p {
    color: #111;
    font-size: 13px;
    margin: 0;
  }

  p.now-price {
    font-size: 15px;
    color: #ff7467
  }

  .recommend-prodcut span {
    color: #636363;
    font-size: 10px;
  }

  .recommend-prodcut img {
    width: 163px;
    height: 110px;
  }
</style>