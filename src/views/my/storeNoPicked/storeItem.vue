<template>
  <div class="store-body">
    <div class="top">
      <div class="left">
        <div class="store-name">{{store.name}}</div>
        <img :src="img" alt />
      </div>
      <span class="divider"></span>
      <div class="right" @click.capture="phonePop=true">
        <img src="./img/phone.png" alt />
        <div class="name">{{store.contanct}}</div>
      </div>
    </div>
    <div class="bottom" @click="navgationToCustomer(store)">
      <img src="./img/navigation.png" alt />
      <span>{{store.distance}}km{{store.address}}</span>
    </div>
    <slot />
    <van-popup v-model="phonePop" round>
      <pop
        confirmTxt="呼叫"
        :title="store.phone"
        @confirm="callPhone(store.phone)"
        @cancel="phonePop=false"
      />
    </van-popup>
  </div>
</template>
<script>
import pop from "@/views/my/storeNoPicked/pop";

export default {
  props: {
    store: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      img: require("./img/status" + this.store.status + ".png"),
      phonePop: false
    };
  },
  computed: {},
  components: { pop },
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
    },
    callPhone(phone) {
      let that = this;
      that.$dd.ready(function() {
        that.$dd.biz.telephone.showCallMenu({
          phoneNumber: phone, // 期望拨打的电话号码
          code: "+86", // 国家代号，中国是+86
          showDingCall: true, // 是否显示钉钉电话
          onSuccess: function() {},
          onFail: function() {}
        });
      });
    },
    navgationToCustomer(store) {
      let that = this;
      that.$dd.ready(function() {
        that.$dd.biz.map.view({
          latitude: Number(store.latitude), // 纬度
          longitude: Number(store.longitude), // 经度
          title: store.name // 地址/POI名称
        });
      });
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
    margin-bottom: 10px;
    align-items: center;
    .left {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      flex: 1;
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
    .right {
      margin-left: 14px;
      text-align: center;
      img {
        width: 14px;
        height: 14px;
        margin-bottom: 2px;
      }
      .name {
        height: 17px;
        font-size: 12px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
        line-height: 17px;
      }
    }
  }
  .divider {
    height: 12px;
    width: 1px;
    background-color: #e5e5e5;
  }
  .bottom {
    height: 27px;
    background: rgba(245, 248, 250, 1);
    border-radius: 2px;
    padding: 0 10px;
    display: flex;
    align-items: center;
    img {
      width: 10px;
      height: 10px;
      margin-right: 5px;
    }
    font-size: 12px;
    font-weight: 400;
    color: rgba(161, 170, 184, 1);
    line-height: 17px;
  }
}
</style>
