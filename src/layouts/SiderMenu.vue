<template>
  <div style="width: 256px">
    <!-- 这里的selectedKes和openKeys是和子组件上的key值相对应的 -->
    <a-menu
      :selectedKeys="selectedKeys"
      :openKeys.sync="openKeys"
      mode="inline"
      :theme="theme"
    >
      <template v-for="item in menuData">
        <a-menu-item
          v-if="!item.children"
          :key="item.path"
          @click="$router.push({ path: item.path, query: $route.query })"
        >
          <a-icon v-if="item.meta.icon" :type="item.meta.icon" />
          <span>{{ item.meta.title }}</span>
        </a-menu-item>
        <sub-menu v-else :menu-info="item" :key="item.path" />
      </template>
    </a-menu>
  </div>
</template>

<script>
  /*
   * recommend SubMenu.vue https://github.com/vueComponent/ant-design-vue/blob/master/components/menu/demo/SubMenu.vue
   * SubMenu1.vue https://github.com/vueComponent/ant-design-vue/blob/master/components/menu/demo/SubMenu1.vue
   * */
  import SubMenu from './SubMenu';

  import { check } from '../utils/auth';

  export default {
    props: {
      theme: {
        type: String,
        default: 'dark',
      },
    },
    components: {
      'sub-menu': SubMenu,
    },
    watch: {
      '$route.path'(val) {
        this.selectedKeys = this.selectedKeysMap[val];
        this.openKeys = this.collapsed ? [] : this.openKeysMap[val];
      },
    },
    data() {
      this.selectedKeysMap = {};
      this.openKeysMap = {};

      const menuData = this.getMenuData(this.$router.options.routes);
      return {
        collapsed: false,
        menuData,
        selectedKeys: this.selectedKeysMap[this.$route.path],
        openKeys: this.collapsed ? [] : this.openKeysMap[this.$route.path],
      };
    },
    methods: {
      // 通过路由来生成菜单信息
      getMenuData(routes = [], parentKeys = [], selectedKey) {
        const menuData = [];

        for (const item of routes) {
          if (item.meta && item.meta.authority && !check(item.meta.authority)) {
            // 如果当前的权限没有达到要求，则不会在菜单中渲染出该菜单项
            continue;
          }

          if (item.name && !item.hideInMenu) {
            this.openKeysMap[item.path] = parentKeys;

            this.selectedKeysMap[item.path] = [selectedKey || item.path];

            const newItem = { ...item };
            delete newItem.children;

            if (item.children && !item.hideChildrenInMenu) {
              newItem.children = this.getMenuData(item.children, [
                ...parentKeys,
                item.path,
              ]);
            } else {
              this.getMenuData(
                item.children,
                selectedKey ? parentKeys : [...parentKeys, item.path],
                selectedKey || item.path,
              );
            }

            menuData.push(newItem);
          } else if (
            !item.hideInMenu &&
            !item.hideChildrenInMenu &&
            item.children
          ) {
            menuData.push(
              ...this.getMenuData(item.children, [...parentKeys, item.path]),
            );
          }
        }

        // console.log(this.selectedKeysMap, this.openKeysMap);
        return menuData;
      },
    },
  };
</script>
