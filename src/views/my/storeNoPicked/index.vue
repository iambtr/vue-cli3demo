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
        @load="getStores"
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
import getYYR from "@/mixins/getYYR";
export default {
  mixins: [dd,getYYR],
  data() {
    return {
      navs: [
        {
          active: true,
          type: 0,
          name: "今日"
        },
        {
          active: false,
          type: 1,
          name: "本周"
        },
        {
          active: false,
          type: 2,
          name: "本月"
        },
        {
          active: false,
          type: 3,
          name: "日期"
        }
      ],
      newNavs: [],
      query: "",
      currentDate: new Date(),
      dateShow: false,
      storeList: [
        // {
        //   storeId: 1,
        //   address: "杭州市拱墅区三墩路85号",
        //   address1: "",
        //   address2: "",
        //   area: "",
        //   city: "",
        //   contact: "",
        //   contractSales: "",
        //   couponTotal: 4,
        //   customerPrice: 1000.11,
        //   distance: "13.3",
        //   distributionPlan: "",
        //   doorPhoto: "",
        //   failMsg: "",
        //   isDelete: "",
        //   keyId: "",
        //   lastOrderTime: "",
        //   lastVisitTime: "",
        //   latiLongi: "",
        //   licensePhoto: "",
        //   mobile: "400-2323-323",
        //   oprDt: "",
        //   oprId: "",
        //   orderTotal: "",
        //   province: "",
        //   receiverMobile: "",
        //   receiverName: "",
        //   reexaminingTime: "",
        //   serviceSales: "",
        //   stat: "EXAMINING",
        //   storeLevel: "A",
        //   storeName: "鲜康水果店-09087208",
        //   todayTotal: 3000.5,
        //   updDt: "",
        //   updId: "",
        //   whCode: "",
        //   contactName: "张丽丽",
        //   status: "1", //1 已掉落 2 已拾取 3即将掉落
        //   // amount: 3000.5,
        //   // customerPrice: 1000.11,
        //   frequency: 5, //缺失
        //   sku: 6 //缺失
        //   // coupon: 4,
        //   // check: true
        // }
      ],
      loading: false,
      finished: true,
      error: false,
      form: {
        currPage: 1,
        limit: 10
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
      let newNavs =JSON.parse(JSON.stringify(this.navs)).map(elt => {
        elt.active = false;
        return elt;
      });
      newNavs[inx] = Object.assign({}, item, { active: true });
      if (inx === 3) {
        this.showDatePicker();
        this.newNavs = newNavs;
      } else {
        this.navs = newNavs;
        this.resetGetStores();
      }
    },
    showDatePicker(newNavs) {
      this.dateShow = true;
    },
    chooseDate(e) {
      this.currentDate = e;
      this.dateShow = false;
      this.navs = this.newNavs;
      this.resetGetStores();
    },

    getStores() {
      let params = this.form;
      params.type = this.queryValue.type;
      params.longitude = this.mixins_longitude;
      params.latitude = this.mixins_latitude;
      if (params.type === 3) {
        params.startDate = this.getYYR(new Date(this.currentDate));
        params.endDate = this.getYYR(new Date());
      }
      this.$get("/store/crm/storesaleslog/listFallenDown", params).then(
        data => {
          if (data.code == 0) {
            console.log(data);
            let {pageInfo} = data.data
            this.storeList = this.storeList.concat(pageInfo.list.map(elt=>{
              elt.address = elt.storeAddress 
              elt.status = 1
              return elt
            })) 
            this.loading=false
            if(pageInfo.nextPage){
              this.form.currPage = pageInfo.nextPage
            }else{
              this.finished=true
            }
          }
        }
      );
    },
    resetGetStores() {
      console.log("加载数据");
      this.form = {
        currPage: 1,
        limit: 10
      };
      this.storeList = [];
      this.finished = false;
      this.loading = false;
      this.finished = true;
      this.error = false;
      this.getStores();
    }
  },
  created() {
    this.getLocation(() => {
      this.finished = false;
    });
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
