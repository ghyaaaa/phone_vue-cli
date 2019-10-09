<template>
  <div>
    <div class="mui-card">
      <div class="mui-card-header mui-card-media">
        <img src="../../img/qy.jpg" />
        <div class="mui-media-body">
          小穷游君
          <p>关于我们</p>

        </div>
        <!--<img class="mui-pull-left" src="../images/logo.png" width="34px" height="34px" />

					<h2>小M</h2>

					<p>发表于 2016-06-30 15:30</p>-->
      </div>
      <div class="mui-card-content">
        <img src="../../img/yuantiao.jpg" alt="" width="100%" />
      </div>
    </div>
    <div id="container"></div>
  </div>
</template>
<script>
  export default {
    data() {
      return {}
    },
    created() {
      
    },
    mounted() {
      var map = new BMap.Map("container"); // 创建地图实例  
      var point = new BMap.Point(104.072331,30.668); // 创建点坐标  
      map.centerAndZoom(point, 16); // 初始化地图，设置中心点坐标和地图级别  
      map.addControl(new BMap.NavigationControl());
      map.addControl(new BMap.ScaleControl());
      map.addControl(new BMap.OverviewMapControl());
      map.addControl(new BMap.MapTypeControl());
      map.setCurrentCity("成都"); // 仅当设置城市信息时，MapTypeControl的切换功能才能可用   
      // var mapStyle={  style : "midnight" }  
      //  map.setMapStyle(mapStyle);
    },
  }
</script>
<style scoped>
  html {
    height: 100%
  }

  body {
    height: 100%;
    margin: 0px;
    padding: 0px
  }

  #container {
    height: 500px;
    width: 100%;
  }
</style>