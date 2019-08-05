<template>
    <div class="main-view">
        <router-view/>
        <van-tabbar route fixed safe-area-inset-bottom>
            <van-tabbar-item
                    replace
                    to="/home"
                    icon="home-o"
            >
                首页
            </van-tabbar-item>
            <van-tabbar-item
                    replace
                    to="/client"
                    icon="search"
            >
                客户
            </van-tabbar-item>
            <van-tabbar-item
                    replace
                    to="/performance"
                    icon="search"
            >
                业绩
            </van-tabbar-item>
            <van-tabbar-item
                    replace
                    to="/my"
                    icon="search"
            >
                我的
            </van-tabbar-item>
        </van-tabbar>

    </div>
</template>

<script>
    export default {

        data() {
            return {
                active:1
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
