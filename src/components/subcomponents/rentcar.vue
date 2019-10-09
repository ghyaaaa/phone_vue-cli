<template>
    <div>
        <h1>这是租车页面</h1>
        <div class="echarts">
            <IEcharts :option="bar" :loading="loading" @ready="onReady" @click="onClick"></IEcharts>
            <button @click="doRandom">Random</button>
        </div>
    </div>
</template>
<script>
  import IEcharts from 'vue-echarts-v3/src/full.js';
  export default {
    name: 'view',
    components: {
      IEcharts
    },
    props: {
    },
    data: () => ({
      loading: true,
      bar: {
        title: {
          text: 'ECharts Hello World'
        },
        tooltip: {},
        xAxis: {
          data: ['Shirt', 'Sweater', 'Chiffon Shirt', 'Pants', 'High Heels', 'Socks']
        },
        yAxis: {},
        series: [{
          name: 'Sales',
          type: 'line',
          data: [5, 20, 36, 10, 10, 20]
        }]
      },
     
    }),
    methods: {
      doRandom() {
        const that = this;
        let data = [];
        for (let i = 0, min = 5, max = 99; i < 6; i++) {
          data.push(Math.floor(Math.random() * (max + 1 - min) + min));
        }
        that.loading = !that.loading;
        that.bar.series[0].data = data;
      },
      onReady(instance) {
        console.log(instance);
      },
      onClick(event, instance, echarts) {
        console.log(arguments);
      }
    }
  };
</script>

<style scoped>
  .echarts {
    width: 400px;
    height: 400px;
  }
</style>