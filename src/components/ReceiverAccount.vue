// 将整个组件视为一个input标签，这样比较好理解

<template>
  <!-- 关于自己封装组件并且想要配form自动校验的方式：
  https://www.antdv.com/components/form-cn/#components-form-demo-customized-form-controls -->
  <a-input-group compact>
    <a-select v-model="type" style="width: 130px;" @change="handleTypeChange">
      <a-select-option value="alipay">支付宝</a-select-option>
      <a-select-option value="bank">银行账号</a-select-option>
    </a-select>
    <a-input
      style="width: calc(100% - 130px);"
      v-model="number"
      @change="handleNumberChange($event)"
    />
  </a-input-group>
</template>
<script>
  export default {
    props: {
      // 事实上，父组件中的initialValue会转换为value传入
      value: {
        type: Object,
      },
    },
    // 暂时不懂为什么要加这个watch，注释掉好像也没为问题
    // IM 好像是多余的
    // 因为v-model已经改变了组件内的值，而change事件也传出了改变后的值，所以应该是父子组件中的值都改变了
    // watch: {
    //   value(val) {
    //     Object.assign(this, val);
    //   },
    // },
    data() {
      const { type, number } = this.value || {};
      return {
        type: type || 'alipay',
        number: number || '',
      };
    },
    methods: {
      handleTypeChange(type) {
        // 规定了要使用change触发事件并传出值
        this.$emit('change', { ...this.value, type });
      },
      handleNumberChange(e) {
        this.$emit('change', { ...this.value, number: e.target.value });
      },
    },
  };
</script>
