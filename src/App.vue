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
                this.$get('/dingtalk/sign',{url:'http://'+location.host+'/crm/'}).then(res=>{
                    if(res.code === 0){
                        let config = res.data
                        console.log(JSON.stringify(config))
                        this.$dd.config(
                            {
                                agentId: config.agentId, // 必填，微应用ID
                                corpId: config.corpId,//必填，企业ID
                                timeStamp: config.timeStamp, // 必填，生成签名的时间戳
                                nonceStr: config.nonceStr, // 必填，生成签名的随机串
                                signature: config.signature, // 必填，签名
                                type:0,   //选填。0表示微应用的jsapi,1表示服务窗的jsapi；不填默认为0。该参数从dingtalk.js的0.8.3版本开始支持
                                jsApiList : [
                                    'biz.telephone.showCallMenu',
                                    'device.geolocation.get',
                                ] // 必填，需要使用的jsapi列表，注意：不要带dd。
                            }
                        )
                        this.$dd.error((error)=>{
                            this.error = JSON.stringify(error)
                            console.log(JSON.stringify(error))
                            // alert('dd error: ' + JSON.stringify(error));
                        })
                    }
                }).catch(err=>{

                })
            }
        },
        created() {
            if(localStorage.getItem('token')){
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
