<template>
  <div class="store-body">
    <div class="top">
      <div class="left">
        <div class="store-name">{{store.storeName}}</div>
        <div class="tags">
          <van-tag v-if="customer&&!store.serviceSales&&store.stat=='NORMAL'" color="#3CC8B6">待领取</van-tag>
          <van-tag v-if="customer" color="#FF8339">{{store.stat|statFilter}}</van-tag>
          <van-tag v-if="customer" color="#FF8339">{{store.storeLevel}}</van-tag>
          <van-tag v-if="store.status" :color="store.status|statusColorFilter">{{store.status|statusFilter}}</van-tag>
        </div>
      </div>
      <span class="divider"></span>
      <div class="right" @click.capture="phonePop=true">
        <img src="./img/phone.png" alt />
        <div class="name">{{store.contactName}}</div>
      </div>
    </div>
    <div class="bottom" @click="navgationToCustomer(store)">
      <img src="./img/navigation.png" alt />
      <span>{{store.distance}}km{{store.address}}{{store.address2}}</span>
    </div>
    <slot />
    <van-popup v-model="phonePop" round>
      <pop
        confirmTxt="呼叫"
        :title="store.mobile"
        @confirm="callPhone(store.mobile)"
        @cancel="phonePop=false"
      />
    </van-popup>
  </div>
</template>
<script>
import pop from "@/views/my/storeNoPicked/pop";

import dd from "@/mixins/dd";
export default {
  mixins: [dd],
  props: {
    store: {
      type: Object,
      required: true
    },
    customer: {
      type: Boolean,
      default: false
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
    statFilter(val) {
      let stat = {
        EXAMINING: "等待审核",
        NORMAL: "正常",
        CANCEL: "冻结",
        FAILED: "审核未通过",
        REEXAMINING: "等待重新审核"
      };
      return stat[val];
    },
    statusFilter(val) {
      let stat = ["", "已掉落", "已拾取", "即将掉落", "待认领"];
      return stat[Number(val)];
    },
    statusColorFilter(val) {
      let stat = ["", "#A1AAB8", "#FF8239", "#A1AAB8","#3CC8B6"];
      return stat[Number(val)];
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
      this.goTell(phone)
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
  .tags {
    display: flex;
    * {
      margin-right: 10px;
    }
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
