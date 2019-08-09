<template>
    <div id="app">
        <router-view/>
        <div class="loading" v-show="loading">
            <van-loading class="demo-loading" color="white"/>
        </div>
    </div>
</template>
<script>
    export default {
        computed: {
            loading() {
                return this.$store.state.loading
            }
        },
        methods:{
            jsapi(){


            }
        },
        created() {
            if(sessionStorage.getItem('token')){
                this.jsapi()
            }
        }
    }
</script>
<style lang="less">
    #app {
        font-family:PingFangSC-Medium,'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        font-size: 12px;
    }

    .van-nav-bar {
        box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.1);
    }

    .loading {
        width: 100%;
        height: 100%;
        position: fixed;
        left: 0;
        top: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: rgba(0, 0, 0, 0.5);
        z-index: 2;
    }

    .van-tabbar-item__icon img {
        width: 26px;
        height: 26px;
    }
</style>
