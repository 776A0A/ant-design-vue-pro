import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
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
} from 'ant-design-vue';

import Authorized from './components/Authorized';

import Auth from './directives/auth';

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

Vue.component('Authorized', Authorized);

Vue.use(Auth);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
