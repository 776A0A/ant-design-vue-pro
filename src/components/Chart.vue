<template>
  <!-- style 属性也是从父组件传入的 -->
  <!-- 但是 style 和 class 的特殊性在于直接写在父组件中就会默认的挂载到子组件的根节点上 -->
  <!-- 所以就不需要在此用 props 来接收 -->
  <div ref="chartDom"></div>
</template>
<script>
  import echarts from 'echarts/lib/echarts'; // 引入echarts的核心包
  import 'echarts/lib/chart/bar'; // 单独只引入柱状图
  import 'echarts/lib/component/title';

  import { addListener, removeListener } from 'resize-detector';
  import debounce from 'lodash/debounce';

  export default {
    props: {
      option: {
        type: Object,
        default: () => {},
      },
    },
    watch: {
      // 监听传入 option 的值变化用以更新视图
      option(val) {
        this.chart.setOption(val);
      },
      // 深度监听较为耗性能
      // option: {
      //   deep: true,
      //   handler(val) {
      //     this.chart.setOption(val);
      //   },
      // },
    },
    created() {
      this.resize = debounce(this.resize, 300); // 防抖
    },
    mounted() {
      this.renderChart();

      /**
       * 在初始化时会计算宽度等信息，但此时容器等其他 dom 可能还未渲染完成
       * 那么就可能出现计算宽度错误等 bug，比如可能会超出视图
       * 所以要监听 dom 的 resize事件
       */
      addListener(this.$refs.chartDom, this.resize);
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
      renderChart() {
        this.chart = echarts.init(this.$refs.chartDom); // 初始化实例
        this.chart.setOption(this.option); // 绘制图表
      },
    },
  };
</script>
<style scoped></style>
