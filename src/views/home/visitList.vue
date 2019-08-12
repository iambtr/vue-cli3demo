<template>
    <div>
        <van-nav-bar
                fixed
                title="拜访计划列表"
                left-arrow
                @click-left="onClickLeft"
        >
        </van-nav-bar>
        <van-search
                class="marginTop"
                v-model="searchValues.searchCondition"
                placeholder="搜索门店/代码/联系人"
                show-action
                @search="onSearch"
                @cancel="onCancel"
        />
        <van-dropdown-menu class="dropdown">
            <van-dropdown-item v-model="searchValues.visitDtType" :options="option1" @change="onSearch"/>
            <van-dropdown-item v-model="searchValues.visitStus" :options="option2" @change="onSearch"/>
        </van-dropdown-menu>
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
                    <div class="flex flex-between title">
                        <div class="time">{{item.visitDt}}</div>
                        <div class="visit visiting ">{{item.visitStus}}</div>
                        <div v-if="item.visitStus == 0" class="visit">未拜访</div>
                        <div v-if="item.visitStus == 1" class="visit visited">已拜访</div>
                        <div v-if="item.visitStus == 2" class="visit visiting">拜访中</div>

                    </div>
                    <div class="name">{{item.storeName}}-{{item.storeId}}</div>
                    <div class="position flex">
                        <span class="kl">{{(item.distance/1000).toFixed(2)}}km</span>
                        <span class="flex-1 van-ellipsis">{{item.storeAddress}}</span>
                    </div>
                    <div class="action-view flex flex-between">
                        <div class="flex-1" @click="goTell(item.contactMobile)">
                            <img :src="tell" alt="">
                            <div>{{item.contactName}}</div>
                        </div>
                        <div class="flex-1" @click="getMap(mixins_longitude,mixins_latitude,mixins_address)">
                            <img :src="location" alt="">
                            <div>定位</div>
                        </div>
                        <div class="flex-1" @click="$router.push({name:'location',query:{planId:item.keyId}})">
                            <img :src="sign" alt="">
                            <div>我要签到</div>
                        </div>
                    </div>
                </div>
            </van-list>
            <!--<div class="list">-->
            <!--<div class="flex flex-between title">-->
            <!--<div class="time">2019/08/01 13:00</div>-->
            <!--<div class="visit">未拜访</div>-->
            <!--</div>-->
            <!--<div class="name">观丰水果店-010669900</div>-->
            <!--<div class="position flex">-->
            <!--<span class="kl">13.3 km</span>-->
            <!--<span class="flex-1">浙江省杭州市余杭区星桥街道广厦天都城紫韵公…</span>-->
            <!--</div>-->
            <!--<div class="action-view flex flex-between">-->
            <!--<div class="flex-1">-->
            <!--<img :src="tell" alt="">-->
            <!--<div>李丽娟</div>-->
            <!--</div>-->
            <!--<div class="flex-1">-->
            <!--<img :src="location" alt="">-->
            <!--<div>定位</div>-->
            <!--</div>-->
            <!--<div class="flex-1" @click="$router.push({name:'location'})">-->
            <!--<img :src="sign" alt="">-->
            <!--<div>我要签到</div>-->
            <!--</div>-->
            <!--</div>-->
            <!--</div>-->

            <!--<div class="list">-->
            <!--<div class="flex flex-between title">-->
            <!--<div class="time" style="color: #A1AAB8">2019/08/01 13:00</div>-->
            <!--&lt;!&ndash;<div class="visit visiting ">拜访中</div>&ndash;&gt;-->
            <!--&lt;!&ndash;<div class="visit">未拜访</div>&ndash;&gt;-->
            <!--<div class="visit visited">已拜访</div>-->

            <!--</div>-->
            <!--<div class="name">观丰水果店-010669900</div>-->
            <!--<div class="position flex">-->
            <!--<span class="kl">13.3 km</span>-->
            <!--<span class="flex-1">浙江省杭州市余杭区星桥街道广厦天都城紫韵公…</span>-->
            <!--</div>-->
            <!--<div class="action-view flex flex-between">-->
            <!--<div class="flex-1">-->
            <!--<img :src="tell" alt="">-->
            <!--<div>李丽娟</div>-->
            <!--</div>-->
            <!--<div class="flex-1">-->
            <!--<img :src="location" alt="">-->
            <!--<div>定位</div>-->
            <!--</div>-->
            <!--<div class="flex-1">-->
            <!--<img :src="sign" alt="">-->
            <!--<div>我要签到</div>-->
            <!--</div>-->
            <!--</div>-->
            <!--</div>-->
        </div>
    </div>
</template>

<script>
    import location from '$img/location.png'
    import sign from '$img/sign.png'
    import tell from '$img/tell.png'
    import dd from '@/mixins/dd'

    export default {
        mixins:[dd],
        data() {
            return {
                location,
                sign,
                tell,
                loading: false,
                error: false,
                finished: false,
                value1: 0,
                option1: [
                    {text: '今天', value: 0},
                    {text: '明天', value: 1},
                ],
                value2: 0,
                option2: [
                    {text: '全部', value: ''},
                    {text: '未拜访', value: 0},
                    {text: '拜访中', value: 1},
                    {text: '已拜访', value: 2},
                ],
                searchValues: {
                    currPage: 1,
                    limit: 10,
                    visitDtType: 0,
                    visitStus: '',
                    searchCondition: '',
                    longitude: '',
                    latitude: ''
                },
                list: []
            }
        },
        methods: {
            onSearch() {
                this.searchValues.currPage = 1
                this.list = []
                this.getList()
            },
            onCancel() {
                this.searchValues.searchCondition = ''
                this.searchValues.currPage = 1
                this.list = []
                this.getList()
            },
            // getList1(){
            //     this.searchValues.currPage = 1
            //     this.list = []
            //     this.getList()
            // },
            async getList() {
                await this.getLocation()
                this.searchValues.longitude = this.mixins_longitude
                this.searchValues.latitude = this.mixins_latitude
                this.$get('/visit/crm/visitPlan/getList', this.searchValues).then((res) => {
                    this.loading = false
                    this.list = [...this.list, ...res.data.pageInfo.list]
                    if (res.data.pageInfo.isLastPage) {
                        this.finished = true
                    } else {
                        this.searchValues.currPage++
                    }
                }).catch(err => {
                    console.log(err)
                    this.error = true
                })
            },
        },
        created() {
            // this.getList()
            this.getLocation()
        }
    }
</script>

<style scoped lang="less">
    .dropdown {
        margin-top: 10px;
    }

    .list-container {
        padding: 15px;
        margin-bottom: 40px;
    }

    .time {
        color: #FF8239;
        font-weight: 500;
        padding: 1px 2px;
    }

    .visit {
        display: flex;
        font-size: 12px;
        justify-content: center;
        align-items: center;
        background: #FF8239;
        color: #fff;
        padding: 1px 6px;
    }

    .visiting {
        background: #3cc8b6;
    }

    .visited {
        background: #A1AAB8;
    }

    .name {
        font-size: 14px;
        font-weight: 500;
        color: #333;
        margin-top: 15px;
    }

    .position {
        color: #999;

        .kl {
            padding-right: 10px;
        }

        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        padding-bottom: 15px;
        border-bottom: 1px dashed #E5E5E5;
    }

    .action-view > div {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        img {
            width: 25px;
            height: 25px;
            margin-bottom: 5px;
        }

        color: #999;
        margin-top: 10px;
    }

</style>
