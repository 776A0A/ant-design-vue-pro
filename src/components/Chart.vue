<template>
  <div ref="chartDom" style="height: 500px;"></div>
</template>
<script>
  import echarts from 'echarts';
  import { addListener, removeListener } from 'resize-detector';
  import debounce from 'lodash/debounce';

  export default {
    created() {
      this.resize = debounce(this.resize, 300); // 防抖
    },
    mounted() {
      // 在初始化时会计算宽度等信息，但此时容器等其他 dom 可能还未渲染完成
      // 那么就可能出现计算宽度错误等 bug，比如可能会超出视图
      this.chart = echarts.init(this.$refs.chartDom);
      // 所以要监听 dom 的 resize事件
      addListener(this.$refs.chartDom, this.resize);
      // 绘制图表
      this.chart.setOption({
        title: {
          text: 'ECharts 入门示例',
        },
        tooltip: {},
        xAxis: {
          data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子'],
        },
        yAxis: {},
        series: [
          {
            name: '销量',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20],
          },
        ],
      });
    },
    beforeDestroy() {
      removeListener(this.$refs.chartDom, this.resize); // 取消监听
      this.chart.dispose(); // 将 echats 实例销毁避免内存泄漏
      this.chart = null;
    },
    methods: {
      resize() {
        this.chart.resize();
      },
    },
  };
</script>
<style scoped></style>
