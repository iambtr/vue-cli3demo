<template>

    <div class="sku-item">
        <div class="flex flex-between">
            <div class="disc">{{obj.goodsName}}</div>
            <div class="buy-time">购买次数：<span class="color">{{obj.buyTimes}}</span></div>
        </div>
        <div>单价：&yen;{{obj.price}} &nbsp;&nbsp; 代码：{{obj.goodsCode}}</div>
    </div>

</template>

<script>
    export default {
        data() {
            return {}
        },
        props: {
            obj: Object
        },
        methods: {},
        created() {
        }
    }
</script>

<style scoped lang="less">
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

    .sku-item {
        margin-bottom: 10px;
    }
</style>
