<template>
    <div>
        <van-nav-bar
                fixed
                title="近期SKU详情"
                left-arrow
                @click-left="onClickLeft"
        >
        </van-nav-bar>
        <div class="container">
            <skuItem :obj="{}"></skuItem>
            <skuItem :obj="{}"></skuItem>
        </div>
    </div>
</template>

<script>
    import skuItem from './skuItem'
    export default {
        components:{skuItem},
        data() {
            return {

            }
        },
        methods: {},
        created() {
        }
    }
</script>

<style scoped lang="less">
    .container {
        padding: 56px 10px;
    }

</style>
