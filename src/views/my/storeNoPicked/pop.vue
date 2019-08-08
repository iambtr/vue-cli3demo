<template>
  <div class="pop-body">
    <div class="title">{{title}}</div>
    <div class="content">
      <slot />
    </div>
    <div class="btn">
      <van-button class="van-btn" :type="cancelType" v-if="!hideCancel" @click="$emit('cancel')">{{cancelTxt}}</van-button>
      <van-button class="van-btn" :type="confirmType"  @click="$emit('confirm')">{{confirmTxt}}</van-button>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: "提示"
    },
    cancelTxt: {
      type: String,
      default: "取消"
    },
    confirmTxt: {
      type: String,
      default: "确认"
    },
    cancelType: {
      type: String,
      default: "default"
    },
    confirmType: {
      type: String,
      default: "primary"
    },
    hideCancel: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      popShow: this.show
    };
  },
  computed: {},
  filters: {
    badgeFilter(val) {
      return val > 99 ? 99 : val;
    }
  },
  methods: {
    onClickLeft() {
      this.$router.back();
    },
    onClickRight() {
      this.$toast("菜单");
    }
  },
  created() {}
};
</script>

<style scoped lang="less">
.pop-body {
  width: 305px;
  .title {
    padding: 25px 0;
    text-align: center;
    font-size: 18px;
    font-weight: bolder;
    color: rgba(0, 0, 0, 0.8);
    line-height: 25px;
  }
  .btn {
    display: flex;
    .van-btn {
      flex: 1;
    }
  }
}
</style>
