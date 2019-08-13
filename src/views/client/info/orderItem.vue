<template>
    <div class="order-view">
        <div class="order-top flex-between flex">
            <div>{{obj.oprDt}}</div>
            <div>{{getStat(obj.stat)}}</div>
        </div>
        <div class="order-box flex flex-between">
            <div>
                <img v-for="item,index in obj.goodsPicNameList" :src="item.picUrl" :alt="item.goodsName">
            </div>
            共{{obj.orderQty}}件
        </div>
        <div class="really-pay">实付：<span class="money">&yen;{{obj.cashTotal}}</span></div>
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
        props: {
            obj: Object
        },
        methods: {
            getStat(stat) {

                switch (stat) {
                    case 'CREATED':
                        return '待付款';
                    case 'PAID':
                        return '已付款';
                    case 'SUBMIT':
                        return '已提交';
                    case 'PEPARE':
                        return '备货中';
                    case 'CANCEL':
                        return '已取消';
                    case 'REFUND':
                        return '已退款';
                    case 'DELIVERY':
                        return '配送中';
                    case 'DELAYPAY':
                        return '货到待付款';
                    case 'DISPARITY':
                        return '差价待处理';
                    case 'FINISH':
                        return '已完成';
                    default:
                        return ''
                }
            }
        },
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
            align-items: center;

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
