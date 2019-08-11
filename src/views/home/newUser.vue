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
            <van-list
                    v-model="loading"
                    :finished="finished"
                    :error.sync="error"
                    error-text="请求失败，点击重新加载"
                    finished-text="没有更多了"
                    @load="getList"
            >
                <div class="list" v-for="item,index in list" :key="index">
                    <div class="top flex">
                        <div>
                            <img :src="head" alt="">
                        </div>
                        <div class="flex-1">
                            <h3>{{item.storeName}}-{{item.storeId}}</h3>
                            <span class="wait">待审核</span>
                        </div>
                    </div>
                    <div class="info">
                        <div class="flex info-item">
                            <span> 联系人：</span>
                            <div class="flex-1">{{item.receiverName}} &nbsp;&nbsp;{{item.receiverMobile}}</div>
                        </div>
                        <div class="flex info-item">
                            <span> 门店地址：</span>
                            <div class="flex-1">
                                {{item.province}}{{item.city}}{{item.area}}{{item.address2}}{{item.address1}}{{item.address}}
                            </div>
                        </div>
                        <div class="flex info-item">
                            <span> 仓库：</span>
                            <div class="flex-1" v-if="!item.whCode" @click="chooseCode(index)">
                                请选择
                            </div>
                            <div class="flex-1" v-else @click="chooseCode(index)">
                                {{item.whName}}-{{item.whCode}}
                            </div>
                        </div>
                        <div class="flex info-item">
                            <span> 配送方案：</span>
                            <div class="flex-1" v-if="!item.disCode" @click="choosePlan(index)">
                                请选择
                            </div>
                            <div class="flex-1" v-else @click="choosePlan(index)">
                                {{item.disName}}-{{item.disCode}}
                            </div>
                        </div>
                        <div class="flex-between flex upload">
                            <div class="">
                                <div class="title">门头</div>
                                <!--<van-uploader :multiple="isFalse" accept="image/*" class="upload"-->
                                <!--:before-read="beforeRead" :after-read="onRead1">-->
                                <div class="upload-img">
                                    <div class="noUpload flex flex-center">
                                        <img class="photo" v-if="item.doorPhoto" :src="item.doorPhoto" alt=""
                                             @click="previewImg(item.doorPhoto,item.licensePhoto)">
                                        <img v-else :src="upload" alt="">
                                    </div>
                                    <!--<img src="" alt="">-->
                                </div>
                                <!--</van-uploader>-->
                            </div>
                            <div class="">
                                <div class="title">营业执照</div>
                                <!--<van-uploader :multiple="isFalse" accept="image/*" class="upload"-->
                                <!--:before-read="beforeRead" :after-read="onRead2">-->
                                <div class="upload-img">
                                    <div class="noUpload flex flex-center">
                                        <img class="photo" v-if="item.licensePhoto" :src="item.doorPhoto" alt=""
                                             @click="previewImg(item.licensePhoto,item.doorPhoto)">
                                        <img v-else :src="upload" alt=""/>
                                    </div>
                                    <!--<img src="" alt="">-->
                                </div>
                                <!--</van-uploader>-->
                            </div>
                        </div>
                        <div class="flex button-view flex-end">
                            <van-button class="default-btn" size="small" type="default">拒绝</van-button>
                            <van-button size="small" type="primary">通过</van-button>
                        </div>
                    </div>
                </div>
            </van-list>
        </div>
        <van-action-sheet
                style="max-height: 50%"
                v-model="show1"
                :actions="whList"
                @select="onSelect1"
        />
        <van-action-sheet
                style="max-height: 50%"
                v-model="show2"
                :actions="disList"
                @select="onSelect2"
        />
    </div>
</template>

<script>
    import head from '$img/head.png'
    import upload from '$img/upload.png'

    export default {
        data() {
            return {
                title:'',
                list: [],
                loading: false,
                finished: false,
                error: false,
                updateView: false,
                upload,
                head,
                isFalse: true,
                editItem: {
                    whCode: '',
                    whName: '',
                    disCode: '',
                    disName: ''
                },
                show1: false,
                show2: false,
                value1: 0,
                searchValue: '',

                searchValues: {
                    currPage: 1,
                    limit: 10
                },
                chooseIndex: '',
                disList: [],
                whList: []
            }
        },
        methods: {

            onSelect1(v) {
                this.list[this.chooseIndex].whName = v.whName
                this.list[this.chooseIndex].whCode = v.whCode
                this.show1 = false
            },
            onSelect2(v) {

            },
            // beforeRead(file) {
            //     if (file.length > 1) {
            //         this.$toast('请选取一张图片')
            //         return false
            //     }
            //     return true
            // },
            // onRead1() {
            //
            // },
            // onRead2() {
            //
            // },
            onSearch() {

            },
            onCancel() {

            },
            getList() {
                let url = this.updateView ? '/store/crm/store/queryReexamining' : '/store/crm/store/queryExamining'
                this.$get(url, this.searchValues).then(res => {
                    if (res.code === 0) {
                        this.loading = false
                        res.data.pageInfo.list.map(item => {

                        })
                        this.list = [...this.list, ...res.data.pageInfo.list]
                        if (res.data.pageInfo.hasNextPage) {
                            this.searchValues.currPage++
                        } else {
                            this.finished = true
                        }
                    } else {
                        this.loading = false
                        this.error = true
                    }
                }).catch(err => {
                    this.loading = false
                    this.error = true
                })
            },
            getWhCodeList() {
                this.$get('/common/baselist/warehouseList').then(res => {
                    this.whList = res.data.houses.map(item => {
                        item.name = item.whName + '-' + item.whCode
                        return item
                    })

                }).catch(err => {

                })
            },
            getDisList() {
                this.$get('/store/store/disList').then(res => {
                    this.disList = res.data.map(item => {
                        item.name = item.NAME + '-' + item.CODE
                        return item
                    })

                }).catch(err => {

                })
            },
            previewImg(img1, img2) {
                this.$imagePreView([
                    img1, img2
                ])
            },
            chooseCode(index) {
                console.log(index)
                this.chooseIndex = index
                this.show1 = true
            },
            choosePlan(index) {
                console.log(index)
                this.chooseIndex = index
                this.show2 = true
            }
        },
        created() {
            this.updateView = this.$route.query.p === 'new' ? false : true
            // this.getList()
            this.getWhCodeList()
            this.getDisList()
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

            .photo {
                width: 100%;
                height: 100%;
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
