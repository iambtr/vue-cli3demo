<template>
  <div class="body">
    <van-nav-bar
      title="即将掉落"
      fixed
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />
    <div class="store-list">
      <store-item v-for="store in storeList" :store="store" :key="store.id"></store-item>
    </div>
  </div>
</template>
<script>
import storeItem from "../storeNoPicked/storeItem";
export default {
  data() {
    return {
      storeList: [
        {
          storeId: 1,
          address: "杭州市拱墅区三墩路85号",
          address1: "",
          address2: "",
          area: "",
          city: "",
          contact: "",
          contractSales: "",
          couponTotal: 4,
          customerPrice: 1000.11,
          distance: "13.3",
          distributionPlan: "",
          doorPhoto: "",
          failMsg: "",
          isDelete: "",
          keyId: "",
          lastOrderTime: "",
          lastVisitTime: "",
          latiLongi: "",
          licensePhoto: "",
          mobile: "400-2323-323",
          oprDt: "",
          oprId: "",
          orderTotal: "",
          province: "",
          receiverMobile: "",
          receiverName: "",
          reexaminingTime: "",
          serviceSales: "",
          stat: "EXAMINING",
          storeLevel: "A",
          storeName: "鲜康水果店-09087208",
          todayTotal: 3000.5,
          updDt: "",
          updId: "",
          whCode: "",
          contanctName: "张丽丽",
          status: "3", //1 已掉落 2 已拾取 3即将掉落
          // amount: 3000.5,
          // customerPrice: 1000.11,
          frequency: 5, //缺失
          sku: 6 //缺失
          // coupon: 4,
          // check: true
        }
      ]
    };
  },
  filters: {
    badgeFilter(val) {
      return val > 99 ? 99 : val;
    }
  },
  components: { storeItem },

  methods: {
    onClickRight() {
      Toast("按钮");
    },
    changeItem(item, inx) {
      let newNavs = this.navs.map(elt => {
        elt.active = false;
        return elt;
      });
      newNavs[inx] = Object.assign({}, item, { active: true });
      this.navs = newNavs;
    }
  },
  created() {
    console.log('certeate================biu')
  }
};
</script>

<style scoped lang="less">
.body {
  padding: 56px 10px 0 10px;
  overflow: hidden;
  .tab-store {
    display: flex;
    justify-content: space-between;
    background-color: #fff;
    margin: 10px 0;
    height: 40px;
    font-size: 12px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(27, 27, 29, 1);
    line-height: 40px;
    .tab-item {
      flex: 1;
      text-align: center;
    }
    .active {
      color: #ff8239;
    }
  }
}
</style>
