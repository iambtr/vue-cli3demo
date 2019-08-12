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
                    <span class="km">{{distance}}km </span>
                    <span v-if="visitLog.entryAddress" class="van-ellipsis">{{visitLog.entryAddress}}</span>
                    <span v-else class="van-ellipsis">{{mixins_address}}</span>

                </div>
                <div class="flex flex-center d7" v-if="!visitLog.entryDt" @click="goRefresh('in')">
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
                        <span class="km">{{distance}}km </span>
                        <span v-if="visitLog.exitAddress" class="flex-1 van-ellipsis">{{visitLog.exitAddress}}</span>
                        <span v-else class="flex-1 van-ellipsis">{{mixins_address}}</span>
                    </div>
                    <div class="flex flex-center d7" v-if="visitLog.entryDt&&!visitLog.exitDt"
                         @click="goRefresh('out')">
                        <img :src="refresh" alt="">
                    </div>
                </div>
            </div>
            <div class="d8" v-if="visitLog.exitDt">
                <textarea placeholder="请填写拜访情况，至少10字，并至少上传一张照片" v-model="remark" name="" id=""></textarea>
                <van-uploader class="upload"
                              v-model="fileList"
                              multiple
                              accept="image/*"
                              :before-read="beforeRead" :after-read="onRead"
                              :max-count="3"
                              capture="camera"
                />
                <img class="camera" :src="camera" alt="">
            </div>
        </div>
        <van-button type="primary" class="btn" v-if="!visitLog.entryDt" @click="signIn('in')">我已进店</van-button>
        <van-button type="primary" class="btn" v-if="visitLog.entryDt&&!visitLog.exitDt" @click="signIn('out')">我已离店
        </van-button>
        <van-button type="primary" class="btn" v-if="visitLog.exitDt" @click="finishPlan">完成拜访</van-button>
    </div>
</template>

<script>
    import position from '$img/postion.png'
    import refresh from '$img/refresh.png'
    import camera from '$img/camera.png'
    import dd from '@/mixins/dd'
    import axios from 'axios'

    export default {
        mixins: [dd],
        data() {
            return {
                position,
                refresh,
                camera,
                fileList: [],
                planId: '',
                visitPlan: '',
                visitLog: '',
                remark: '',
                distance: '',
            }
        },
        methods: {
            beforeRead(file) {
                console.log(file)
                if (file.length > 1) {
                    this.$toast('请选取一张图片')
                    return false
                }
                return true
            },
            onRead(file) {
                this.confirm(file, 0)
            },
            confirm(file, index) {
                let formData = new FormData()
                if (file.file.size / 1024 > 500) {

                    let image = new Image() //新建一个img标签（还没嵌入DOM节点)
                    image.src = file.content
                    console.log(file)
                    image.onload = () => {
                        let canvas = document.createElement('canvas'),
                            context = canvas.getContext('2d'),
                            ratio = image.width / image.height,
                            imageWidth = 800,    //压缩后图片的大小
                            imageHeight = imageWidth / ratio,
                            data = ''

                        canvas.width = imageWidth
                        canvas.height = imageHeight

                        context.drawImage(image, 0, 0, imageWidth, imageHeight)

                        data = this.dataURLtoFile(canvas.toDataURL('image/jpeg'), file.file)
                        formData.append('file', data, data.name)

                        this.postImg(formData, index)
                    }
                } else {
                    formData.append('file', file.file, file.file.name)
                    this.postImg(formData, index)
                }
            },
            postImg(formData, index) {
                axios.post(`${process.uploadUrl}/sys/oss/upload`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }).then(res => {
                    if (res.data.code === 0) {
                        this.fileList[this.fileList.length - 1].content = res.data.data.url
                    }
                }).catch(err => {
                    this.$toast.fail(err)
                    this.fileList = this.fileList.slice(0, this.fileList.length - 1)
                    this.$store.commit('loading', false)
                })
            },
            dataURLtoFile(dataurl, file) {
                var arr = dataurl.split(","),
                    bstr = atob(arr[1]),
                    n = bstr.length,
                    u8arr = new Uint8Array(n);
                while (n--) {
                    u8arr[n] = bstr.charCodeAt(n);
                }
                return new File([u8arr], file.name, {
                    type: file.type
                });
            },
            async goRefresh() {
                await this.getLocation()
                this.distance = this.geoDistance(this.visitPlan.latiLongi.split(',')[0],this.visitPlan.latiLongi.split(',')[1],this.mixins_latitude,this.mixins_longitude)
            },
            getVisitedInfo() {
                this.$get('/visit/crm/visitLog/getDetail', {planId: this.planId}).then(res => {
                    if (res.code === 0) {
                        this.visitPlan = res.data.visitPlan
                        this.visitLog = res.data.visitLog
                    }
                    this.distance = this.geoDistance(this.visitPlan.latiLongi.split(',')[0],this.visitPlan.latiLongi.split(',')[1],this.mixins_latitude,this.mixins_longitude)
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
                return s.toFixed(2);
            },
            async signIn(type) {
                await this.getLocation()
                this.$post('/visit/crm/visitLog/signIn',
                    {
                        "address": this.mixins_address,
                        "keyId": this.visitLog.keyId,
                        "latitude": this.mixins_latitude,
                        "longitude": this.mixins_longitude,
                        "type": type === 'in' ? 0 : 1
                    }
                ).then(res => {
                    if (res.code === 0) {
                        this.getVisitedInfo()
                    }
                }).catch(err => {

                })
            },
            finishPlan() {
                let arr = []
                this.fileList.forEach(item => {
                    arr.push(item.content)
                })
                this.$post('/visit/crm/visitLog/finish', {
                    "keyId": this.visitLog.keyId,
                    "visitPictures": arr,
                    "visitRemarks": this.remark
                }).then(res => {
                    if (res.code === 0) {
                        this.$toast('完成拜访')
                        this.$router.back()
                    }
                }).catch(err => {

                })
            }

        },
        async created() {
            await this.getLocation()
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
        width: 100%;
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
