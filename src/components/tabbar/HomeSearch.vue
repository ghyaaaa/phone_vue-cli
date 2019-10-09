<template>
    <div class="app_search">
        <div class="mui-card">
            <!-- 商品输入框 -->
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <input type="text" value="" placeholder="国庆好货 天天抢" v-model="kw">
                    <span class="mui-icon mui-icon-search"></span>
                </div>
            </div>
        </div>
        <!-- 商品列表 -->
        <h5 style="margin-left:40px;" v-if="isshow">{{not_fond}}</h5>
        <div class="mui-card">
            <div class="mui-card-header">搜索结果</div>

            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <ul class="mui-table-view">
                        <li class="mui-table-view-cell mui-media" v-for="(item,i) in products" :key="item.id" @click="shopinfo(item.tid)">
                            <a href="javascript:;">
                                <img class="mui-media-object mui-pull-left" v-lazy="item.md">
                                <div class="mui-media-body text-ellipse">
                                    {{item.title | ellipse(24)}}
                                    <p class='mui-ellipsis' style="color:#18C09D">{{item.subtitle}}</p>
                                </div>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>

            <div class="mui-card-footer">
                <div class="button_next">
                    <button @click="prev()" :class="disabled_prev_info">上一页</button>
                    <button v-for="(item,i) in pageCount" :class="{active:changedActive==i}" @click="num(i)">{{i+1}}</button>
                    <button @click="next()" :class="disabled_next_info">下一页</button>
                </div>
                
            </div>
        </div>
    </div>
</template>
<script>
    import {
        Toast
    } from 'mint-ui';
    export default {

        data() {
            return {
                list: [],
                kw: null,
                pno: 0,
                pageCount: [],
                disabled_next_info: "active",
                disabled_prev_info: "disabled",
                products: [],
                changedActive: 0,
                not_fond: "没有知道你想要的东西呢,换一个词试试吧",
                isshow:false,
                pageSize: 8,

            }
        },
        methods: {
            getMsg() {
                this.$axios.get("/products?kw=" + this.kw + "&pno=" + this.pno + "&pageSize=" + this.pageSize).then(res => {
                    if(this.kw!=" "&&this.kw!=""){
                        this.res = res.data.data.products;
                        this.pageCount = res.data.data.pageCount;
                        this.pno = res.data.data.pno;
                        this.products = res.data.data.products;
                        if(this.products.length!=0){
                            this.isshow = false
                        }else{
                            this.isshow=true;
                        }
                    }
                })
            },
            shopinfo(id) {
                this.$router.push({path:`goodsinfo/${id}`})
            },
            next() {
                if (this.kw != "") {
                    this.pno++;
                    if (this.pno >= this.pageCount && this.pno > 0) {
                        Toast({
                            message: "已经是最后一页了哦,没有更多了,输入别的看看吧",
                            duration: 1000
                        })
                        this.pno = this.pageCount - 1;
                        this.changedActive = this.pno;
                        this.disabled_next_info = "disabled"
                    } else {
                        this.disabled_prev_info = "active"
                        this.getMsg();
                    }
                } else {
                    Toast({
                        message: "亲,你还没有输入任何内容哦",
                        duration: 1500
                    })
                }
            },
            prev() {
                if (this.pno <= this.pageCount && this.pno > 0) {
                    this.pno--;
                    this.disabled_prev_info = "active"
                    this.disabled_next_info = "active";
                    this.getMsg()

                } else {
                    this.disabled_prev_info = "disabled";
                    Toast({
                        message: "当前已经是第一页哦",
                        duration: 1000
                    })
                  
                }
            },
            num(i) {
                this.pno = i;
                this.getMsg();
            }
        },
        created() {},
        watch: {
            kw() {
                this.getMsg()
            },
            pno() {
                this.changedActive = this.pno;
            }
        },
        computed: {

        }
    };
</script>
<style scoped>
    .button_next {
        width: 100%;
        display: flex;
        justify-content: flex-end;
    }
    .active {
        background: #08b6f6;
    }

    .button_next .active {
        background: #08b6f6;
        color: #fff;
    }

    .button_next .disabled {
        opacity: 0.6;
        cursor: not-allowed;
    }

    .text-ellipse {
        display: -webkit-box;
        overflow: hidden !important;
        text-overflow: ellipsis;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        text-align: left;
    }

    .mui-icon-search {
        position: absolute;
        top: 23px;
        right: 20px;
        z-index: 5;
    }
</style>