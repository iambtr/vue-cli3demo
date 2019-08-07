<template>
    <div class="view">
        <van-nav-bar
                title="个人业绩"
        />
        <div class="container">
            <div class="tabs">
                <div v-for="item,index in screen" :key="index"
                     @click="choose(index)"
                     :class="{'active':item.active}"
                >{{item.name}}
                </div>
            </div>
            <div class="content flex">
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
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                screen: [
                    {
                        name: '今日',
                        active: true
                    },
                    {
                        name: '本周',
                        active: false
                    },
                    {
                        name: '本月',
                        active: false
                    },
                    {
                        name: '日期',
                        active: false
                    }
                ]
            }
        },
        methods: {
            choose(index) {
                this.screen.map(item => {
                    return item.active = false
                })
                this.screen[index].active = true
            }
        },
        created() {
        }
    }
</script>

<style scoped lang="less">
    .view{
        height: 100%;
        width: 100%;
        position: absolute;
        left: 0;
        top: 0;
    }
    .container {
        /*height: 100%;*/
        padding-top: 10px;
        /*padding-left: 10px;*/
        /*padding-right: 10px;*/

        & > .tabs {
            width: 100%;
            height: 40px;
            background: #ffffff;
            display: flex;
            border-bottom: 1px solid #f5f5f5;

            & > div {
                color: #1B1B1D;
                flex: 1;
                display: flex;
                justify-content: center;
                align-items: center;
            }

            & > .active {
                color: #FF8239;
            }
        }
        .content{
            padding: 20px;
            background: #ffffff;
            flex-wrap: wrap;
            &>div{
                width: 50%;
                height: 80px;
                font-size: 18px;
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
            }
        }
    }
    .red {
        color: #FF511D;
    }
</style>
