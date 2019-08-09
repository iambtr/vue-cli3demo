import Vue from 'vue'
import Vuex from 'vuex'
import home from './store/home'
import client from './store/client'
import performance from './store/performance'
import my from './store/my'
import {get} from './http'
Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        loading: false,
        homeInfo:''
    },
    mutations: {
        loading(state, value) {
            state.loading = value
        },
        getHomeInfo(state,value){
            state.homeInfo = value
        }
    },
    actions: {
        getHomeInfo({commit}){
            get('/store/crm/store/homePage').then(res=>{
                if(res.code===0){
                    commit('getHomeInfo',res.data.homePageVO)
                }
            }).catch(err=>{

            })
        }
    },
    modules: {
        home,
        client,
        performance,
        my
    }
})
