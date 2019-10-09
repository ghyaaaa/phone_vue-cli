<template>
    <div>
        <mt-header fixed title="注册" style="background:#00A076">
            <router-link to="/" slot="left">
                <mt-button icon="back">返回</mt-button>
            </router-link>
        </mt-header>
        <div class="register-container">
            <div>
                <input type="phone" placeholder="请输入手机号码" v-model="phone">
                <canvas id="vify" @click="changeCode()"></canvas>
                <input type="text" placeholder="请输入验证码" class="my_input" v-model="v_code">
                <span style="color:#fff">{{v_code_text}}</span>
                <input type="text" placeholder="请输入用户名" class="my_input" v-model="uname" @blur.prevent="blur_uname">
                <span style="font-size:10px;color:#fff">{{isuname}}</span>
                <input type="password" placeholder="请输入密码" class="my_input" v-model="upwd">
                <mt-button type="default" size="large" @click="submit()">立即注册</mt-button>
                <span style="font-size:12px">已有账号? <span style="text-decoration:underline" @click="gologin()">立即登录</span></span>
                <mt-button style="margin-top:10px;" type="default" size="large" @click="gologin()" v-if="orLogin">立即登录</mt-button>
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
                v_code: "",
                v_code_num: "", //当前动态生成的验证码
                v_code_text: "",
                uname: "",
                upwd: "",
                phone: "",
                isuname: "",
                orLogin: false, //是否显示登录
                res: "", //注册结果
            }
        },
        methods: {
            //返回指定范围随机数
            rn(min, max) {
                var n = parseInt(Math.random() * (max - min) + min);
                return n;
            },
            //返回指定范围颜色
            rc(mix, max) {
                var r = this.rn(mix, max);
                var g = this.rn(mix, max);
                var b = this.rn(mix, max);
                return `rgb(${r},${g},${b})`;
            },
            //生成验证码码
            vify_code() {
                var vify = document.getElementById("vify");
                var ctx = vify.getContext("2d");
                ctx.fillStyle = "#fff";
                ctx.fillRect(0, 0, 320, 100);
                //创建4个字符
                var pool = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz123456789";
                for (var i = 0; i < 4; i++) {
                    var c = pool[this.rn(0, pool.length)];
                    ctx.textBaseline = "top";
                    ctx.font = "100px SimHei";
                    ctx.fillStyle = this.rc(80, 180);
                    ctx.fillText(c, i * 70, 4);
                    // console.log(c)
                    this.v_code_num += c;
                }
                //创建六条干扰线
                for (var i = 0; i < 6; i++) {
                    ctx.beginPath();
                    ctx.strokeStyle = this.rc(0, 255);
                    ctx.moveTo(this.rn(0, 280), this.rn(0, 80));
                    ctx.lineTo(this.rn(0, 280), this.rn(0, 80));
                    ctx.stroke();
                }
                //创建30个干扰点
                for (var i = 0; i < 60; i++) {
                    ctx.beginPath();
                    ctx.fillStyle = this.rc(0, 255);
                    ctx.arc(this.rn(0, 280), this.rn(0, 80), 3, 0, 2 * Math.PI);
                    ctx.fill();
                }

            },
            changeCode() {
                this.v_code_num = [];
                this.vify_code();
            },
            //用户名注册的时候失去焦点事件
            blur_uname() {
                this.$http.get(`users/verify?uname=${this.uname}`).then(res => {
                    this.isuname = res.data;
                    if (this.isuname.code == 1) {
                        this.isuname = "√"
                    } else {
                        this.isuname = "用户名已存在"
                    }
                })
            },
            //注册
            submit() {
                console.log(this.uname)
                this.$axios.post("users/register_phone",
                    Qs.stringify({
                        uname: this.uname,
                        upwd: this.upwd,
                        phone: this.phone,
                    })
                ).then(res => {
                    this.res = res.data;
                    console.log(res.data)
                    if (this.res.code == 1) {
                        this.orLogin = true;
                    } else {
                        this.orLogin = false;
                    }
                    MessageBox({
                        title: "提示",
                        message: res.data.msg,
                    })
                })
            },
            //登录
            gologin() {
                this.$router.push({
                    path: "/home/users/login"
                })
            }
        },
        mounted() {
            this.vify_code()
        },
        watch: {
            v_code() {
                if (this.v_code == this.v_code_num) {
                    this.v_code_text = "√";
                } else {
                    this.v_code_text = "x";
                }
            },
        }
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
        margin-top: 5%;
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
        width: 60%;
    }
</style>