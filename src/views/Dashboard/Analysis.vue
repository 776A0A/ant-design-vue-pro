<template>
  <div>
    <Chart :option="chartOption" style="height: 400px;" />
  </div>
</template>
<script>
  import Chart from '../../components/Chart';
  import random from 'lodash/random';

  export default {
    name: 'Analysis',
    components: { Chart },
    data() {
      return {
        chartOption: {
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
        },
      };
    },
    mounted() {
      // 改变传入的数据，用来测试数据改变后视图的变化
      this.setInterval = setInterval(() => {
        this.chartOption.series[0].data = this.chartOption.series[0].data.map(
          () => random(100),
        );
        // 通过将变化后的数据解构为一个新的对象即可达到更新整个 chartOption 的目的
        // 这样可以避免在 watch 中使用深度监听，提高性能
        this.chartOption = { ...this.chartOption };
      }, 2000);
    },
    beforeDestroy() {
      clearInterval(this.setInterval);
    },
  };
</script>
<style scoped></style>
