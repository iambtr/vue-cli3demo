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
                <div><span class="red">15</span>/30</div>
            </div>
            <div class="flex flex-column flex-center">
                <p>销售排名</p>
                <div><span class="red">15</span>/30</div>
            </div>
            <div class="flex flex-column flex-center">
                <p>日均SKU</p>
                <div><span class="red">15</span>/30</div>
            </div>
            <div class="flex flex-column flex-center">
                <p>客单价</p>
                <div><span class="red">15</span>/30</div>
            </div>
            <div class="flex flex-column flex-center">
                <p>新开</p>
                <div><span class="red">15</span>/30</div>
            </div>
            <div class="flex flex-column flex-center">
                <p>拜访</p>
                <div><span class="red">15</span>/30</div>
            </div>
            <div class="flex flex-column flex-center">
                <p>注册</p>
                <div><span class="red">15</span>/30</div>
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
            <div @click="$router.push({name:'newUserReview',params:{p:'new'}})">
                <div>
                    <img :src="newUser" alt="">
                </div>
                <div>新商户审核</div>
                <div class="deal">1条待处理</div>
            </div>
            <div @click="$router.push({name:'newUserReview',params:{p:'update'}})">
                <div>
                    <img :src="infoUpdate" alt="">
                </div>
                <div>信息更新审核</div>
                <div class="deal">1条待处理</div>
            </div>
            <div @click="$router.push({name:'visitList'})">
                <div>
                    <img :src="plan" alt="">
                </div>
                <div>拜访计划</div>
                <div class="deal">1条待访</div>
            </div>
        </div>
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
                plan
            }
        },
        methods: {
            onClickRight() {

            }
        },
        created() {
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
