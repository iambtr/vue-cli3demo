<template>
  <div class="store-body">
    <div class="top">
      <div class="left">
        <div class="store-name">{{store.name}}</div>
        <img :src="img" alt />
      </div>
      <span class="divider"></span>
      <div class="right">
        <img src="./img/phone.png" alt />
        <div class>{{store.contanct}}</div>
      </div>
    </div>
    <div>
      <img src="./img/navigation.png" alt />
      <span>{{store.distance}}km{{store.address}}</span>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    store: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      img: require("./img/status" + this.store.status + ".png")
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
.store-body {
  background-color: #fff;
  padding: 15px;
  margin-bottom: 10px;
  .top {
    display: flex;
    justify-content: space-between;
    .left {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      .store-name {
        height: 20px;
        font-size: 14px;
        font-family: PingFangSC-Medium;
        font-weight: bolder;
        color: rgba(51, 51, 51, 1);
        line-height: 20px;
        margin-bottom: 5px;
      }
      // .tag {
      //   width: 34px;
      // }
    }
    .right{
      img{
        width: 14px;
        height: 14px;
      }
    }
  }
}
</style>
