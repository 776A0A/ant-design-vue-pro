import router from '../../router';
import request from '../../utils/request';

const state = {
  step: {
    payAccount: '123456',
  },
};

const actions = {
  async submitStepForm({ commit }, payload) {
    // 等待请求后台成功
    await request({
      url: '/api/form',
      method: 'POST',
      data: payload,
    });

    // 然后commit同步本地数据
    commit('saveStepFormData', payload);

    router.push('result');
  },
};

const mutations = {
  saveStepFormData(state, payload) {
    // 合并数据
    state.step = {
      ...state.step,
      ...payload,
    };
  },
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
};
