<template>
  <div>
    <a-form layout="horizontal" :form="form">
      <a-form-item
        label="付款账户"
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
      >
        <a-input
          v-decorator="[
            'payAccount',
            {
              initialValue: step.payAccount,
              rules: [
                {
                  required: true,
                  message: '请输入付款账号',
                },
              ],
            },
          ]"
          placeholder="请输入付款账号"
        ></a-input>
      </a-form-item>
      <a-form-item></a-form-item>
      <a-button type="primary" @click="handleSubmit">下一步</a-button>
    </a-form>
  </div>
</template>
<script>
  export default {
    data() {
      this.form = this.$form.createForm(this);

      return {
        // 布局用
        formItemLayout: {
          labelCol: { span: 4 },
          wrapperCol: { span: 14 },
        },
      };
    },
    computed: {
      step() {
        return this.$store.state.form.step; // 获取vuex中的数据
      },
    },
    methods: {
      handleSubmit() {
        const { form, $store, $router } = this;

        form.validateFields((err, values) => {
          if (!err) {
            // 这一步只做同步操作，即把数据融合
            $store.commit('form/saveStepFormData', values);
            // 跳到下一步
            $router.push('confirm');
          }
        });
      },
    },
  };
</script>
<style scoped></style>
