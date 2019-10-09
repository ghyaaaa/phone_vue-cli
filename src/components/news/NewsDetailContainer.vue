<template>
    <div class="app_newdetails">
        <!-- 新闻详细页面没有现成组件 -->
        <h1 class="title">{{newsinfo.title}}</h1>
        <p class="subtitle">
            <span>发表时间:{{newsinfo.ctime}}</span>
            <span>点击:{{newsinfo.click}}次</span>
        </p>
        <div class="container">
             <img src="../../img/cbd.jpg" alt="">
             <p>
                {{newsinfo.content}}
             </p>
        </div>
        <!-- 评论区域 -->
        <comment-box :id="this.id"></comment-box>
    </div>
</template>
<script>
//导入评论的子组件
    import comment from "../subcomponents/comment.vue"
    export default{
        data(){
            return{
                id:this.$route.params.id,
                newsinfo:{} //保存当前新闻内容
            }
        },
        methods:{
           getNewsDetail(){
               var url="newslist/find?id="+this.id
                this.$http.get(url).then(res=>{;
                 this.newsinfo = res.body.msg[0][0];
                //  console.log(this.newsinfo)
            })
           }
        },
        created(){
            this.getNewsDetail()
        },
        components:{
            'comment-box':comment
        }
    }   
</script>
<style scoped>
.app_newdetails{
    padding:5px 10px;
}
.app_newdetails .title{
    font-size:20px;
    text-align: center;
    color:red
}
.app_newdetails .subtitle{
    display:flex;
    justify-content:space-between;
    padding:5px 2px;
    font-size:12px;
    color:#226aff;
}
.app_newdetails .container img{
     width:100%;
     vertical-align: middle;
}
.app_newdetails .container p{
    color:black;
    line-height:18px;
    margin-top:0.6rem;
}
</style>
