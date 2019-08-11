<template>
    <div>
        <van-nav-bar
                title="登录"
        />
        <van-cell-group>
            <van-field
                    v-model="username"
                    required
                    clearable
                    label="用户名"
                    right-icon="question-o"
                    placeholder="请输入用户名"
                    @click-right-icon="$toast('question')"
            />

            <van-field
                    v-model="password"
                    type="password"
                    label="密码"
                    placeholder="请输入密码"
                    required
            />
        </van-cell-group>
        <van-button  style="width: 100%" type="primary" size="normal" @click.native="login">登录</van-button>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                username:'',
                password:''
            }
        },
        methods: {
            login(){
                this.$post('/sys/login',{username:this.username,password: this.password}).then(res=>{
                    localStorage.setItem('token',res.data.token)
                    this.$router.replace('/')
                })
            }
        },
        created() {
        }
    }
</script>

<style scoped>

</style>
