<template>
    <div class="app_newslist ">
      
<ul class="mui-table-view">
    <li class="mui-table-view-cell mui-media" v-for="(item,i) in list" :key="item.i">
        <router-link :to="'/newsdetail/'+item.id">
            <img class="mui-media-object mui-pull-left" :src="item.img_url">
            <div class="mui-media-body">
                {{item.title}}
                <p class='mui-ellipsis'>
                    <span >{{item.ctime | dateFormat}}</span>
                    <span>点击:{{item.click}}次</span>
                </p>
            </div>
        </router-link>
    </li>
</ul>
 <mt-button type="primary" size="large" @click="getMore()">加载更多....</mt-button>
    </div>
</template>
<script>
import { Toast } from "mint-ui";
export default {
  data() {
    return {
      list: [],
      pageIndex: 0 //页码
    };
  },
  methods: {
    getNewslist() {
      // 分页获取新闻列表
        this.$axios.get("newslist/list?pno=2&pageSize=10").then(res=>{
           if(res.data.code==1){
            this.list=res.data.msg.data;
           }else{
               Toast("加载新闻列表出错")
           }
        })
    },
    getMore() {
      this.pageIndex++; //页码加一
      var url = "newslist/list?pno=" + this.pageIndex;
      this.$axios.get(url).then(result => {
        //赋值有问题,覆盖前一页数据
        //    this.list=result.body.msg.data;
        //保存前一页 concat
        var newsLength = result.data.msg.data.length;
        this.list = this.list.concat(result.data.msg.data);
        if (this.list.length <= newsLength + result.data.msg.data.length) {
          Toast({
            message: "加载成功",
            duration: 400
          });
        } else {
          Toast({
            message: "没有更多了",
            duration: 500
          });
        }
      });
    }
  },
  created() {
    this.getNewslist();
    this.getMore();
  }
};
</script>
<style>
.app_newslist .muit-table-view h1 {
  font-size: 14px;
  font-weight: 5000;
}
.app_newslist li .mui-ellipsis {
  font-size: 12px;
  color: #226aff;
  display: flex;
  justify-content: space-between;
}
</style>
