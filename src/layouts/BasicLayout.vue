<template>
  <div :class="[`nav-theme-${navTheme}`, `nav-layout-${navLayout}`]">
    <a-layout id="components-layout-demo-side" style="min-height:100vh">
      <a-layout-sider
        :trigger="null"
        collapsible
        v-model="collapsed"
        :theme="navTheme"
        v-if="navLayout === 'left'"
        width="256px"
      >
        <div class="logo">
          Ant Design Vue Pro
        </div>
        <SiderMenu :theme="navTheme" />
      </a-layout-sider>
      <a-layout>
        <a-layout-header style="background: #fff; padding: 0">
          <a-icon
            v-auth="['admin']"
            class="trigger"
            :type="collapsed ? 'menu-unfold' : 'menu-fold'"
            @click="() => (collapsed = !collapsed)"
          />
          <Header />
        </a-layout-header>
        <a-layout-content style="margin: 0 16px">
          <router-view />
        </a-layout-content>
        <a-layout-footer style="text-align: center">
          <Footer />
        </a-layout-footer>
      </a-layout>
    </a-layout>
    <!-- 只有 admin 才能设置主题样式 -->
    <Authorized :authority="['admin']">
      <SettingDrawer />
    </Authorized>

    <!-- 因为抽屉组件的定位问题，直接使用 v-auth 会有问题 -->
    <!-- 如果一定要使用，那么需要 v-auth 指令内代码的配合 -->
    <!-- <SettingDrawer v-auth="['admin']" /> -->
  </div>
</template>
<script>
  import Header from './Header';
  import Footer from './Footer';
  import SiderMenu from './SiderMenu';
  import SettingDrawer from '../components/SettingDrawer';
  export default {
    name: 'BasicLayout',
    components: {
      Header,
      Footer,
      SiderMenu,
      SettingDrawer,
    },
    data() {
      return {
        collapsed: false, // 控制左侧菜单收缩
      };
    },
    computed: {
      navTheme() {
        return this.$route.query.navTheme || 'dark';
      },
      navLayout() {
        return this.$route.query.navLayout || 'left';
      },
    },
  };
</script>
<style scoped>
  .trigger {
    padding: 0 20px;
    line-height: 64px;
    font-size: 20px;
  }
  .trigger:hover {
    background-color: #eee;
  }
  .logo {
    height: 64px;
    line-height: 64px;
    text-align: center;
    overflow: hidden;
  }
  /* 深度选择器，检索vue样式穿透 */
  .nav-theme-dark >>> .logo {
    color: #fff;
  }
</style>
