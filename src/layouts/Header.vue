<template>
  <div class="header">
    <a-dropdown>
      <a-icon type="global" />
      <!-- selectedKeys默认的选中值 -->
      <a-menu
        slot="overlay"
        @click="localeChange"
        :selectedKeys="[$route.query.locale || 'zhCN']"
      >
        <!-- 在此设置key是为了在方法中拿到 -->
        <a-menu-item key="zhCN">中文</a-menu-item>
        <a-menu-item key="enUS">English</a-menu-item>
      </a-menu>
    </a-dropdown>
  </div>
</template>
<script>
  export default {
    name: 'Header',
    methods: {
      // 向localChange方法里默认传入的对象含有子组件中的key值
      localeChange({ key }) {
        const currentKey = this.$route.query.locale || 'zhCN';
        if (currentKey === key) return;

        // push里面只有query就只会更新query值
        this.$router.push({ query: { ...this.$route.query, locale: key } });
      },
    },
  };
</script>
<style scoped>
  .header {
    float: right;
    margin-right: 30px;
  }
</style>
