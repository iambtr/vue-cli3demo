<template>
    <div>
        <van-nav-bar
                title="小果攻CRM"
        />
        <div class="top flex flex-center flex-column">
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
            <div class="flex flex-column flex-center">
                <p>查看更多</p>
                <div class="flex dian">
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>
        </div>
        <div class="bottom padding10"></div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                percent:25
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
        padding: 0 35px;

    }

    .progress {
        width: 100%;
        height: 5px;
        margin-bottom: 8px;
    }
    .money{
        font-size: 28px;
        .yuan{
            font-size: 14px;
        }
        margin-bottom: 18px;
    }
    .mid{
        margin-top:-25px;
        margin-left: 10px;
        margin-right: 10px;
        background: #ffffff;
        border-radius:5px;
        padding: 25px;
        justify-content: space-around;
        flex-wrap: wrap;
        .red{
            color: #FF511D;
        }
        &>div{
            font-size: 14px;
            width: 25%;
            color: #666;
            p{
                margin: 0;
                font-size: 12px;
                font-weight: normal;
                color: #A1AAB8;
                padding-bottom: 5px;
            }
            div{
                height: 20px;
                line-height: 20px;
            }
            .dian{


                &>div{
                    border-radius: 50%;
                    width: 4px;
                    height: 4px;
                    background: #666;
                    margin: 8px 4px;
                }
                &>div:first-child{
                    background: #333;
                }
                &>div:last-child{
                    background: #999;
                }
            }
        }
        &>div:nth-child(-n+4){
            margin-bottom: 20px;
        }
    }
</style>
