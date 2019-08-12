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
                            <span class="visit" v-if="!info.serviceSales">待认领</span>
                            <span class="visit" v-else>已认领</span>
                            <span class="visit visit1" v-if="info.serviceSales&&(info.stat==='EXAMINING'||info.stat==='REEXAMINING')">待审核</span>
                            <span class="visit visit1" v-if="info.stat==='CANCEL'||info.stat==='FAILED'">失效</span>
                            <span class="visit visit1" v-if="info.storeLevel">{{info.storeLevel}}</span>
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
                    <span class="km">{{(info.distance/1000).toFixed(2)}}km </span>
                    <span class="van-ellipsis">{{info.city}}{{info.area}}{{info.address2}}{{info.address1}}{{info.address}}</span>
                </div>
                <div class="tip">未结算货单-禁止继续下单，请及时提示商户结算</div>
                <div content="title">店铺基本信息</div>
                <div class="items">
                    <div>
                        <div class="money">{{info.todayTotal||'0'}}</div>
                        <div class="disc">今日下单(元)</div>
                    </div>
                    <div>
                        <div class="money">{{info.customerPrice||'--'}}</div>
                        <div class="disc">客单价(元)</div>
                    </div>
                    <div>
                        <div class="money">{{info.frequency||'--'}}</div>
                        <div class="disc">近30天频次</div>
                    </div>
                    <div>
                        <div class="money">{{info.sku||'--'}}</div>
                        <div class="disc">近30天均SKU</div>
                    </div>
                    <div>
                        <div class="money">{{info.couponTotal||'--'}}</div>
                        <div class="disc">优惠券</div>
                    </div>
                </div>
            </div>
            <div v-if="skuList[0]" class="more flex flex-between" @click="$router.push({name:'skuList',storeKeyId})">
                <div>近30天购买SKU</div>
                <div class="more1">查看更多
                    <van-icon name="arrow"></van-icon>
                </div>
            </div>
            <div class="sku-view">
                <skuItem  v-for="item,index in skuList" :key="index" :obj="item"></skuItem>
            </div>
            <div v-if="orderList" class="more flex flex-between" @click="$router.push({name:'orderList',storeKeyId})">
                <div>近30天订单记录</div>
                <div class="more1">查看更多
                    <van-icon name="arrow"></van-icon>
                </div>
            </div>
            <orderItem v-if="orderList" :obj="orderList"></orderItem>
            <div v-if="appraiseList" class="more flex flex-between">
                <div>最近7次订单评价</div>
                <!--<div class="more1">查看更多-->
                <!--<van-icon name="arrow"></van-icon>-->
                <!--</div>-->
            </div>
            <div v-if="appraiseList" class="star-view">
                <div class="star-item">
                <div>配送评价</div>
                <van-rate
                readonly
                v-model="appraiseList.deliveryLevel"
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
                v-model="appraiseList.qualityLevel"
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
                @confirm="confirmDate"
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
        <van-button type="primary" class="btn" v-if="!info.serviceSales" @click.native="pickUp(info.keyId)">拾取客户</van-button>
        <van-button type="primary" class="btn" v-if="info.serviceSales&&(info.stat==='EXAMINING'||info.stat==='REEXAMINING')" @click.native="goSh(info.stat,info.storeId)">去审核</van-button>
        <van-button type="primary" class="btn" v-if="info.serviceSales&&info.stat==='NORMAL'" @click.native="show=true">我要拜访</van-button>
    </div>
</template>

<script>
    import getYYR from '../../../mixins/getYYR'
    import phone from '../../my/storeNoPicked/img/phone.png'
    import position from '$img/postion.png'
    import fruit from '$img/fruit.png'
    import skuItem from './skuItem'
    import orderItem from './orderItem'
    import dd from '@/mixins/dd'
    export default {
        mixins: [getYYR,dd],
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
                skuList:[],
                orderList:'',
                appraiseList:'',
                timeChoose: [
                    {
                        active: true,
                        type:'0',
                        name: '今日拜访',
                        value: this.getYYR(new Date())
                    },
                    {
                        active: false,
                        type:'1',
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
            pickUp(keyId){
                this.$dialog.confirm({
                    title: '提示',
                    message: '是否拾取该用户'
                }).then(() => {
                    this.$post('/store/crm/store/pickUp',{keyId}).then(res=>{
                        if(res.code===0){
                            this.$toast('拾取成功')
                            this.getInfo()
                        }
                    }).catch(err=>{

                    })
                }).catch(() => {
                    this.$toast('已取消')
                });

            },
            confirmDate(){
                let visitDtType = ''
                this.timeChoose.forEach(item=>{
                    if(item.active){
                        visitDtType = item.type
                    }
                })
                this.$post('/visit/crm/visitPlan/addPlan',{storeKeyId:this.storeKeyId,visitDtType}).then(res=>{
                   if(res.code === 0){
                       this.$toast('已添加')

                   }
                }).catch(err=>{

                })
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
                    lng:this.mixins_longitude?this.mixins_longitude:120.21937542,
                    lat:this.mixins_latitude?this.mixins_latitude:30.25924446
                }).then(res => {
                    if (res.code === 0) {
                        this.info = res.data.storeInfo.storeCrmVo
                        this.skuList = res.data.storeInfo.skuDTOS
                        this.orderList = res.data.storeInfo.pageVO
                        this.appraiseList= res.data.storeInfo.appraiseDTO
                        console.log(this.info)
                    }
                }).catch(err => {

                })
            },
            goSh(stat,storeId){
                if(stat === 'EXAMINING'){
                    this.$router.push({name:'newUserReview',query:{p:'new',storeId}})
                }
                if(stat === 'REEXAMINING'){
                    this.$router.push({name:'newUserReview',query:{p:'update',storeId}})
                }
            }
        },
       async created() {
            await this.getLocation()
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
