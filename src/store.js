import Vue from 'vue'
import Vuex from 'vuex'
import home from './store/home'
import client from './store/client'
import performance from './store/performance'
import my from './store/my'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {},
    mutations: {},
    actions: {},
    modules: {
        home,
        client,
        performance,
        my
    }
})
