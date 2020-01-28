<template>
  <div>
    <a-form :layout="formLayout" :form="form">
      <a-form-item
        label="Form Layout"
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
      >
        <a-radio-group
          default-value="horizontal"
          @change="handleFormLayoutChange"
        >
          <a-radio-button value="horizontal">
            Horizontal
          </a-radio-button>
          <a-radio-button value="vertical">
            Vertical
          </a-radio-button>
          <a-radio-button value="inline">
            Inline
          </a-radio-button>
        </a-radio-group>
      </a-form-item>
      <a-form-item
        label="Field A"
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
      >
        <!-- v-decorator仅仅是一个标志位，当form初始化时 -->
        <!-- 会在子组件中寻找，然后将找到的v-decorator的值挂载到form内部的方法中，然后进行控制 -->
        <!-- 这里的initialValue只会在组件实例化时生效一次，如果需要改变，那么就要使用setFieldsValue方法 -->
        <a-input
          v-decorator="[
            'fieldA',
            {
              initialValue: fieldA,
              rules: [
                {
                  required: true,
                  min: 6,
                  message: '必须大于5个字符',
                },
              ],
            },
          ]"
          placeholder="input placeholder"
        />
      </a-form-item>
      <a-form-item
        label="Field B"
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
      >
        <a-input v-decorator="['fieldB']" placeholder="input placeholder" />
      </a-form-item>
      <a-form-item :wrapper-col="buttonItemLayout.wrapperCol">
        <a-button type="primary" @click="handleSubmit">
          Submit
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
  export default {
    data() {
      // this.$form是在main.js中Vue.use(Form)时挂载到Vue实例的
      this.form = this.$form.createForm(this);
      return {
        formLayout: 'horizontal',
        fieldA: 'hello',
        fieldB: '',
      };
    },
    mounted() {
      // 当表单的数据是通过后台获取的，那么可以使用此方法初始化值
      setTimeout(() => {
        this.form.setFieldsValue({ fieldA: 'hello world' });
      }, 3000);
    },
    computed: {
      formItemLayout() {
        const { formLayout } = this;
        return formLayout === 'horizontal'
          ? {
              labelCol: { span: 4 },
              wrapperCol: { span: 14 },
            }
          : {};
      },
      buttonItemLayout() {
        const { formLayout } = this;
        return formLayout === 'horizontal'
          ? {
              wrapperCol: { span: 14, offset: 4 },
            }
          : {};
      },
    },
    methods: {
      handleFormLayoutChange(e) {
        this.formLayout = e.target.value;
      },
      handleSubmit() {
        this.form.validateFields((err, values) => {
          if (!err) {
            console.log(values);
            // 成功后直接将值赋值给Vue实例，那么就相当于同步到了this.fieldA和this.fieldB
            // 当表单数据特别多时，这么做就很简便了
            Object.assign(this, values);
          }
        });
        // if (this.fieldA.lenght <= 5) {
        //   this.fieldAStatus = 'error';
        //   this.fieldAHelp = '必须大于5个字符';
        // } else {
        //   console.log({
        //     fieldA: this.fieldA,
        //     fieldB: this.fieldB,
        //   });
        // }
      },
    },
  };
</script>
