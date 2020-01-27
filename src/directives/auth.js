import { check } from '../utils/auth';

// 指令式的权限控制有个弊端，就是只有在第一次渲染的时候才会有效
// 如果权限是动态更改的，那么将不会再进入 inserted 回调中
function install(Vue, options = {}) {
  Vue.directive(options.name || 'auth', {
    inserted(el, { value }) {
      if (!check(value)) {
        el.remove(); // 如果未通过则移除元素

        // 如果一定要通过指令式控制抽屉的显示则要加上下面这行
        // setTimeout(() => document.body.lastElementChild.remove());
      }
    },
  });
}

export default { install };
