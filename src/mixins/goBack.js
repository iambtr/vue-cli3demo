export default {
    data(){
      return {
          mixins_longitude:'',
          mixins_latitude:'',
          mixins_address:''
      }
    },
    methods:{
        onClickLeft(){
            this.$router.back()
        },
    }
}
