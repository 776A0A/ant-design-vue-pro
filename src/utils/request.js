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
        message: status,
        description: statusText,
      });

      // 返回一个reject的好处是，这样就不会跳到后续处理的then逻辑里面去
      return Promise.reject(err);
    });
}

export default request;
