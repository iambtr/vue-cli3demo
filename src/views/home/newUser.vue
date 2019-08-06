<template>
    <div>
        <van-nav-bar
                fixed
                title="新用户审核"
                left-arrow
                @click-left="onClickLeft"
        >
        </van-nav-bar>
        <van-search
                class="marginTop"
                v-model="searchValue"
                placeholder="搜索门店/代码/联系人"
                show-action
                @search="onSearch"
                @cancel="onCancel"
        />
        <div class="list-container">
            <div class="list">
                <div class="top flex">
                    <div>
                        <img :src="head" alt="">
                    </div>
                    <div class="flex-1">
                        <h3>雍容华庭水果店-24010344</h3>
                        <span class="wait">待审核</span>
                    </div>
                </div>
                <div class="info">
                    <div class="flex info-item">
                        <span> 联系人：</span>
                        <div class="flex-1">王二 15700008888</div>
                    </div>
                    <div class="flex info-item">
                        <span> 门店地址：</span>
                        <div class="flex-1">浙江省杭州市余杭区星桥街道广厦天都城紫韵公寓3栋观丰水果店</div>
                    </div>
                    <div class="flex info-item">
                        <span> 仓库：</span>
                        <div class="flex-1" v-if="!editItem.whCode" @click="show1 = true">
                            请选择
                        </div>
                        <div class="flex-1" v-else @click="show1 = true">
                            {{editItem.whCode}}
                        </div>
                    </div>
                    <div class="flex info-item">
                        <span> 配送方案：</span>
                        <div class="flex-1" v-if="!editItem.plan" @click="show2 = true">
                            请选择
                        </div>
                        <div class="flex-1" v-else @click="show2 = true">
                            {{editItem.plan}}
                        </div>
                    </div>
                    <div class="flex-between flex upload">
                        <div class="">
                            <div class="title">门头</div>
                            <van-uploader :multiple="isFalse" accept="image/*" class="upload"
                                          :before-read="beforeRead" :after-read="onRead1">
                                <div class="upload-img">
                                    <div class="noUpload flex flex-center">
                                        <img :src="upload" alt="">
                                    </div>
                                    <img src="" alt="">
                                </div>
                            </van-uploader>
                        </div>
                        <div class="">
                            <div class="title">营业执照</div>
                            <van-uploader :multiple="isFalse" accept="image/*" class="upload"
                                          :before-read="beforeRead" :after-read="onRead2">
                                <div class="upload-img">
                                    <div class="noUpload flex flex-center">
                                        <img :src="upload" alt="">
                                    </div>
                                    <img src="" alt="">
                                </div>
                            </van-uploader>
                        </div>
                    </div>
                    <div class="flex button-view flex-end">
                        <van-button class="default-btn" size="small" type="default">拒绝</van-button>
                        <van-button size="small" type="primary">通过</van-button>
                    </div>
                </div>
            </div>
            <div class="list">
                <div class="top flex">
                    <div>
                        <img :src="head" alt="">
                    </div>
                    <div class="flex-1">
                        <h3>雍容华庭水果店-24010344</h3>
                        <span class="wait">待审核</span>
                    </div>
                </div>
                <div class="info">
                    <div class="flex info-item">
                        <span> 联系人：</span>
                        <div class="flex-1">王二 15700008888</div>
                    </div>
                    <div class="flex info-item">
                        <span> 门店地址：</span>
                        <div class="flex-1">浙江省杭州市余杭区星桥街道广厦天都城紫韵公寓3栋观丰水果店</div>
                    </div>
                    <div class="flex info-item">
                        <span> 仓库：</span>
                        <div class="flex-1" v-if="!editItem.whCode" @click="show1 = true">
                            请选择
                        </div>
                        <div class="flex-1" v-else @click="show1 = true">
                            {{editItem.whCode}}
                        </div>
                    </div>
                    <div class="flex info-item">
                        <span> 配送方案：</span>
                        <div class="flex-1" v-if="!editItem.plan" @click="show2 = true">
                            请选择
                        </div>
                        <div class="flex-1" v-else @click="show2 = true">
                            {{editItem.plan}}
                        </div>
                    </div>
                    <div class="flex-between flex upload">
                        <div class="">
                            <div class="title">门头</div>
                            <van-uploader :multiple="isFalse" accept="image/*" class="upload"
                                          :before-read="beforeRead" :after-read="onRead1">
                                <div class="upload-img">
                                    <div class="noUpload flex flex-center">
                                        <img :src="upload" alt="">
                                    </div>
                                    <img src="" alt="">
                                </div>
                            </van-uploader>
                        </div>
                        <div class="">
                            <div class="title">营业执照</div>
                            <van-uploader :multiple="isFalse" accept="image/*" class="upload"
                                          :before-read="beforeRead" :after-read="onRead2">
                                <div class="upload-img">
                                    <div class="noUpload flex flex-center">
                                        <img :src="upload" alt="">
                                    </div>
                                    <img src="" alt="">
                                </div>
                            </van-uploader>
                        </div>
                    </div>
                    <div class="flex button-view flex-end">
                        <van-button class="default-btn" size="small" type="default">拒绝</van-button>
                        <van-button size="small" type="primary">通过</van-button>
                    </div>
                </div>
            </div>
        </div>
        <van-action-sheet
                v-model="show1"
                :actions="actions"
                @select="onSelect"
        />
        <van-action-sheet
                v-model="show2"
                :actions="actions"
                @select="onSelect"
        />
    </div>
</template>

<script>
    import head from '$img/head.png'
    import upload from '$img/upload.png'

    export default {
        data() {
            return {
                upload,
                head,
                isFalse: true,
                editItem: {
                    whCode: '',
                    plan: ''
                },
                show1: false,
                show2: false,
                value1: 0,
                searchValue: '',
                option1: [
                    {text: '全部商品', value: 0},
                    {text: '新款商品', value: 1},
                    {text: '活动商品', value: 2}
                ],
                actions: [
                    {name: '选项'},
                    {name: '选项'},
                    {name: '选项', subname: '描述信息'},
                    {name: '选项'},
                    {name: '选项'},
                    {name: '选项', subname: '描述信息'},
                    {name: '选项'},
                    {name: '选项'},
                    {name: '选项', subname: '描述信息'},
                    {name: '选项'},
                    {name: '选项'},
                    {name: '选项', subname: '描述信息'},
                    {name: '选项'},
                    {name: '选项'},
                    {name: '选项', subname: '描述信息'},
                    {name: '选项'},
                    {name: '选项'},
                    {name: '选项', subname: '描述信息'},
                    {name: '选项'},
                    {name: '选项'},
                    {name: '选项', subname: '描述信息'}
                ]
            }
        },
        methods: {
            onClickRight() {

            },
            onSelect() {

            },
            beforeRead(file) {
                if (file.length > 1) {
                    this.$toast('请选取一张图片')
                    return false
                }
                return true
            },
            onRead1() {

            },
            onRead2() {

            },
            onSearch() {

            },
            onCancel() {

            }
        },
        created() {
        }
    }
</script>
<style scoped lang="less">
    .icon-font {
        font-size: 20px;
    }
    .list {
        .top {
            padding-bottom: 14px;
            border-bottom: 1px dashed #E5E5E5;
        }

        img {
            width: 40px;
            height: 40px;
            margin-right: 30px;
        }

        h3 {
            font-size: 14px;
            color: #333;
            margin: 0;
        }

        .wait {
            display: inline-block;
            margin-top: 1px;
            padding: 1px 4px;
            background: #FF8239;
            color: #fff;
            font-size: 12px;
            border-radius: 1px;
        }
    }

    .info {
        padding-top: 10px;
    }

    .info-item {
        line-height: 25px;

        & > span {
            width: 70px;
            color: #999;
        }

        .flex-1 {
            color: #666;
        }
    }

    .upload {
        margin-top: 15px;

        & > div {
            color: #999;
            display: flex;
            flex-direction: column;
            align-items: center;
        }

        .upload-img {
            width: 150px;
            height: 100px;
            background: #F5F5F5;
        }

        .noUpload {
            width: 100%;
            height: 100%;

            img {
                width: 45px;
                height: 45px;
                margin: 0;
            }
        }

        .title {
            margin-bottom: 4px;
        }
    }

    .button-view {
        margin-top: 15px;
    }

    .default-btn {
        margin-right: 15px;
    }

</style>
