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
            <div class="d1">观丰水果店-010669900</div>
            <div class="d2">联系人：李丽娟</div>
            <div class="d3">进店签到</div>
            <div class="d4">--:--</div>
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
            <div class="d3">离店签到</div>
            <div class="d4">--:--</div>
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
            <div class="d8">
                <textarea placeholder="请填写拜访情况，至少10字，并至少上传一张照片" name="" id=""></textarea>
                <van-uploader class="upload"
                              v-model="fileList"
                              multiple
                              :max-count="3"
                />
                <img class="camera" :src="camera" alt="">
            </div>
        </div>
        <van-button type="primary" class="btn">我已进店</van-button>
        <van-button type="primary" class="btn">我已离店</van-button>
        <van-button type="primary" class="btn">完成拜访</van-button>
    </div>
</template>

<script>
    import position from '$img/postion.png'
    import refresh from '$img/refresh.png'
    import camera from '$img/camera.png'
    export default {
        data() {
            return {
                position,
                refresh,
                camera,
                fileList: []
            }
        },
        methods: {},
        created() {
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
    .camera{
        position: absolute;
        right: 10px;
        bottom: 5px;
        width: 25px;
        height: 25px;
    }
</style>
