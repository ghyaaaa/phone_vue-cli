<template>
  <div>
    <div class="mui-content-padded">

      <p>页面正在加紧开发中....敬请期待</p>
      <p>
        <img src="../../img/success06.jpg" />
      </p>
      <mt-button type="default" size="large" @click="goindex()">点击返回首页</mt-button>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {}

    },
    methods: {
      goindex(){
        this.$router.push("/home/index")
      }
    },
  }
</script>
<style scoped>
.mui-content-padded img{
  width:100%;
}
</style>
