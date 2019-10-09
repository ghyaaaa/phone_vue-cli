<template>
  <div class="app_subcomp_swipt">
    <mt-swipe :auto="3000">
      <mt-swipe-item v-for="(item,i) in list" :key="item.id">
        <img :src="item.img_url" alt="">
      </mt-swipe-item>
    </mt-swipe>
  </div>
</template>
<script>
import {Toast} from "mint-ui";
export default {
  data() {
    return {}
  },
  props:["list"],//要父元素的数据
  methods: {},
  created() {}
};
</script>
<style scoped>
.app_subcomp_swipt .mint-swipe {
  height: 160px;
}
.app_subcomp_swipt .mint-swipe .mint-swipe.item{
  text-align: center;
}
.app_subcomp_swipt .mint-swipe img {
  width: 100%;
  
}
</style>

