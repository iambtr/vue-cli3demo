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
          v-model="dateValue"
          :options="dateRange"
          :title-class="filterValue=='dateValue'?'active':''"
          @change="changTabValue('dateValue',$event)"
        />
        <van-dropdown-item
          v-model="orderValue"
          :options="orderRange"
          :title-class="filterValue=='orderValue'?'active':''"
          @change="changTabValue('orderValue',$event)"
        />
        <van-dropdown-item
          v-model="customerValue"
          :options="customerRange"
          :title-class="filterValue=='customerValue'?'active':''"
          @change="changTabValue('customerValue',$event)"
        />
        <van-dropdown-item
          v-model="callOnValue"
          :options="callOnRange"
          :title-class="filterValue=='callOnValue'?'active':''"
          @change="changTabValue('callOnValue',$event)"
        />
        <van-dropdown-item
          v-model="checkValue"
          :options="checkRange"
          :title-class="filterValue=='checkValue'?'active':''"
          @change="changTabValue('checkValue',$event)"
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
          @change="changTabValue2('dateValue',$event)"
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
          <store-item :store="item" @callClick="readyCallPhone">
            <store-info :store="item" @click.native="$router.push({name:'clientInfo'})"></store-info>
            <van-button type="primary" block v-if="item.check&&!item.pickUp">去审核</van-button>
            <van-button
              type="primary"
              block
              v-if="item.pickUp&&!item.check"
              @click="readyPickUp(item)"
            >拾取客户</van-button>
          </store-item>
        </div>
      </van-list>
    </div>
    <van-popup v-model="phonePop" round>
      <pop confirmTxt="呼叫" :title="phone" @confirm="callPhone" @cancel="phonePop=false" />
    </van-popup>
    <van-popup v-model="pickPop" round>
      <pop confirmTxt="确认拾取" title="是否拾取该用户" @confirm="pickUp" @cancel="pickPop=false" />
    </van-popup>
  </div>
</template>

<script>
import storeItem from "@/views/my/storeNoPicked/storeItem";
import storeInfo from "./components/storeInfo";
import pop from "@/views/my/storeNoPicked/pop";

export default {
  data() {
    return {
      active: "my", //my 我的 sea公海
      filterValue: "dateValue", //生效的查询条件
      dateValue: 30,
      dateRange: [
        { text: "≤30天", value: 30 },
        { text: "≤14天", value: 14 },
        { text: "≤7天", value: 7 }
      ],
      orderValue: 0,
      orderRange: [{ text: "未下单", value: 0 }, { text: "已下单", value: 1 }],
      customerValue: "A",
      customerRange: [
        { text: "A类客户", value: "A" },
        { text: "B类客户", value: "B" },
        { text: "C类客户", value: "C" },
        { text: "D类客户", value: "D" },
        { text: "E类客户", value: "E" }
      ],
      callOnValue: 0,
      callOnRange: [{ text: "已拜访", value: 1 }, { text: "未拜访", value: 0 }],
      checkValue: 0,
      checkRange: [{ text: "已审核", value: 1 }, { text: "未审核", value: 0 }],
      sorts: [
        {
          active: true,
          sort: "up",
          name: "累计金额排序 "
        },
        {
          active: false,
          sort: "down",
          name: "券数量 "
        },
        {
          active: false,
          sort: "down",
          name: "距离排序 "
        }
      ],
      dateValue2: 30,
      dateRange2: [
        { text: "≤30天", value: 30 },
        { text: "≤14天", value: 14 },
        { text: "≤7天", value: 7 }
      ],
      cityValue: 0,
      cityRange: [
        { text: "杭州", value: 2 },
        { text: "上海", value: 1 },
        { text: "北京", value: 0 }
      ],
      //   列表
      loading: false,
      finished: false,
      error: false,
      customers: [
        {
          id: 1,
          name: "鲜康水果店-09087208",
          phone: "400-2323-323",
          contanct: "张丽丽",
          status: "1", //1 已掉落 2 已拾取 3即将掉落
          address: "杭州市拱墅区三墩路85号",
          distance: "13.3",
          amount: 3000.5,
          customerPrice: 1000.11,
          frequency: 5,
          sku: 6,
          coupon: 4,
          check: true
        },
        {
          id: 2,
          name: "鲜康水果店-09087208",
          phone: "15372005595",
          contanct: "张丽丽2",
          status: "1", //1 已掉落 2 已拾取 3即将掉落
          address: "杭州市拱墅区三墩路85号",
          distance: "13.4",
          amount: 3000.5,
          customerPrice: 1000.11,
          frequency: 15,
          sku: 6,
          coupon: 4,
          check: false,
          pickUp: true
        }
      ],
      //弹框
      phonePop: false,
      phone: "",
      pickItem: {},
      pickPop: false
    };
  },
  computed: {
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
        dateValue: 7,
        orderValue: 0,
        customerValue: "A",
        callOnValue: 0,
        checkValue: 0
      };
      ["dateValue", "orderValue", "customerValue", "callOnValue", "checkValue"]
        .filter(elt => elt !== type)
        .forEach(item => {
          this[item] = initValue[item];
        });
      this[type] = val;
      this.filterValue = type;
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
    },
    toInfoIndex() {
      this.$router.push({
        name: "clientInfo"
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
      this.pickPop = false;
    },
    loadData() {}
  },
  created() {}
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
