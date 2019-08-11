<template>
    <div>
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
                        <div class="store-name">{{info.storeName}}-{{info.storeId}}</div>
                        <div class="flex">
                            <span class="visit">待认领</span>
                            <span class="visit visit1">{{info.storeLevel}}</span>
                        </div>
                    </div>
                    <div class="right">
                        <div class="flex flex-center" @click="goTell(info.receiverMobile)">
                            <img :src="phone" alt/>
                            <div class="name">{{info.receiverName}}</div>
                        </div>
                    </div>
                </div>
                <div class="flex flex-1 d6">
                    <img :src="position" alt="">
                    <span class="km">{{info.distance}}km </span>
                    <span>{{info.province}}{{info.city}}{{info.area}}{{info.address2}}{{info.address1}}{{info.address}}</span>
                </div>
                <div class="tip">未结算货单-禁止继续下单，请及时提示商户结算</div>
                <div content="title">店铺基本信息</div>
                <div class="items">
                    <div>
                        <div class="money">{{info.todayTotal}}</div>
                        <div class="disc">今日下单(元)</div>
                    </div>
                    <div>
                        <div class="money">{{info.customerPrice}}</div>
                        <div class="disc">客单价(元)</div>
                    </div>
                    <div>
                        <div class="money">{{info.frequency}}</div>
                        <div class="disc">近30天频次</div>
                    </div>
                    <div>
                        <div class="money">{{info.sku}}</div>
                        <div class="disc">近30天均SKU</div>
                    </div>
                    <div>
                        <div class="money">{{info.couponTotal}}</div>
                        <div class="disc">优惠券</div>
                    </div>
                </div>
            </div>
            <div class="more flex flex-between" @click="$router.push({name:'skuList'})">
                <div>近30天购买SKU</div>
                <div class="more1">查看更多
                    <van-icon name="arrow"></van-icon>
                </div>
            </div>
            <div class="sku-view">
                <skuItem></skuItem>
                <skuItem></skuItem>
            </div>
            <div class="more flex flex-between" @click="$router.push({name:'orderList'})">
                <div>近30天订单记录</div>
                <div class="more1">查看更多
                    <van-icon name="arrow"></van-icon>
                </div>
            </div>

            <orderItem></orderItem>
            <div class="more flex flex-between">
                <div>最近7次订单评价</div>
                <!--<div class="more1">查看更多-->
                <!--<van-icon name="arrow"></van-icon>-->
                <!--</div>-->
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
            <div class="flex choose-view">
                <div class="choose-item"
                     v-for="item,index in timeChoose" :key="index"
                     :class="{'active':item.active}"
                     @click="changeChooseItem(index)"
                >
                    <div class="choose-name">{{item.name}}</div>
                    <div>{{item.value}}</div>
                </div>
            </div>
        </van-dialog>
        <van-button type="primary" class="btn">拾取客户</van-button>
        <van-button type="primary" class="btn">去审核</van-button>
        <van-button type="primary" class="btn" @click.native="show=true">我要拜访</van-button>
    </div>
</template>

<script>
    import getYYR from '../../../mixins/getYYR'
    import phone from '../../my/storeNoPicked/img/phone.png'
    import position from '$img/postion.png'
    import fruit from '$img/fruit.png'
    import skuItem from './skuItem'
    import orderItem from './orderItem'

    export default {
        mixins: [getYYR],
        components: {skuItem, orderItem},
        data() {
            return {
                info: '',
                storeKeyId: '',
                phone,
                position,
                fruit,
                value: 2.6,
                show: false,
                timeChoose: [
                    {
                        active: true,
                        name: '今日拜访',
                        value: this.getYYR(new Date())
                    },
                    {
                        active: false,
                        name: '明日拜访',
                        value: this.getDate()
                    }
                ]
            }
        },
        methods: {
            onClickRight() {
                this.$router.push({name: 'visitList'})
            },
            getDate() {
                let now = new Date()
                let t = new Date((now / 1000 + 86400) * 1000)
                console.log(t)
                let now1 = this.getYYR(t)
                return now1
            },
            changeChooseItem(index) {
                this.timeChoose.map(item => {
                    return item.active = false
                })
                this.timeChoose[index].active = true
            },
            getInfo() {
                this.$get('/crm/store/storeInfo', {
                    storeKeyId: this.storeKeyId,
                    lng:localStorage.getItem('longitude'),
                    lat:localStorage.getItem('latitude')
                }).then(res => {
                    if (res.code === 0) {
                        this.info = res.data
                    }
                }).catch(err => {

                })
            }
        },
        created() {
            this.storeKeyId = this.$route.query.storeKeyId
            this.getInfo()
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

    .choose-item {
        width: 128px;
        height: 60px;
        background: rgba(250, 250, 250, 1);
        border-radius: 3px;
        border: 1px solid rgba(229, 229, 229, 1);
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        color: #666;

        .choose-name {
            font-size: 14px;
        }
    }

    .active {
        color: #FF8339;
        background: rgba(255, 131, 57, 0.1);
        border: 1px solid rgba(255, 131, 57, 0.3);
    }

    .choose-item:first-child {
        margin-right: 20px;
    }

    .choose-view {
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 20px 0;
    }
</style>
