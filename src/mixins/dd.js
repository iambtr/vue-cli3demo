export default {
    data(){
        return{
            mixins_longitude:'',
            mixins_latitude:'',
            mixins_address:''
        }
    },
    methods:{
        jsapi(callback){
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
                                'biz.map.view'
                            ] // 必填，需要使用的jsapi列表，注意：不要带dd。
                        }
                    )
                    callback()
                    this.$dd.error((error)=>{
                        this.error = JSON.stringify(error)
                        console.log(JSON.stringify(error))
                        // alert('dd error: ' + JSON.stringify(error));
                    })
                }
            }).catch(err=>{

            })
        },
        goTell(tell){
            this.$dd.ready(()=> {
                this.$dd.biz.telephone.showCallMenu({
                    phoneNumber: tell, // 期望拨打的电话号码
                    code: '+86', // 国家代号，中国是+86
                    showDingCall: true, // 是否显示钉钉电话
                    onSuccess: function () {
                    },
                    onFail:  ()=>{
                        this.jsapi(this.goTell)
                    }
                })
            })
        },
        getMap(longitude,latitude,title){
            this.$dd.ready(()=> {
                this.$dd.biz.map.view({
                    latitude:Number(latitude),
                    longitude:Number(longitude),
                    title:title,
                    onFail : (err)=>{
                        this.jsapi(this.getLocation)
                    }
                })
            })
        },
       async getLocation(callback){
            this.$dd.ready(()=> {
                this.$dd.device.geolocation.get({
                    targetAccuracy : 200,
                    coordinate : 1,
                    withReGeocode : true,
                    useCache:true, //默认是true，如果需要频繁获取地理位置，请设置false
                    onSuccess : (result)=>{
                        this.mixins_latitude = result.latitude.toFixed(6)
                        this.mixins_longitude = result.longitude.toFixed(6)
                        this.mixins_address = result.address
                        callback()
                    },
                    onFail : (err)=>{
                        this.jsapi(this.getLocation)
                    }
                })
            })
        },

    }
}
