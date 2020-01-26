<template>
  <div>
    <a-drawer
      placement="right"
      :closable="false"
      @close="visible = false"
      :visible="visible"
      width="300px"
    >
      <template #handle>
        <div class="handle" @click="visible = !visible">
          <a-icon :type="visible ? 'close' : 'setting'"></a-icon>
        </div>
      </template>
      <div>
        <h2>整体风格定制</h2>
        <!-- value的值都从路由中取 -->
        <a-radio-group
          @change="e => handleSettingChange('navTheme', e.target.value)"
          :value="$route.query.navTheme || 'dark'"
        >
          <a-radio value="dark">黑色</a-radio>
          <a-radio value="light">白色</a-radio>
        </a-radio-group>
        <h2>导航模式</h2>
        <a-radio-group
          @change="e => handleSettingChange('navLayout', e.target.value)"
          :value="$route.query.navLayout || 'left'"
        >
          <a-radio value="left">左侧</a-radio>
          <a-radio value="top">顶部</a-radio>
        </a-radio-group>
      </div>
    </a-drawer>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        visible: false,
      };
    },
    methods: {
      onChange() {},
      handleSettingChange(type, value) {
        // 将设置同步到路由上，这样发给别人时看到的就和你设置的一样
        this.$router.push({ query: { ...this.$route.query, [type]: value } });
      },
    },
  };
</script>
<style scoped>
  .handle {
    position: absolute;
    top: 240px;
    right: 300px;
    width: 48px;
    height: 48px;
    background-color: #1890ff;
    color: #fff;
    font-size: 20px;
    text-align: center;
    line-height: 48px;
    border-radius: 3px 0 0 3px;
  }
</style>
