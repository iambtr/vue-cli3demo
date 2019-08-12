<template>
    <div>
        <van-nav-bar
                fixed
                title="近期SKU详情"
                left-arrow
                @click-left="onClickLeft"
        >
        </van-nav-bar>
        <div class="container" v-if="list[0]">
            <skuItem v-for="item,index in list" :key="index" :obj="item"></skuItem>
        </div>
        <div class="container container1" v-else >
            没有更多了
        </div>
    </div>
</template>

<script>
    import skuItem from './skuItem'
    export default {
        components:{skuItem},
        data() {
            return {
                storeKeyId:'',
                list:[]
            }
        },
        methods: {
            getList(){
                this.$get('/crm/store/getSku',{storeKeyId:this.storeKeyId}).then(res=>{
                    if(res.code === 0){
                        this.list = res.data.sku
                    }

                }).catch(err=>{

                })
            }
        },
        created() {
            this.storeKeyId = this.$route.query.storeKeyId
            this.getList()
        }
    }
</script>

<style scoped lang="less">
    .container {
        padding: 56px 10px;
    }
    .container1{
        text-align: center;
        font-size: 14px;
        color: #999;
    }
</style>
