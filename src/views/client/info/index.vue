<template>
    <div >
        <van-nav-bar
                fixed
                title="商户信息"
                left-arrow
                right-text="查看拜访计划"
                @click-left="onClickLeft"
                @click-right="onClickRight"
        >
        </van-nav-bar>
        <div class="container">
            <div class="box">
                <div class="top flex">
                    <div class="flex-1 left">
                        <div class="store-name">鲜康水果店-09087208</div>
                        <div class="flex">
                            <span class="visit">待认领</span>
                            <span class="visit visit1">A</span>
                        </div>
                    </div>
                    <div class="right">
                        <div class="flex flex-center">
                            <img :src="phone" alt/>
                            <div class="name">张丽丽</div>
                        </div>
                    </div>
                </div>
                <div class="flex flex-1 d6">
                    <img :src="position" alt="">
                    <span class="km">13.3km </span>
                    <span>杭州市拱墅区三墩路85号</span>
                </div>
                <div class="tip">未结算货单-禁止继续下单，请及时提示商户结算</div>
                <div content="title">店铺基本信息</div>
                <div class="items">
                    <div>
                        <div class="money">3000.50</div>
                        <div class="disc">今日下单(元)</div>
                    </div>
                    <div>
                        <div class="money">3000.50</div>
                        <div class="disc">客单价(元)</div>
                    </div>
                    <div>
                        <div class="money">3000.50</div>
                        <div class="disc">近30天频次</div>
                    </div>
                    <div>
                        <div class="money">3000.50</div>
                        <div class="disc">近30天均SKU</div>
                    </div>
                    <div>
                        <div class="money">3000.50</div>
                        <div class="disc">优惠券</div>
                    </div>
                </div>
            </div>
            <div class="more flex flex-between">
                <div>近30天购买SKU</div>
                <div class="more1">查看更多
                    <van-icon name="arrow"></van-icon>
                </div>
            </div>
            <div class="sku-view">
                <div class="sku-item">
                    <div class="flex flex-between">
                        <div class="disc">商品名称描述</div>
                        <div class="buy-time">购买次数：<span class="color">15</span></div>
                    </div>
                    <div>单价：¥500.90 代码：0000001</div>
                </div>
                <div class="sku-item">
                    <div class="flex flex-between">
                        <div class="disc">商品名称描述</div>
                        <div class="buy-time">购买次数：<span class="color">15</span></div>
                    </div>
                    <div>单价：¥500.90 代码：0000001</div>
                </div>
            </div>
            <div class="more flex flex-between">
                <div>近30天订单记录</div>
                <div class="more1">查看更多
                    <van-icon name="arrow"></van-icon>
                </div>
            </div>
            <div class="order-view">
                <div class="order-top flex-between flex">
                    <div>2019.7.24 下午09:59:27</div>
                    <div>已完成</div>
                </div>
                <div class="order-box flex flex-center">
                    <img :src="fruit" alt="">
                    <img :src="fruit" alt="">
                    <img :src="fruit" alt="">
                    <img :src="fruit" alt="">
                    共20件
                </div>
                <div class="really-pay">实付：<span class="money">&yen;23.30</span></div>
            </div>
            <div class="more flex flex-between">
                <div>最近7次订单评价</div>
                <div class="more1">查看更多
                    <van-icon name="arrow"></van-icon>
                </div>
            </div>
            <div class="star-view">
                <div class="star-item">
                   <div>配送评价</div>
                    <van-rate
                            readonly
                            v-model="value"
                            :size="23"
                            color="#FF8239"
                            void-icon="star"
                            void-color="#eee"
                    />
                </div>
                <div class="star-item">
                    <div>品质评价</div>
                    <van-rate
                            readonly
                            allow-half
                            v-model="value"
                            :size="23"
                            color="#FF8239"
                            void-icon="star"
                            void-color="#eee"
                    />
                </div>
            </div>
        </div>
        <van-dialog
                v-model="show"
                title="添加拜访商户计划"
                show-cancel-button
                cancelButtonColor="#666666"
                confirm-button-color="#fff"
        >

        </van-dialog>
        <van-button type="primary"  class="btn">拾取客户</van-button>
        <van-button type="primary"  class="btn">去审核</van-button>
        <van-button type="primary"  class="btn" @click.native="show=true">我要拜访</van-button>
    </div>
</template>

<script>
    import phone from '../../my/storeNoPicked/img/phone.png'
    import position from '$img/postion.png'
    import fruit from '$img/fruit.png'
    export default {
        data() {
            return {
                phone,
                position,
                fruit,
                value: 2.6,
                show:false
            }
        },
        methods: {
            onClickRight() {
                this.$router.push({name: 'visitList'})
            }
        },
        created() {
        }
    }
</script>

<style scoped lang="less">
    .container {
        padding: 56px 10px;
    }

    .box {
        background: rgba(255, 255, 255, 1);
        border-radius: 3px;
        padding: 10px 15px;
    }

    .left {
        .store-name {
            font-size: 14px;
            color: #333;
            margin-bottom: 5px;
        }
    }

    .right {
        width: 50px;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        position: relative;

        & > div {
            flex-direction: column;
        }

        .name {
            color: #333;
        }

        img {
            width: 14px;
            height: 14px;
            margin-bottom: 2px;
        }
    }

    .right:before {
        content: '';
        display: block;
        position: absolute;
        left: 0;
        top: 15px;
        width: 1px;
        height: 12px;
        background: #E5E5E5;
    }

    .visit {
        display: flex;
        font-size: 12px;
        justify-content: center;
        align-items: center;
        background: #3CC8B6;
        color: #fff;
        padding: 2px 5px;
        margin-right: 10px;
        border-radius: 1px;
    }

    .visit1 {
        background: #FF8339;
    }

    .d6 {
        margin-top: 10px;
        height: 28px;
        line-height: 28px;
        background: #F5F8FA;
        width: 100%;
        color: #A1AAB8;
        display: flex;
        align-items: center;
        padding: 0 10px;

        img {
            width: 12px;
            height: 12px;
        }
    }

    .km {
        padding: 0 10px;
    }

    .tip {
        color: #ffffff;
        height: 45px;
        line-height: 45px;
        background: #FF8339;
        text-align: center;
        margin: 15px 0;
    }

    .title {
        color: #666666;
    }

    .items {
        display: flex;
        flex-wrap: wrap;

        & > div {
            position: relative;
            margin-top: 15px;
            width: 33.3333%;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;

            .money {
                font-size: 14px;
                color: #333;
            }

            .disc {
                color: #C1C1C1;
            }
        }

        & > div:not(:first-child):not(:nth-child(4)):before {
            position: absolute;
            content: '';
            display: block;
            left: 0;
            top: 12px;
            width: 1px;
            height: 14px;
            background: #C1C1C1;
        }
    }

    .more {
        margin: 15px 0 10px;
        padding: 0 15px;
        font-size: 14px;
        color: #666;

        .more1 {
            display: flex;
            justify-content: flex-end;
            align-items: center;
            font-size: 12px;
            color: #c1c1c1;
        }
    }

    .sku-item {
        padding: 12px 15px;
        background: #ffffff;
        color: #999;
        border-radius: 3px;
        align-items: center;

        .disc {
            color: #333;
            font-size: 14px;
        }

        .buy-time {
            font-size: 13px;

            .color {
                color: #333;
            }
        }
    }

    .sku-item:not(:last-child) {
        margin-bottom: 10px;
    }

    .order-view {
        padding: 15px;
        border-radius: 3px;
        background: #ffffff;

        .order-top {
            color: #666;
        }

        .order-box {
            background: rgba(250, 250, 250, 1);
            border-radius: 3px;
            border: 1px solid rgba(245, 245, 245, 1);
            padding: 20px 7px 20px 10px;
            margin: 10px 0;
            font-size: 12px;
            color: #666;

            img {
                width: 56px;
                height: 56px;
                margin-right: 10px;
            }
        }

        .really-pay {
            color: #999;
            display: flex;
            justify-content: flex-end;
            align-items: center;

            .money {
                color: #333;
                font-size: 16px;
            }
        }
    }
    .star-item {
        background: #ffffff;
        border-radius: 3px;
        padding: 20px 15px;
        font-size: 14px;
        color: #333;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 10px;
    }
    .btn {
        width: 300px;
        position: fixed;
        left: 50%;
        right: 50%;
        margin-left: -150px;
        bottom: 10px;
    }
</style>
