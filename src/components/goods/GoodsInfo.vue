<template>
  <!-- 轮播 -->
  <div>
    <div class="app-goods-info">
      <div class="mui-card">
        <div class="mui-card-content">
          <div class="mui-card-content-inner">
            <mt-swipe :auto="3000" style="height:200px;">
              <mt-swipe-item v-for="(item,i) in imgList" :key="item.id">
                <img :src="item.md" alt="" style="width:100%">
              </mt-swipe-item>
            </mt-swipe>
          </div>
        </div>
      </div>
      <!-- 第二部分购买区域 -->

      <div class="mui-card">
        <div class="mui-card-header">{{products.title}}</div>
        <div class="mui-card-content">
          <div class="mui-card-content-inner">
            <div class="details">{{products.title}}</div>
            <div class="price">
              <b>市场价: </b>
              <span class="old">{{(Number(products.price)).toFixed(2)}}</span>
              <span class="now">销售价:{{(Number(products.price)).toFixed(2)}}</span>
            </div>
            <div class="count">
              <h6>购买数量</h6>
              <mt-button size="small" @click="goSub()">-</mt-button>
              <span class="number">{{count}}</span>
              <mt-button size="small" @click="goAdd()">+</mt-button>

              <p class="booking">
                <mt-button size="small" type="primary">立即购买</mt-button>
                <mt-button size="small" type="default" :class="{love_active:iscollection}" @click="addCart()">收藏</mt-button>
              </p>
            </div>
          </div>
        </div>
      </div>
      <!-- 第三部分 -->
      <div class="mui-card">
        <div class="mui-card-header">商品参数</div>
        <div class="mui-card-content">
          <div class="mui-card-content-inner">
            <div>
              <ul class="info-list">
                <li>商品货号:{{products.product_number}}</li>
                <li>商品特色:{{products.subtitle}}</li>
                <li>我们承诺:{{products.promise}}</li>
                <li>注意事项:{{products.prompt}}</li>
              </ul>
            </div>
          </div>
          <div class="mui-card-footer">
            <div class="intro">
              <p>
                <mt-button size="small" @click="show_lgImg()">图文介绍</mt-button>
              </p>
              <p>
                <mt-button size="small" @click="show_comment()">商品评论</mt-button>
              </p>
            </div>
          </div>
          <div class="intro-img" v-if="ifshow_lgImg">
            <img :src="products.lg_pic" alt="">
          </div>
    	<div class="mui-content" v-if="ifshow_comment">
		    <ul class="mui-table-view mui-table-view-striped mui-table-view-condensed">
		        <li class="mui-table-view-cell" v-for="(item,i) in CommentList" :key="i">
		            <div class="mui-table">
		                <div class="mui-table-cell mui-col-xs-10">
		                    <h4 class="mui-ellipsis-2" style="font-size:13px;">{{item.content}}</h4>
		                    <h5>用户：{{item.uname}}</h5>
		                    <p class="mui-h6 mui-ellipsis">{{item.ctime | dateFormat}}</p>
		                </div>
		               
		            </div>
		        </li>
		    </ul>
		</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import swiper from "../subcomponents/swiper";
  import Qs from "qs";
  import {
    Toast
  } from "mint-ui";
  // 由于mui'.js与脚手架严格模式有冲突 放弃
  // import mui from "../../lib/mui/js/mui.js";
  export default {
    inject: ['reload'],
    data() {
      return {
        count: 1,
        tid: this.$route.params.id,
        list: [],
        md: [],
        imgList: [],
        products: [],
        ifshow_lgImg: false,
        islogin: false,
        uname: "", //当前登录的用户名
        uid: "", //当前用户的uid
        iscollection: false,
        CommentList: [], //商苹评论列表
        ifshow_comment:false //是否显示评论内容
      };
    },
    methods: {
      //1. 加入购物车
      addCart() { 
        var tid = this.products.tid;
        var title = this.products.title;
        var count = this.count;
        var price = this.products.price;
        var md_pic = this.md;
        var subtitle = this.products.subtitle;
        var old_price = this.products.old_price;
        var sold_count = this.products.sold_count;
        var uid = this.uid;
        var uname = this.uname;
        // console.log(title,subtitle,price,old_price,sold_count,md_pic,tid,uid,uname)
        var obj = {
          title,
          subtitle,
          price,
          old_price,
          sold_count,
          md_pic,
          tid,
          uid,
          uname
        };
        var url = "/collection/add";
        var obj = (Qs.stringify(obj));
        
        if (this.isLogin == false) {
          this.$router.push({
            path: "/home/users/login",
            query:{redirect:`/home/goodsinfo/${this.tid}`}
          });
          return;
        }
        if (this.isLogin == true) {
          //如果当前图标不为高亮状态 
          if (this.iscollection == false) {
            //发送请求 添加数据到数据库
            this.$axios
              .post(
                url,
                obj
              )
              .then(res => {
                if (res.data.code == 1) {
                  this.iscollection = true;
                  Toast({
                    message: "加入收藏列表成功",
                    duration: 1500
                  })
                } else {
                  Toast({
                    message: "加入收藏列表失败,请刷新一下试试",
                    duration: 1500
                  })
                }
              });
          } else {
            //删除功能
            this.$axios
              .post(
                "/collection/delete",
                Qs.stringify({
                  tid: this.tid
                })
              )
              .then(res => {
                if (res.data.code == 1) {
                  Toast({
                    message: "删除成功",
                    duration: 1500
                  })
                  this.iscollection = false;
                }
              });
          }
            this.$store.dispatch("saveForm");
        }
      },
      //2. 商品数量+1
      goSub() {
        if (this.count <= 1) {
          return
        };
        this.count = this.count - 1;
      },
      goAdd() {
        if (this.count >= 99) {
          return
        };
        this.count = this.count + 1;
      },
      //是否展示图文详情
      show_lgImg() {
        if (this.ifshow_lgImg === false) {
          this.ifshow_lgImg = true;
        } else {
          this.ifshow_lgImg = false;
        }
      },
      // 是否显示评论详情
      show_comment() {
        if (this.ifshow_comment === false) {
          this.ifshow_comment = true;
        } else {
          this.ifshow_comment = false;
        }
      },
      loadMore() {
        this.loading = true;
        setTimeout(() => {
          let last = this.list[this.list.length - 1];
          for (let i = 1; i <= 10; i++) {
            this.list.push(last + i);
          }
          this.loading = false;
        }, 2500);
      }
      
    },
    created() {
      (async function (self) {
        //1.判断是否登录
        var res = await self.$axios.get("/users/islogin")
        if (res.data.ok == 1) {
          self.isLogin = true;
          self.uname = res.data.uname;
          self.uid = res.data.uid;
        } else {
          self.isLogin = false;
        }
        //2.判断当前产品是否被当前用户收藏
        var res = await self.$axios.get(`/collection/iscollection?uname=${self.uname}&tid=${self.tid}`)
        if (res.data.code == 1) {
          self.iscollection = true;
        } else {
          self.iscollection = false;
        }
      })(this);
      // 3. 获取商品详情页
      this.$axios.get("details?tid=" + this.tid).then(res => {
        this.products = res.data.product;
        this.imgList = res.data.pics;
        this.md = res.data.pics[0].md;
      });
      //4. 获取商品评论列表
      this.$axios.get("comment/searchcomment?tid=" + this.tid).then(res => {
        this.CommentList = res.data.obj.comments;
      });
    },
    components: {
      swiper
    }
  };
</script>
<style scoped>
  .old {
    text-decoration: line-through;
  }

  .love_active {
    background: #EF4F4F !important;
    color: #fff;
  }

  .price .now {
    color: #ff7467;
    font-weight: 600;
    margin-left: 10px;
  }

  .number {
    display: inline-block;
    width: 32px;
    height: 32px;
    text-align: center;
    line-height: 32px;
  }

  .booking {
    margin-top: 8px;
  }

  /*参数*/
  .product_info_details {
    background: #fff;
  }

  ul.info-list {
    list-style: none;
    padding: 10px;
    margin-bottom: 5px;
    margin-top: 8px;
  }

  .info-list li {
    font-size: 12px;
    color: #666;
    padding: 5px 0;
    letter-spacing: 1px;
    border-bottom: 1px solid #ddd;
  }

  div.intro {
    display: flex !important;
    width: 100%;
    justify-content: space-between;
    padding: 10px;
  }

  .intro-img {
    width: 100%;
  }

  .intro-img img {
    width: 100%;

  }
</style>