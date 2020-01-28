import axios from 'axios';
import { notification } from 'ant-design-vue';

// 二次封装，对错误进行一个集中处理
function request(options) {
  return axios(options)
    .then(res => res)
    .catch(err => {
      const {
        response: { status, statusText },
      } = err;

      notification.error({
        // 使用函数式的方式返回VNode，以此来个性化显示错误信息
        // 语法及配置参考 https://github.com/vuejs/jsx
        // eslint-disable-next-line no-unused-vars
        message: h => (
          <div>
            请求错误码：<span style="color: red;">{status}</span>：{options.url}
          </div>
        ),
        description: statusText,
      });

      // 返回一个reject的好处是，这样就不会跳到后续处理的then逻辑里面去
      return Promise.reject(err);
    });
}

export default request;
