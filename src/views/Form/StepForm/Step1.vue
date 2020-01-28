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
      <a-form-item
        label="收款账户"
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
      >
        <ReceiverAccount
          v-decorator="[
            'receiverAccount',
            {
              initialValue: step.receiverAccount,
              rules: [
                {
                  required: true,
                  message: '请输入收款账号',
                  // 自定义校验规则，因为这里传入的是一个对象，正常方法无法监听到变化
                  // 如果传入的是基本类型值就不需要
                  validator: (rule, value, callback) => {
                    if (value && value.number) {
                      // 必须要输入账号
                      callback();
                    } else {
                      callback(false); // 否则校验不通过
                    }
                  },
                },
              ],
            },
          ]"
        />
      </a-form-item>
      <a-button type="primary" @click="handleSubmit">下一步</a-button>
    </a-form>
  </div>
</template>
<script>
  import ReceiverAccount from '@/components/ReceiverAccount';

  export default {
    components: { ReceiverAccount },
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
