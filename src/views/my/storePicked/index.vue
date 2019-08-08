<template>
  <div class="body">
    <van-nav-bar
      title="已拾取"
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
      <store-item v-for="store in storeList" :store="store" :key="store.id"></store-item>
    </div>
  </div>
</template>
<script>
import storeItem from "../storeNoPicked/storeItem";
export default {
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
      storeList: [
        {
          id: 1,
          name: "鲜康水果店-09087208",
          phone: "400-2323-323",
          contanct: "张丽丽",
          status: "2", //1 已掉落 2 已拾取 3即将掉落
          address: "杭州市拱墅区三墩路85号",
          distance: "13.3"
        },
        {
          id: 2,
          name: "鲜康水果店-09087208",
          phone: "15372005595",
          contanct: "张丽丽2",
          status: "2", //1 已掉落 2 已拾取 3即将掉落
          address: "杭州市拱墅区三墩路85号",
          distance: "13.4"
        }
      ]
    };
  },
  computed: {
    queryValue() {
      return this.navs.find(nav => nav.active);
    }
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
  created() {}
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
