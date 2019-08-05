<template>
    <div>
        <van-nav-bar
                title="小果攻CRM"
        />
        <div class="top flex flex-center flex-column">
            <div class="">订单总额</div>
            <div class="">12091.62 <span>元</span></div>
            <van-progress class="progress"
                          :show-pivot="false"
                          color="#fff"
                          :percentage="percent"
            />
            <div>当日进货指标:20000.00</div>
        </div>
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

<style scoped>
    .top {
        height: 156px;
        background: linear-gradient(45deg, rgba(255, 155, 0, 1) 0%, rgba(255, 192, 70, 1) 100%);
        color: #fff;
        padding: 0 35px;

    }

    .progress {
        width: 100%;
        height: 5px;
    }
</style>
