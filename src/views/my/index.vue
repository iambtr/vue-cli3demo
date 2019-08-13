<template>
  <div class="body">
    <div class="header">
      <!-- <img
        src="https://xianfengapp.oss-cn-hangzhou.aliyuncs.com/xiaoguogong/nav1.png"
        alt
        class="avator"
      />-->
      <div class="info">
        <div>{{realName}}{{userName}}</div>
        <!-- <div class="p">{{userInfo.des}}</div> -->
      </div>
    </div>
    <div class="nav">
      <div class="title">客户动态</div>
      <div class="grid-nav-body">
        <router-link class="gird-nav-item" v-for="item in navs" :key="item.name" :to="item.link">
          <img :src="item.icon" alt class="icon" />
          <span class="badge" v-if="item.badge">{{item.badge|badgeFilter}}</span>
          <div class="name">{{item.name}}</div>
        </router-link>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      realName: "",
      userName: "",
      navs: [
        {
          link: {
            name: "client",
            query: {
              type: "all"
            }
          },
          name: "客户库容",
          icon:
            "https://xianfengapp.oss-cn-hangzhou.aliyuncs.com/xiaoguogong/nav1.png",
          badge: ""
        },
        {
          link: {
            name: "storeNoPicked"
          },
          name: "已掉落",
          icon:
            "https://xianfengapp.oss-cn-hangzhou.aliyuncs.com/xiaoguogong/nav2.png",
          badge: ""
        },
        {
          link: {
            name: "storePicked"
          },
          name: "已拾取",
          icon:
            "https://xianfengapp.oss-cn-hangzhou.aliyuncs.com/xiaoguogong/nav3.png",
          badge: ""
        },
        {
          link: {
            name: "client",
            query: {
              type: "orderStatus"
            }
          },
          name: "注册未下单",
          icon:
            "https://xianfengapp.oss-cn-hangzhou.aliyuncs.com/xiaoguogong/nav4.png",
          badge: ""
        },
        {
          link: {
            name: "storePickedPedding"
          },
          name: "即将掉落",
          icon:
            "https://xianfengapp.oss-cn-hangzhou.aliyuncs.com/xiaoguogong/nav5.png",
          badge: ""
        }
      ]
    };
  },
  filters: {
    badgeFilter(val) {
      return val > 99 ? 99 : val;
    }
  },
  methods: {
    getMyStoresInfo() {
      this.$get("/store/crm/store/myStoresInfo").then(data => {
        if (data.code == 0) {
          let { myStoresVO } = data.data;
          this.navs[0].badge = myStoresVO.customersSum;
          this.navs[1].badge = myStoresVO.fall;
          this.navs[2].badge = myStoresVO.pickup;
          this.navs[3].badge = myStoresVO.registerNoOrder;
          this.navs[4].badge = myStoresVO.falling;
          this.userName = myStoresVO.userName;
          this.realName = myStoresVO.realName;
        }
      });
    }
  },
  created() {
    this.getMyStoresInfo();
  }
};
</script>

<style scoped lang="less">
.body {
  background-color: #f5f5f5;
  .header {
    background-color: #fff;
    display: flex;
    height: 80px;
    padding: 20px;
    align-items: center;
    .avator {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      margin-right: 10px;
    }
    .info {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      font-size: 16px;
      font-weight: bolder;
      color: rgba(27, 27, 29, 1);
      line-height: 22px;
      .p {
        font-size: 12px;
        font-weight: 400;
        color: rgba(102, 102, 102, 1);
        line-height: 17px;
      }
    }
  }
  .nav {
    background-color: #fff;
    box-sizing: border-box;
    border: 10px solid #f5f5f5;
    padding: 10px;
    .title {
      height: 20px;
      font-size: 14px;
      font-family: PingFangSC-Medium;
      font-weight: bolder;
      color: rgba(51, 51, 51, 1);
      line-height: 20px;
      text-align: left;
      margin-bottom: 10px;
    }
    .grid-nav-body {
      display: flex;
      flex-wrap: wrap;
    }
    .gird-nav-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      flex: 0 0 25%;
      position: relative;
      margin-bottom: 16px;
      .icon {
        width: 65px;
        height: 65px;
      }
      .badge {
        position: absolute;
        top: 6px;
        right: 12px;
        height: 19px;
        background: rgba(255, 121, 91, 1);
        font-weight: bolder;
        border-radius: 3px 3px 3px 0px;
        border: 1px solid rgba(255, 255, 255, 1);
        height: 17px;
        font-size: 12px;
        font-weight: bolder;
        color: rgba(255, 255, 255, 1);
        line-height: 17px;
        padding: 0 7px;
      }
      .name {
        height: 17px;
        font-size: 12px;
        font-weight: 400;
        color: rgba(102, 102, 102, 1);
        line-height: 17px;
      }
    }
  }
}
</style>
