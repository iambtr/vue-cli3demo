<template>
    <div>
        <van-nav-bar
                title="小果攻CRM"
        />
        <div class="flex  flex-column top ">
            <div class="">订单总额</div>
            <div class="money">12091.62 <span class="yuan">元</span></div>
            <van-progress class="progress"
                          :show-pivot="false"
                          color="#fff"
                          :percentage="percent"
            />
            <div>当日进货指标:20000.00</div>
        </div>
        <div class="mid padding10 flex">
            <div class="flex flex-column flex-center">
                <p>日活</p>
                <div>{{homeInfo.living}}</div>
            </div>
            <div class="flex flex-column flex-center">
                <p>销售排名</p>
                <div>{{homeInfo.ranking}}</div>
            </div>
            <div class="flex flex-column flex-center">
                <p>日均SKU</p>
                <div>{{homeInfo.avgSKU}}</div>
            </div>
            <div class="flex flex-column flex-center">
                <p>客单价</p>
                <div>{{homeInfo.perCustomerTransaction}}</div>
            </div>
            <div class="flex flex-column flex-center">
                <p>新开</p>
                <div>{{homeInfo.newOpen}}</div>
            </div>
            <div class="flex flex-column flex-center">
                <p>拜访</p>
                <div>{{homeInfo.visit}}</div>
            </div>
            <div class="flex flex-column flex-center">
                <p>注册</p>
                <div>{{homeInfo.register}}</div>
            </div>
            <div class="flex flex-column flex-center" @click="$router.push({name:'performance'})">
                <p>查看更多</p>
                <div class="flex dian">
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>
        </div>
        <div class="bottom padding10 flex">
            <div @click="$router.push({name:'newUserReview',query:{p:'new'}})">
                <div>
                    <img :src="newUser" alt="">
                </div>
                <div>新商户审核</div>
                <div class="deal">{{itemNum.examining}}条待处理</div>
            </div>
            <div @click="$router.push({name:'newUserReview',query:{p:'update'}})">
                <div>
                    <img :src="infoUpdate" alt="">
                </div>
                <div>信息更新审核</div>
                <div class="deal">{{itemNum.reexamining}}条待处理</div>
            </div>
            <div @click="$router.push({name:'visitList'})">
                <div>
                    <img :src="plan" alt="">
                </div>
                <div>拜访计划</div>
                <div class="deal">{{itemNum.visitPlan}}条待访</div>
            </div>
        </div>
        {{error}}
    </div>
</template>

<script>
    import newUser from '$img/newUser.png'
    import infoUpdate from '$img/infoUpdate.png'
    import plan from '$img/plan.png'

    export default {
        data() {
            return {
                percent: 25,
                newUser,
                infoUpdate,
                plan,
                itemNum:'',
                error:''
            }
        },
        methods: {
            onClickRight() {

            },
            getItemNum(){
                this.$get('/store/crm/store/queryCheckSummary').then(res=>{
                    if(res.code===0){
                        this.itemNum = res.data
                    }
                }).catch(err=>{

                })
            },

        },
        computed:{
            homeInfo(){
                return this.$store.state.homeInfo
            }
        },
        created() {
            this.getItemNum()
            this.$store.dispatch('getHomeInfo')
            this.$get('/dingtalk/sign',{url:'http://'+location.host}).then(res=>{
                if(res.code === 0){
                    let config = res.data
                    console.log(JSON.stringify(config))
                    this.$dd.config(
                        {
                            agentId: config.agentId, // 必填，微应用ID
                            corpId: config.corpId,//必填，企业ID
                            timeStamp: config.timeStamp, // 必填，生成签名的时间戳
                            nonceStr: config.nonceStr, // 必填，生成签名的随机串
                            signature: config.signature, // 必填，签名
                            type:0,   //选填。0表示微应用的jsapi,1表示服务窗的jsapi；不填默认为0。该参数从dingtalk.js的0.8.3版本开始支持
                            jsApiList : [
                                'biz.telephone.showCallMenu',
                                'device.geolocation.get',
                                'biz.map.view',
                                'biz.map.locate'
                            ] // 必填，需要使用的jsapi列表，注意：不要带dd。
                        }
                    )
                    this.$dd.ready(()=> {
                        this.$dd.device.geolocation.get({
                            targetAccuracy : Number,
                            coordinate : Number,
                            withReGeocode : Boolean,
                            useCache:true, //默认是true，如果需要频繁获取地理位置，请设置false
                            onSuccess : function(result) {
                                alert('success:'+JSON.stringify(result))
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
                            },
                            onFail : function(err) {
                                alert('err:'+JSON.stringify(err))
                            }
                        });
                    })
                    this.$dd.error((error)=>{
                        this.error = JSON.stringify(error)
                        console.log(JSON.stringify(error))
                        alert('dd error: ' + JSON.stringify(error));
                    })
                }
            
            }).catch(err=>{
            
            })
        }
    }
</script>

<style scoped lang="less">
    .top {
        height: 156px;
        background: linear-gradient(45deg, rgba(255, 155, 0, 1) 0%, rgba(255, 192, 70, 1) 100%);
        color: #fff;
        padding: 20px 35px;
        align-items: center;
    }

    .progress {
        width: 100%;
        height: 5px;
        margin-bottom: 8px;
    }

    .money {
        font-size: 28px;

        .yuan {
            font-size: 14px;
        }

        margin-bottom: 18px;
    }

    .mid {
        margin-top: -25px;
        margin-left: 10px;
        margin-right: 10px;
        background: #ffffff;
        border-radius: 5px;
        padding: 25px;
        justify-content: space-around;
        flex-wrap: wrap;

        .red {
            color: #FF511D;
        }

        & > div {
            font-size: 14px;
            width: 25%;
            color: #666;

            p {
                margin: 0;
                font-size: 12px;
                font-weight: normal;
                color: #A1AAB8;
                padding-bottom: 5px;
            }

            div {
                height: 20px;
                line-height: 20px;
            }

            .dian {
                & > div {
                    border-radius: 50%;
                    width: 4px;
                    height: 4px;
                    background: #666;
                    margin: 8px 4px;
                }

                & > div:first-child {
                    background: #333;
                }

                & > div:last-child {
                    background: #999;
                }
            }
        }

        & > div:nth-child(-n+4) {
            margin-bottom: 20px;
        }
    }

    .bottom {
        padding: 25px 0;
        background: #ffffff;
        margin-left: 10px;
        margin-right: 10px;
        border-radius: 5px;
        margin-top: 10px;
        color: #666;
        font-size: 13px;
        & > div {

            width: 33.3333%;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            img {
                margin-bottom: 10px;
                width: 20px;
                height: 20px;
            }
            .deal{
                margin-top: 2px;
                font-size: 12px;
                color: #999;
            }
        }
    }
</style>
