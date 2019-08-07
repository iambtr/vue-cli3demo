<template>
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
</template>

<script>
    import fruit from '$img/fruit.png'

    export default {
        data() {
            return {
                fruit
            }
        },
        methods: {},
        created() {
        }
    }
</script>

<style scoped lang="less">
    .order-view {
        padding: 15px;
        border-radius: 3px;
        background: #ffffff;
        margin-bottom: 10px;
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
</style>
