<template>
    <div>
        <van-nav-bar
                fixed
                title="近期SKU详情"
                left-arrow
                @click-left="onClickLeft"
        >
        </van-nav-bar>
        <div class="container">
            <van-list
                    v-model="loading"
                    :finished="finished"
                    :error.sync="error"
                    error-text="请求失败，点击重新加载"
                    finished-text="没有更多了"
                    @load="getList"
            >
                <orderItem v-for="item,index in list" :key="index" :obj="item"></orderItem>
            </van-list>
        </div>
    </div>
</template>

<script>
    import orderItem from './orderItem'

    export default {
        components: {
            orderItem
        },
        data() {
            return {
                storeKeyId: '',
                searchValues: {
                    currPage: 1,
                    limit: 10,
                    storeId: ''
                },
                loading: false,
                error: false,
                finished: false,
                list: []
            }
        },
        methods: {
            getList() {
                this.searchValues.storeId = this.$route.query.storeKeyId
                this.$get('/crm/order/listOrderByStore', this.searchValues).then(res => {
                    if (res.code === 0) {
                        this.loading = false
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

                })
            }
        },
        created() {

            // this.getList()
        }
    }
</script>

<style scoped>
    .container {
        padding: 56px 10px;
    }
</style>
