import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

// eslint-disable-next-line no-unused-vars
import qs from 'query-string'; // 用于解析url的库

// 国际化插件
import VueI18n from 'vue-i18n';
// 导入语言包
import zhCN from './locale/zhCN';
import enUS from './locale/enUS';

Vue.use(VueI18n);

const i18n = new VueI18n({
  // qs.parse()会将传入的字符串解析为一个对象返回
  // locale: qs.parse(location.search).locale || 'zhCN',
  locale: new URLSearchParams(location.search).get('locale') || 'zhCN',

  // 配置语言包，会根据locale的值进行切换
  messages: {
    zhCN: { message: zhCN },
    enUS: { message: enUS },
  },
});

import {
  Button,
  Layout,
  Icon,
  Drawer,
  Radio,
  Menu,
  Form,
  Input,
  Select,
  LocaleProvider,
  Dropdown,
  DatePicker,
} from 'ant-design-vue';

// import 'ant-design-vue/dist/antd.less';

Vue.use(Button);
Vue.use(Layout);
Vue.use(Icon);
Vue.use(Drawer);
Vue.use(Radio);
Vue.use(Menu);
Vue.use(Form);
Vue.use(Input);
Vue.use(Select);
Vue.use(LocaleProvider);
Vue.use(Dropdown);
Vue.use(DatePicker);

// 两种方式校验权限
import Authorized from './components/Authorized';
import Auth from './directives/auth';

Vue.component('Authorized', Authorized);
Vue.use(Auth);

Vue.config.productionTip = false;

new Vue({
  i18n, // 注入
  router,
  store,
  render: h => h(App),
}).$mount('#app');
