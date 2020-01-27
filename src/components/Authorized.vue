<script>
  import { check } from '../utils/auth';
  export default {
    functional: true,
    props: {
      authority: {
        type: Array,
        required: true,
      },
    },
    render: (h, context) => {
      const { props, scopedSlots } = context;
      // 只有在通过了权限验证才有插槽
      return check(props.authority) ? scopedSlots.default() : null;
      // 使用方法：
      /**
       * <Authorized :authority="['admin']">
       *   <SettingDrawer />
       * </Authorized>
       */
    },
  };
</script>
