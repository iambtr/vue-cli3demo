<template>
    <div class="main-view">
        <router-view/>
        <van-tabbar route fixed safe-area-inset-bottom>
            <van-tabbar-item
                    replace
                    to="/home"
            >
                首页
                <img
                        slot="icon"
                        slot-scope="props"
                        :src="props.active ? icon0.active : icon0.normal"
                >
            </van-tabbar-item>
            <van-tabbar-item
                    replace
                    to="/client"
            >
                客户
                <img
                        slot="icon"
                        slot-scope="props"
                        :src="props.active ? icon1.active : icon1.normal"
                >
            </van-tabbar-item>
            <van-tabbar-item
                    replace
                    to="/performance"
            >
                业绩
                <img
                        slot="icon"
                        slot-scope="props"
                        :src="props.active ? icon2.active : icon2.normal"
                >
            </van-tabbar-item>
            <van-tabbar-item
                    replace
                    to="/my"
            >
                我的
                <img
                        slot="icon"
                        slot-scope="props"
                        :src="props.active ? icon3.active : icon3.normal"
                >
            </van-tabbar-item>
        </van-tabbar>

    </div>
</template>

<script>
    export default {

        data() {
            return {
                icon0: {
                    normal: require('$img/home.png'),
                    active: require('$img/home_1.png')
                },
                icon1: {
                    normal: require('$img/client.png'),
                    active: require('$img/client_1.png')
                },
                icon2: {
                    normal: require('$img/performance.png'),
                    active: require('$img/performance_1.png')
                },
                icon3:{
                    normal: require('$img/my.png'),
                    active: require('$img/my_1.png')
                }
            }
        },
        methods: {},
        created() {
        }
    }
</script>

<style scoped>
    .main-view {
        min-height: 100%;
    }
</style>
