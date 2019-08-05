<template>
  <div class="body">
    <div class="header">
      <img src alt class="avator" />
      <div class="info">
        <div>{{userInfo.name}}</div>
        <!-- <div class="p">{{userInfo.des}}</div> -->
      </div>
    </div>
    <div class="nav">
      <div class="title">客户动态</div>
      <van-grid :border="false" :column-num="4">
        <van-grid-item v-for="item in navs" :key="item.name" icon="photo-o" text="文字">
            <img :src="item.icon" alt="" class="icon">
            <div class="name">{{item.name}}</div>
        </van-grid-item>
      </van-grid>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userInfo: {
        name: "用户名 00000008",
        des: "浙北分公司-销售顾问"
      },
      navs: [
        {
          name: "客户库容",
          icon: "https://xianfengapp.oss-cn-hangzhou.aliyuncs.com/xiaoguogong/nav1.png",
          badge: ""
        },
        {
          name: "已掉落",
          icon: "https://xianfengapp.oss-cn-hangzhou.aliyuncs.com/xiaoguogong/nav2.png",
          badge: "2"
        },
        {
          name: "已拾取",
          icon: "https://xianfengapp.oss-cn-hangzhou.aliyuncs.com/xiaoguogong/nav3.png",
          badge: "2"
        },
        {
          name: "注册未下单",
          icon: "https://xianfengapp.oss-cn-hangzhou.aliyuncs.com/xiaoguogong/nav4.png",
          badge: "2"
        },
        {
          name: "即将掉落",
          icon: "https://xianfengapp.oss-cn-hangzhou.aliyuncs.com/xiaoguogong/nav5.png",
          badge: "2"
        }
      ]
    };
  },
  methods: {},
  created() {}
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
    border: 10px solid #f5f5f5;
    padding: 20px;
    .title {
      height: 20px;
      font-size: 14px;
      font-family: PingFangSC-Medium;
      font-weight: bolder;
      color: rgba(51, 51, 51, 1);
      line-height: 20px;
      text-align: left;
    }
  }
}
</style>
