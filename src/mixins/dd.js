export default {
    data(){
        return{
            mixins_longitude:'',
            mixins_latitude:'',
            mixins_address:''
        }
    },
    methods:{
        goTell(tell){
            this.$dd.ready(()=> {
                this.$dd.biz.telephone.showCallMenu({
                    phoneNumber: tell, // 期望拨打的电话号码
                    code: '+86', // 国家代号，中国是+86
                    showDingCall: true, // 是否显示钉钉电话
                    onSuccess: function () {
                    },
                    onFail: function () {
                    }
                })
            })
        },
        getLocation(){
            this.$dd.ready(()=> {
                this.$dd.device.geolocation.get({
                    targetAccuracy : 200,
                    coordinate : 1,
                    withReGeocode : true,
                    useCache:true, //默认是true，如果需要频繁获取地理位置，请设置false
                    onSuccess : (result)=>{
                        this.mixins_latitude = result.latitude
                        this.mixins_longitude = result.longitude
                        this.mixins_address = result.address
                    },
                    onFail : function(err) {
                        alert('err:'+JSON.stringify(err))
                    }
                })
            })
        },

    }
}
