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
                v-model="searchValue"
                placeholder="搜索门店/代码/联系人"
                show-action
                @search="onSearch"
                @cancel="onCancel"
        />
        <van-dropdown-menu class="dropdown">
            <van-dropdown-item v-model="searchValues.visitDtType" :options="option1"/>
            <van-dropdown-item v-model="searchValues.visitStus" :options="option2"/>
        </van-dropdown-menu>
        <div class="list-container">
            <div class="list">
                <div class="flex flex-between title">
                    <div class="time">2019/08/01 13:00</div>
                    <div class="visit">未拜访</div>
                </div>
                <div class="name">观丰水果店-010669900</div>
                <div class="position flex">
                    <span class="kl">13.3 km</span>
                    <span class="flex-1">浙江省杭州市余杭区星桥街道广厦天都城紫韵公…</span>
                </div>
                <div class="action-view flex flex-between">
                    <div class="flex-1">
                        <img :src="tell" alt="">
                        <div>李丽娟</div>
                    </div>
                    <div class="flex-1">
                        <img :src="location" alt="">
                        <div>定位</div>
                    </div>
                    <div class="flex-1" @click="$router.push({name:'location'})">
                        <img :src="sign" alt="">
                        <div>我要签到</div>
                    </div>
                </div>
            </div>
            <div class="list">
                <div class="flex flex-between title">
                    <div class="time">2019/08/01 13:00</div>
                    <div class="visit visiting ">拜访中</div>
                </div>
                <div class="name">观丰水果店-010669900</div>
                <div class="position flex">
                    <span class="kl">13.3 km</span>
                    <span class="flex-1">浙江省杭州市余杭区星桥街道广厦天都城紫韵公…</span>
                </div>
                <div class="action-view flex flex-between">
                    <div class="flex-1">
                        <img :src="tell" alt="">
                        <div>李丽娟</div>
                    </div>
                    <div class="flex-1">
                        <img :src="location" alt="">
                        <div>定位</div>
                    </div>
                    <div class="flex-1">
                        <img :src="sign" alt="">
                        <div>我要签到</div>
                    </div>
                </div>
            </div>
            <div class="list">
                <div class="flex flex-between title">
                    <div class="time" style="color: #A1AAB8">2019/08/01 13:00</div>
                    <!--<div class="visit visiting ">拜访中</div>-->
                    <!--<div class="visit">未拜访</div>-->
                    <div class="visit visited">已拜访</div>

                </div>
                <div class="name">观丰水果店-010669900</div>
                <div class="position flex">
                    <span class="kl">13.3 km</span>
                    <span class="flex-1">浙江省杭州市余杭区星桥街道广厦天都城紫韵公…</span>
                </div>
                <div class="action-view flex flex-between">
                    <div class="flex-1">
                        <img :src="tell" alt="">
                        <div>李丽娟</div>
                    </div>
                    <div class="flex-1">
                        <img :src="location" alt="">
                        <div>定位</div>
                    </div>
                    <div class="flex-1">
                        <img :src="sign" alt="">
                        <div>我要签到</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import location from '$img/location.png'
    import sign from '$img/sign.png'
    import tell from '$img/tell.png'


    export default {
        data() {
            return {
                location,
                sign,
                tell,

                searchValue: '',
                value1: 0,
                option1: [
                    {text: '今天', value: 0},
                    {text: '明天', value: 1},
                ],
                value2: 0,
                option2: [
                    {text: '全部', value: 3},
                    {text: '未拜访', value: 0},
                    {text: '拜访中', value: 1},
                    {text: '已拜访', value: 2},
                ],
                searchValues:{
                    currPage:1,
                    limit:10,
                    visitDtType:'',
                    visitStus:''
                }
            }
        },
        methods: {
            onSearch() {

            },
            onCancel() {

            },
            getList(){
                this.$get('/visit/app/visitPlan/getList',this.searchValues).then((res)=>{

                })
            }
        },
        created() {
            this.getList()
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
    .visit{
        display: flex;
        font-size: 12px;
        justify-content: center;
        align-items: center;
        background: #FF8239;
        color: #fff;
        padding: 1px 6px;
    }
    .visiting{
        background: #3cc8b6;
    }
    .visited{
        background: #A1AAB8;
    }
    .name{
        font-size: 14px;
        font-weight: 500;
        color: #333;
        margin-top: 15px;
    }
    .position{
        color: #999;
        .kl{
            padding-right: 10px;
        }
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
        padding-bottom: 15px;
        border-bottom: 1px dashed #E5E5E5;
    }
    .action-view>div{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        img{
            width: 25px;
            height: 25px;
            margin-bottom: 5px;
        }
        color: #999;
        margin-top: 10px;
    }

</style>
