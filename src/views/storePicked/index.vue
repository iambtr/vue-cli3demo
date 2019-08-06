<template>
  <div class="body">
    <van-nav-bar
      title="已拾取"
      fixed
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />
    
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  filters: {
    badgeFilter(val) {
      return val > 99 ? 99 : val;
    }
  },
  methods: {
    onClickLeft() {
      this.$router.back()
    },
    onClickRight() {
      Toast("按钮");
    }
  },
  created() {}
};
</script>

<style scoped lang="less">
</style>
