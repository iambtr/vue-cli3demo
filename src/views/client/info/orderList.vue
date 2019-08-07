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
            <orderItem></orderItem>
            <orderItem></orderItem>
        </div>
    </div>
</template>

<script>
    import orderItem from './orderItem'

    export default {
        components: {
            orderItem
        },
        data() {
            return {}
        },
        methods: {},
        created() {
        }
    }
</script>

<style scoped>
    .container {
        padding: 56px 10px;
    }
</style>
