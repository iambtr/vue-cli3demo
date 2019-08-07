<template>
  <div class="store-info">
    <div class="top">
      <div class="store-name">店铺基本信息</div>
    </div>
    <div class="item-body">
      <div class="info-item">
        <div class="info-value">{{store.amount}}</div>
        <div class="info-name">今日下单(元)</div>
      </div>
      <div class="divider"></div>
      <div class="info-item">
        <div class="info-value">{{store.customerPrice}}</div>
        <div class="info-name">客单价(元)</div>
      </div>
      <div class="divider"></div>
      <div class="info-item">
        <div class="info-value">{{store.frequency}}</div>
        <div class="info-name">近30天频次</div>
      </div>
      <div class="info-item">
        <div class="info-value">{{store.sku}}</div>
        <div class="info-name">近30天均SKU</div>
      </div>
      <div class="divider"></div>
      <div class="info-item">
        <div class="info-value">{{store.coupon}}</div>
        <div class="info-name">优惠券</div>
      </div>
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
    return {};
  },
  computed: {},
  filters: {},
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
.store-info {
  background-color: #fff;
  padding: 15px 0;
  .store-name {
    margin-bottom: 15px;
    height: 17px;
    font-size: 12px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(102, 102, 102, 1);
    line-height: 17px;
  }
  .item-body {
    text-align: center;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    .divider {
      width: 1px;
      height: 14px;
      background-color: #c1c1c1;
      margin-bottom: 15px;
    }
    .info-item {
      width: 33.1%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      margin-bottom: 15px;
      .info-name {
        font-size: 12px;
        font-weight: 400;
        color: rgba(193, 193, 193, 1);
        line-height: 17px;
      }
      .info-value {
        font-size: 14px;
        font-weight: bold;
        color: rgba(51, 51, 51, 1);
        line-height: 20px;
      }
    }
  }
}
</style>
