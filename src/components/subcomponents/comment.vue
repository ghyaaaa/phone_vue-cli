<template>
  <div class="app_subcomment">
    <div>
      <textarea class="textarea" placeholder="请输入评论的内容(最多吐槽120字)" maxlength="120" v-model="msg"></textarea>
      <mt-button type="primary" size="large" class="button" @click.native="submitMsg()">点击发表评论</mt-button>
    </div>
    <!-- 评论区 -->
    <div class="comment">
      <ul>
        <li v-for="(item,i) in list" :key="i">
          <span>第{{i+1}}楼</span>
          <span>{{item.content | ellipse(123)}}</span>
          <span>{{item.username}}</span>
          <span>{{item.ctime | dateFormat}}</span>
          <p>
            <mt-button type="danger" size="small" @click.native="delMsg(item.id)">删除</mt-button>
          </p>
        </li>
      </ul>
    </div>
    <mt-button type="primary" size="large" @click="getMore()">加载更多....</mt-button>
  </div>
</template>
<script>
  import {
    Toast
  } from "mint-ui";
  import Qs from "qs";
  import { MessageBox} from "mint-ui";
  export default {
    inject:['reload'],
    data() {
      return {
        list: [],
        pageIndex: 0, //当前显示页码
        msg: ""
      };
    },
    methods: {
      submitMsg() {
        //  console.log(this.list)
        var username = "匿名用户";
        var nid = this.id; //新闻编号
        var content = this.msg; //双想绑定留言的内容
        var url = "newslist/saveComment";
        var obj = {
          nid,
          content,
          username
        };
        this.$axios.post(url, Qs.stringify(obj)).then(result => {
          // console.log(result);
          if (result.data.code == 1) {
            this.msg = "";
            Toast(result.data.msg);
            this.pageIndex = 0;
            this.list = [];
            this.getMore();
          } else if(result.data.code == -1){
            var msg = result.data.msg;
            Toast({
              message: msg,
              duration: 1200
            });
          }else{
            Toast({
              message:result.data.msg,
              duration:1500
            })
          }
        });

        //  this.list.unshift({content:this.str,id:1,username:"weigong",citme:new Date().toLocaleString()})
      },
      getMore() {
        this.pageIndex++; //页码加一
        this.$axios
          .get("newslist/commentlist?nid=" + this.id + "&pno=" + this.pageIndex)
          .then(res => {
            this.list = this.list.concat(res.data.data);
            var len = res.data.data + res.data.pageSize;
            if (this.list.length > len) {
              // console.log(len+res.data.data.length)
              Toast({
                message: "没有更多了",
                duration: 800
              });
            }
          });
      },
      delMsg(id){
        MessageBox.confirm("确定要删除这条评论吗?").then(()=>{
          this.$axios.get("newslist/delComment?id="+id).then(res=>{
              if(res.data.code==1){
                Toast({
                  message:res.data.msg,
                  duartion:1000
                })
              }else{
                Toast({
                  message:res.data.msg,
                  duartion:1000
                })
              }
               this.reload();
          })
        }).catch(v=>{
          console.info(v)
        })
      
      }
     
    },
    watch: {},
    created() {
      this.getMore();
    },
    props: ["id"] //接受父组件的传递参数
  };
</script>
<style scoped>
  .app_subcomment div .textarea {
    font-size: 10px !important;
    color: black !important;
    border-radius: 12px;
    scrollbar-arrow-color: yellow;
    scrollbar-base-color: lightsalmon;
    overflow: hidden;
    color: #666464;
    height: auto;
    margin: 0;
  }

  .app_subcomment div.comment {
    position: relative;
  }

  .app_subcomment div.comment ul {
    list-style: none;
    padding: 0;
  }

  .app_subcomment div.comment ul li {
    display: flex;
    justify-content: space-around;
    width: 100%;
    border: 1px solid #6464;
    border-radius: 5px;
    background: #fff;
    height: auto;
    text-align: center;
    margin-top: 2px;

  }

  .app_subcomment div.comment ul li span {
    display: inline-block;
    padding: 5px;
    font-size: 12px;
  }

  .app_subcomment div.comment ul li span:first-child {
    background-color: #eee;
  }
</style>