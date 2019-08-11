<template>
    <div style="height: 100%">
        <van-nav-bar
                fixed
                title="签到"
                left-arrow
                @click-left="onClickLeft"
        >
        </van-nav-bar>
        <div class="container">
            <div class="d1">{{visitPlan.storeName}}-{{visitPlan.storeKeyId}}</div>
            <div class="d2">联系人：{{visitPlan.contactName}}</div>
            <div class="d3">进店签到</div>
            <div class="d4" v-if="visitLog.entryDt">{{getHours(visitLog.entryDt)}}</div>
            <div class="d4" v-else>--:--</div>

            <div class="d5">
                <div class="flex flex-1 d6">
                    <img :src="position" alt="">
                    <span class="km">13.3km </span>
                    <span>{{mixins_address}}</span>
                </div>
                <div class="flex flex-center d7">
                    <img :src="refresh" alt="">
                </div>
            </div>
            <div style="text-align: center;width: 100%" v-if="visitLog.entryDt">
                <div class="d3">离店签到</div>

                <div class="d4" v-if="visitLog.exitDt">{{getHours(visitLog.exitDt)}}</div>
                <div class="d4" v-else>--:--</div>

                <div class="d5">
                    <div class="flex flex-1 d6">
                        <img :src="position" alt="">
                        <span class="km">13.3km </span>
                        <span>杭州市拱墅区三墩路85号</span>
                    </div>
                    <div class="flex flex-center d7">
                        <img :src="refresh" alt="">
                    </div>
                </div>
            </div>
            <div class="d8" v-if="visitLog.exitDt">
                <textarea placeholder="请填写拜访情况，至少10字，并至少上传一张照片" name="" id=""></textarea>
                <van-uploader class="upload"
                              v-model="fileList"
                              multiple
                              :max-count="3"
                />
                <img class="camera" :src="camera" alt="">
            </div>
        </div>
        <van-button type="primary" class="btn" v-if="!visitLog.entryDt" @click="signIn('in')">我已进店</van-button>
        <van-button type="primary" class="btn" v-if="visitLog.entryDt&&!visitLog.exitDt"  @click="signIn('out')">我已离店</van-button>
        <van-button type="primary" class="btn" v-if="visitLog.exitDt">完成拜访</van-button>
    </div>
</template>

<script>
    import position from '$img/postion.png'
    import refresh from '$img/refresh.png'
    import camera from '$img/camera.png'
    import dd from '@/mixins/dd'
    export default {
        mixins:[dd],
        data() {
            return {
                position,
                refresh,
                camera,
                fileList: [],
                planId: '',
                visitPlan: '',
                visitLog: ''

            }
        },
        methods: {
            getVisitedInfo() {
                this.$get('/visit/crm/visitLog/getDetail', {planId: this.planId}).then(res => {
                    if (res.code === 0) {
                        this.visitPlan = res.data.visitPlan
                        this.visitLog = res.data.visitLog
                    }
                }).catch(err => {

                })
            },
            getHours(time) {
                let hours = time.getHours() > 9 ? time.getHours() : '0' + time.getHours()
                let min = time.getMinutes() > 9 ? time.getMinutes() : '0' + time.getMinutes()
                return hours + ':' + min
            },
            rad(d) {
                return d * Math.PI / 180.0;
            },
            geoDistance(lat1, lng1, lat2, lng2) {
                let radLat1 = this.rad(lat1);
                let radLat2 = this.rad(lat2);
                let a = radLat1 - radLat2;
                let b = this.rad(lng1) - this.rad(lng2);
                let s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
                s = s * 6378.137;// EARTH_RADIUS;
                s = Math.round(s * 10000) / 10000; //输出为公里
                return s;
            },
            signIn(type){
                this.$post('/visit/crm/visitLog/signIn',
                    {
                        "address": "string",
                        "keyId": this.planId,
                        "latitude": "string",
                        "longitude": "string",
                        "type": type==='in'? 0:1
                    }
                ).then(res=>{
                    if(res.code ===0 ){
                        this.getVisitedInfo()
                    }
                }).catch(err=>{

                })
            }

        },
        created() {
            this.getLocation()
            this.planId = this.$route.query.planId
            this.getVisitedInfo()
        }
    }
</script>
<style>
    .d8 .van-uploader__upload {
        margin-bottom: 0;
    }
</style>
<style scoped>
    .container {
        background: #ffffff;
        min-height: 100%;
        padding-top: 46px;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding-right: 25px;
        padding-left: 25px;
    }

    img {
        width: 12px;
        height: 12px;
    }

    .d1 {
        font-size: 18px;
        color: #333;
        margin-top: 10px;
    }

    .d2 {
        color: #666;
        margin-top: 5px;
    }

    .d3 {
        color: #999999;
        margin-top: 30px;
    }

    .d4 {
        font-size: 23px;
        color: #A1AAB8;
        margin-top: 5px;
    }

    .d5 {
        height: 28px;
        line-height: 28px;
        background: #F5F8FA;
        width: 100%;
        color: #A1AAB8;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0 10px;
    }

    .d6 {
        align-items: center;
    }

    .km {
        padding: 0 10px;
    }

    .d7 {
        width: 30px;
        height: 28px;
        justify-content: flex-end;
    }

    .btn {
        width: 160px;
        position: fixed;
        left: 50%;
        right: 50%;
        margin-left: -80px;
        bottom: 10px;
    }

    .d8 {
        margin-top: 25px;
        width: 100%;
        border: 1px solid #e5e5e5;
        min-height: 125px;
        padding: 5px 10px;
        position: relative;
    }

    textarea {
        width: 100%;
        color: #999999;
        line-height: 20px;
        height: 64px;
    }

    textarea::-webkit-input-placeholder {
        color: #999999;
    }

    .upload {
        margin-top: 5px;
    }

    .camera {
        position: absolute;
        right: 10px;
        bottom: 5px;
        width: 25px;
        height: 25px;
    }
</style>
