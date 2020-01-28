<template>
  <div>
    <a-form layout="horizontal" :form="form">
      <a-form-item
        label="付款账户"
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
      >
        {{ step.payAccount }}
      </a-form-item>

      <a-form-item
        label="密码"
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
      >
        <a-input
          v-decorator="[
            'password',
            {
              initialValue: '',
              rules: [
                {
                  required: true,
                  message: '请输入付款密码',
                },
              ],
            },
          ]"
          type="password"
          placeholder="请输入付款密码"
        ></a-input>
      </a-form-item>
      <a-form-item></a-form-item>
      <a-button type="primary" @click="handleSubmit">提交</a-button>
      <a-button style="margin-left:8px;" @click="onPrev">上一步</a-button>
    </a-form>
  </div>
</template>
<script>
  export default {
    data() {
      this.form = this.$form.createForm(this);
      return {
        formItemLayout: {
          labelCol: { span: 4 },
          wrapperCol: { span: 14 },
        },
      };
    },
    computed: {
      step() {
        return this.$store.state.form.step;
      },
    },
    methods: {
      handleSubmit() {
        // 这里的step是computed中的step
        const { form, $store, step } = this;
        form.validateFields((err, values) => {
          if (!err) {
            // 注意在提交之前要合并数据
            $store.dispatch('form/submitStepForm', { ...step, ...values });
          }
        });
      },
      onPrev() {
        this.$router.back();
      },
    },
  };
</script>
<style scoped></style>
