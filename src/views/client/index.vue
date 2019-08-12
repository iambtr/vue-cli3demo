<template>
  <div>
    <div class="top flex flex-between">
      <div class="customer-title">客户列表</div>
      <div class="flex flex-between customer-tab">
        <div :class="active=='my'?'active':''" @click="active='my'">我的</div>
        <div :class="active!='my'?'active':''" @click="active='sea'">公海</div>
      </div>
    </div>
    <div class="filter-tab" v-if="active=='my'">
      <van-dropdown-menu active-color="#FF8239">
        <van-dropdown-item
          v-model="orderDays"
          :options="orderDaysRange"
          :title-class="filterValue=='orderDays'?'active':''"
          @change="changTabValue('orderDays',$event)"
        />
        <van-dropdown-item
          v-model="orderStatus"
          :options="orderStatusRange"
          :title-class="filterValue=='orderStatus'?'active':''"
          @change="changTabValue('orderStatus',$event)"
        />
        <van-dropdown-item
          v-model="storeLevel"
          :options="storeLevelRange"
          :title-class="filterValue=='storeLevel'?'active':''"
          @change="changTabValue('storeLevel',$event)"
        />
        <van-dropdown-item
          v-model="visitStatus"
          :options="visitStatusRange"
          :title-class="filterValue=='visitStatus'?'active':''"
          @change="changTabValue('visitStatus',$event)"
        />
        <van-dropdown-item
          v-model="stat"
          :options="statRange"
          :title-class="filterValue=='stat'?'active':''"
          @change="changTabValue('stat',$event)"
        />
      </van-dropdown-menu>
    </div>
    <div class="filter-tab" v-if="active=='sea'" style="margin-bottom:10px;">
      <van-dropdown-menu active-color="#FF8239">
        <van-dropdown-item
          v-model="cityValue"
          :options="cityRange"
          @change="changTabValue2('cityValue',$event)"
        />
        <van-dropdown-item
          v-model="dateValue2"
          :options="dateRange2"
          title-class="active"
          @change="changTabValue2('dateValue2',$event)"
        />
      </van-dropdown-menu>
    </div>
    <div class="srot-body" v-if="active=='my'">
      <div class="tab-store">
        <div
          v-for="(item,inx) in sorts"
          :key="item.name"
          class="tab-item"
          :class="{'active':item.active,'up':item.sort==='up','down':item.sort==='down'}"
          @click="changeItem(item,inx)"
        >{{item.name}}</div>
      </div>
    </div>
    <div class="list-body">
      <van-list
        v-model="loading"
        :finished="finished"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
        finished-text="没有更多了"
        @load="loadData"
      >
        <div class="list-item" v-for="item in customers" :key="item.code">
          <store-item :store="item" @callClick="readyCallPhone" customer>
            <store-info :store="item" @click.native="storeNav(item)"></store-info>
            <van-button
              type="primary"
              block
              v-if="(item.stat=='EXAMINING'||item.stat=='REEXAMINING')&&item.serviceSales"
              @click="$router.push({name:'newUserReview',query:{keyId:item.keyId}})"
            >去审核</van-button>
            <van-button
              type="primary"
              block
              v-if="!item.serviceSales"
              @click="readyPickUp(item)"
            >拾取客户</van-button>
          </store-item>
        </div>
      </van-list>
    </div>
    <van-popup v-model="pickPop" round>
      <pop confirmTxt="确认拾取" title="是否拾取该用户" @confirm="pickUp" @cancel="pickPop=false" />
    </van-popup>
  </div>
</template>

<script>
import storeItem from "@/views/my/storeNoPicked/storeItem";
import storeInfo from "./components/storeInfo";
import pop from "@/views/my/storeNoPicked/pop";
import dd from "@/mixins/dd";
export default {
  mixins: [dd],
  data() {
    return {
      active: "my", //my 我的 sea公海
      filterValue: "orderDays", //生效的查询条件
      orderDays: "",
      orderDaysRange: [
        { text: "所有", value: "" },
        { text: "≤30天", value: 30 },
        { text: "≤15天", value: 15 },
        { text: "≤7天", value: 7 }
      ],
      orderStatus: 0,
      orderStatusRange: [
        { text: "未下单", value: 0 },
        { text: "已下单", value: 1 }
      ],
      storeLevel: "A",
      storeLevelRange: [
        { text: "A类客户", value: "A" },
        { text: "B类客户", value: "B" },
        { text: "C类客户", value: "C" },
        { text: "D类客户", value: "D" },
        { text: "E类客户", value: "E" }
      ],
      visitStatus: 0,
      visitStatusRange: [
        { text: "已拜访", value: 1 },
        { text: "未拜访", value: 0 }
      ],
      stat: "EXAMINING",
      statRange: [
        { text: "等待审核", value: "EXAMINING" },
        { text: "正常", value: "NORMAL" },
        { text: "冻结", value: "CANCEL" },
        { text: "审核未通过", value: "FAILED" },
        { text: "等待重新审核", value: "REEXAMINING" }
      ],
      sorts: [
        {
          active: true,
          sort: "up",
          label: "AMOUNT",
          name: "累计金额排序 "
        },
        {
          active: false,
          sort: "down",
          label: "COUPON",
          name: "券数量 "
        },
        {
          active: false,
          sort: "down",
          label: "DISTANCE",
          name: "距离排序 "
        }
      ],
      dateValue2: "",
      dateRange2: [
        { text: "所有", value: "" },
        { text: "≤30天", value: 30 },
        { text: "≤15", value: 15 },
        { text: "≤7天", value: 7 }
      ],
      cityValue: "杭州市",
      cityRange: [
        { text: "杭州市", value: "杭州市" },
        { text: "上海市", value: "上海市" }
      ],
      //   列表
      loading: false,
      finished: true,
      error: false,
      customers: [
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
          keyId: "222",
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
          stat: "NORMAL",
          storeLevel: "A",
          storeName: "鲜康水果店-09087208",
          todayTotal: 3000.5,
          updDt: "",
          updId: "",
          whCode: "",
          contactName: "张丽丽",
          status: "3", //1 已掉落 2 已拾取 3即将掉落
          aboutToFall: true,
          frequency: 5, //缺失
          sku: 6 //缺失
        }
      ],
      location: {
        longitude: 120.100227,
        latitude: 30.32688
      },
      //弹框
      phonePop: false,
      phone: "",
      pickItem: {},
      pickPop: false
    };
  },
  watch: {
    active(n, o) {
      if (n === "my") {
        this.getMyCustomers();
      } else {
        this.getSeaCustomers();
      }
    }
  },
  computed: {
    order() {
      let sortItem = this.sorts.find(nav => nav.active);
      let so = "_ASC";
      if (sortItem.sort === "down") {
        so = "_DESC";
      }
      return sortItem.label + so;
    },
    queryValue() {
      return this.sorts.find(nav => nav.active);
    },
    queryType() {
      return this[this.filterValue] || "";
    }
  },
  components: { storeItem, storeInfo, pop },
  methods: {
    changTabValue(type, val) {
      let initValue = {
        orderDays: 7,
        orderStatus: 0,
        storeLevel: "A",
        visitStatus: 0,
        stat: "EXAMINING"
      };
      ["orderDays", "orderStatus", "storeLevel", "visitStatus", "stat"]
        .filter(elt => elt !== type)
        .forEach(item => {
          this[item] = initValue[item];
        });
      this[type] = val;
      this.filterValue = type;
      this.getMyCustomers();
    },
    changTabValue2(type, val) {
      this.getSeaCustomers();
    },
    changeItem(item, inx) {
      let queryValue = this.queryValue;
      let sorts = this.sorts.map(elt => {
        elt.active = false;
        return elt;
      });
      if (sorts[inx].name === queryValue.name) {
        sorts[inx] = Object.assign({}, item, {
          active: true,
          sort: queryValue.sort === "down" ? "up" : "down"
        });
      } else {
        sorts[inx] = Object.assign({}, item, {
          active: true
        });
      }
      this.sorts = sorts;
      this.getMyCustomers();
    },
    toInfoIndex() {
      this.$router.push({
        name: "clientInfo"
      });
    },
    getMyCustomers(e) {
      let params = {
        lat: Number(this.mixins_latitude),
        lng: Number(this.mixins_longitude),
        order: this.order
      };
      if (this.filterValue) {
        params[this.filterValue] = this[this.filterValue];
      }
      this.$get("/crm/store/list", params).then(data => {
        if (data.code == 0) {
          let { list } = data.data;
          console.log(list);
          if (list) {
            this.customers = list.map(elt => {
              if (elt.aboutToFall) {
                elt.status = "3";
              }
              return elt;
            });
            this.finished=true

          }else{
            this.customers = []
            this.finished=true
          }
        }
      });
    },
    getSeaCustomers(e) {
      let params = {
        lat: Number(this.mixins_latitude),
        lng: Number(this.mixins_longitude),
        city: this.cityValue
      };
      if (this.dateValue2) {
        params.orderDays = this.dateValue2;
      }
      this.$get("/crm/store/publicList", params).then(data => {
        if (data.code == 0) {
          let { list } = data.data;
          console.log(list);
          if (list) {
            this.customers = list.map(elt => {
              elt.status = "4";
              return elt;
            });
          }
        }
      });
    },
    readyCallPhone(e) {
      this.phone = e;
      this.phonePop = true;
    },
    callPhone() {
      this.phonePop = false;
    },
    readyPickUp(e) {
      this.pickItem = e;
      this.pickPop = true;
    },
    pickUp(e) {
      console.log(this.pickItem);
      this.pickPop = false;
      this.$post("/store/crm/store/pickUp", {
        keyId: this.pickItem.keyId
      }).then(data => {
        this.$toast.success("拾取成功");
        setTimeout(() => {
          this.getSeaCustomers();
        }, 1500);
      });
    },
    storeNav(item) {
      let query = { storeKeyId: item.keyId };
      query.type = this.active;
      this.$router.push({ name: "clientInfo", query });
    },
    getLoction2() {
      let that = this;
      that.$dd.ready(function() {
        that.$dd.device.geolocation.get({
          targetAccuracy: 200,
          coordinate: 1,
          withReGeocode: true,
          useCache: false, //默认是true，如果需要频繁获取地理位置，请设置false
          onSuccess: function(result) {
            /* 高德坐标 result 结构
        {
            longitude : Number,
            latitude : Number,
            accuracy : Number,
            address : String,
            province : String,
            city : String,
            district : String,
            road : String,
            netType : String,
            operatorType : String,
            errorMessage : String,
            errorCode : Number,
            isWifiEnabled : Boolean,
            isGpsEnabled : Boolean,
            isFromMock : Boolean,
            provider : wifi|lbs|gps,
            isMobileEnabled : Boolean
        }
        */
            let city = null;
            if (result.city) {
              city = result.city;
            } else {
              city = result.province;
            }
            that.cityValue = that.cityRange.filter(
              elt => elt.text === city
            )[0].value;
            this.location.longitude = res.longitude;
            this.location.latitude = res.latitude;
          },
          onFail: function(err) {}
        });
      });
    },
    loadData() {}
  },
  created() {
    this.getLocation(() => {
      let { type } = this.$route.query;
      switch (type) {
        case "all":
          this.filterValue = "";
          this.getMyCustomers();
          break;
        case "orderStatus":
          this.filterValue = "orderStatus";
          this.getMyCustomers();
          break;
        default:
          this.getMyCustomers();
      }
    });
  }
};
</script>
<style lang="less">
.filter-tab {
  .van-dropdown-menu__title.active {
    color: #ff8239 !important;
  }
}
</style>

<style scoped lang="less">
.top {
  height: 54px;
  box-sizing: border-box;
  padding: 0 20px;
  background-color: #ffffff;
  .customer-title {
    font-size: 20px;
    font-family: PingFangSC-Medium;
    font-weight: bolder;
    color: rgba(51, 51, 51, 1);
    line-height: 28px;
    margin-top: 21px;
  }
  .customer-tab {
    margin-top: 25px;
    font-size: 14px;
    font-family: PingFangSC-Medium;
    font-weight: bolder;
    color: rgba(51, 51, 51, 1);
    line-height: 20px;
    width: 78px;
    div {
      padding-bottom: 5px;
    }
    div.active {
      border-bottom: 4px solid #ff8239;
    }
  }
}
.filter-tab {
  padding: 0 10px;
  font-size: 12px;
  background-color: #ffffff;
}
.srot-body {
  padding: 0 10px;
}
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
    position: relative;
    &.tab-item.up::after {
      position: absolute;
      top: 20px;
      right: 12px;
      border: 3px solid;
      border-color: transparent transparent currentColor currentColor;
      -webkit-transform: rotate(135deg);
      transform: rotate(135deg);
      opacity: 0.8;
      content: "";
    }
    &.tab-item.down::after {
      position: absolute;
      top: 16px;
      right: 12px;
      border: 3px solid;
      border-color: transparent transparent currentColor currentColor;
      -webkit-transform: rotate(-45deg);
      transform: rotate(-45deg);
      opacity: 0.8;
      content: "";
    }
  }
  .active {
    color: #ff8239;
  }
}
.list-body {
  padding: 0 10px 50px;
}
</style>
