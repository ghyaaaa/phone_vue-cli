<template>
    <div>
        <h1>这是天气页面</h1>
        <div id="myChart" :style="{width:'100%',height:'500px'}"></div>
    </div>
</template>
<script>
    // 引入基本模板
    import IEcharts from 'vue-echarts-v3/src/lite.js';
    let echarts = require('echarts/lib/echarts')
    // 引入柱状图
    require('echarts/lib/chart/bar')
    require('echarts/lib/chart/line')
    // 引入提示框和title组件
    require('echarts/lib/component/tooltip')
    require('echarts/lib/component/title')
    // 引入工具
    require('echarts/lib/component/toolbox')
    export default {

        name: 'hello',
        data() {
            return {
                msg: '这是vue中的echarts的demo'
            }
        },
        mounted() {
            this.drawLine()
        },
        methods: {
            drawLine() {
                // 基于准备好的dom，初始化echarts实例
                let myChart = echarts.init(document.getElementById('myChart'))
                // 绘制图表
                myChart.setOption({
                    title: {
                        text: '在Vue中使用echarts'
                    },
                    tooltip: { //提示框组件
                        trigger: 'axis', //触发类型,可选:'axis',坐标轴触发,主要在柱状图,折线图等会使用类目轴的图表中使用.
                        //'item',数据项目形触发,主要在散点图,饼图等无类目的图表中使用.'none',什么都不会触发
                    },
                    toolbox: { //工具栏,内置有导出图片,数据视图,冬天类型切换,数据区域说法,重置等5个工具
                        feature: { //各工具配置项
                            dataView: { //数据视图工具,可以展现当前图表所用的数据,编辑后可以动态更新
                                show: true,
                                readOnly: false
                            },
                            magicType: { //动态类型切换
                                show: true,
                                type: ['line', 'bar']
                            },
                            restore: { //配置项还原,点击就可还原
                                show: false
                            },
                            saveAsImage: { //保存为图片
                                show: true
                            },
                        }
                    },
                    grid: { //直角坐标系内绘图网格
                        show: true,
                        containLabel: true
                    },
                    xAxis: {
                        type: 'category',
                        name: '服装类',
                        data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
                    },
                    yAxis: {
                        type: 'value',
                        name: '销量',

                    },
                    series: [{
                        name: '销量',
                        type: 'line',
                        data: [5, 20, 36, 10, 10, 20]
                    }]
                });
            },
            drawLine1() {
                // 基于准备好的dom，初始化echarts实例
                let myChart = echarts.init(document.getElementById('myChart'))
                // 绘制图表
                myChart.setOption({
                    title: {
                        text: 'ECharts 入门示例'
                    },
                    tooltip: {},
                    xAxis: {
                        data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
                    },
                    yAxis: {},
                    series: [{
                        name: '销量',
                        type: 'bar',
                        data: [5, 20, 36, 10, 10, 20]
                    }]
                });
            }
        }
    }
</script>
<style scoped>

</style>