<template>
  <div id="app">
    <a-locale-provider :locale="locale">
      <router-view />
    </a-locale-provider>
  </div>
</template>

<script>
  // 导入国际化语言包
  import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN';
  import enUS from 'ant-design-vue/lib/locale-provider/en_US';

  // antd 的一些组件依赖了moment库，而moment内部也是有国际化设置功能的，所以在此引入
  import moment from 'moment';
  import 'moment/locale/zh-cn'; // 引入中文包，英文包是默认的，不需要引入

  export default {
    data() {
      return {
        locale: zhCN,
      };
    },
    watch: {
      '$route.query.locale'(val) {
        this.locale = val === 'enUS' ? enUS : zhCN;
        moment.locale(val === 'enUS' ? 'en' : 'zh-cn');
      },
    },
  };
</script>

<style lang="less"></style>
