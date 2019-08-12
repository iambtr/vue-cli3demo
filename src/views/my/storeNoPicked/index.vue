<template>
  <div class="body">
    <van-nav-bar
      title="已掉落"
      fixed
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />
    <div class="tab-store">
      <div
        v-for="(item,inx) in navs"
        :key="item.name"
        class="tab-item"
        :class="{'active':item.active}"
        @click="changeItem(item,inx)"
      >{{item.name}}</div>
    </div>
    <div class="store-list">
      <van-list
        v-model="loading"
        :finished="finished"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
        finished-text="没有更多了"
        @load="loadData"
      >
        <store-item v-for="store in storeList" :store="store" :key="store.id"></store-item>
      </van-list>
    </div>
    <van-popup v-model="dateShow" position="bottom">
      <van-datetime-picker
        v-model="currentDate"
        type="date"
        @confirm="chooseDate"
        @cancel="dateShow=false"
      />
    </van-popup>
  </div>
</template>
<script>
import storeItem from "./storeItem";
import dd from "@/mixins/dd";
export default {
  mixins: [dd],
  data() {
    return {
      navs: [
        {
          active: true,
          name: "今日"
        },
        {
          active: false,
          name: "本周"
        },
        {
          active: false,
          name: "本月"
        },
        {
          active: false,
          name: "日期"
        }
      ],
      query: "",
      currentDate: new Date(),
      dateShow: false,
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
          status: "1", //1 已掉落 2 已拾取 3即将掉落
          // amount: 3000.5,
          // customerPrice: 1000.11,
          frequency: 5, //缺失
          sku: 6 //缺失
          // coupon: 4,
          // check: true
        }
      ],
      loading:false,
      finished:true,
      error:false,
      form:{
        currPage:1,
        limit:10,
      }
    };
  },
  computed: {
    queryValue() {
      return this.navs.find(nav => nav.active);
    }
  },
  components: { storeItem },
  filters: {
    badgeFilter(val) {
      return val > 99 ? 99 : val;
    }
  },
  methods: {
    onClickRight() {
      this.$toast("菜单");
    },
    changeItem(item, inx) {
      let newNavs = this.navs.map(elt => {
        elt.active = false;
        return elt;
      });
      newNavs[inx] = Object.assign({}, item, { active: true });
      if (inx === 3) {
        this.showDatePicker();
      }
      this.navs = newNavs;
    },
    showDatePicker(item, inx) {
      this.dateShow = true;
    },
    chooseDate(e) {
      console.log(e);
      this.currentDate = e;
      this.dateShow = false;
    },
    getStores() {
      let params = this.form
      params.type = 1
      if(params.type ===3){
        params.longitude = 
        params.latitude =this.mixins_latitude
      }
      this.$get("/store/crm/storesaleslog/listFallenDown",{

      }).then(data => {
        if (data.code == 0) {
          console.log(data)
        }
      });
    },
    loadData(){
      console.log('加载数据')
      this.getStores()
    }
  },
  created() {
    this.getLoction(() => {
      this.finished = false
    })
  }
};
</script>

<style scoped lang="less">
.body {
  padding: 46px 10px 0 10px;
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
