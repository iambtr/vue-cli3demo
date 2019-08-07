import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import 'amfe-flexible';
import './assets/css/base.css'

//全局goBack
import goBack from './mixins/goBack'

Vue.mixin(goBack)


import {
    NavBar, TreeSelect, Button, Uploader, Icon, Stepper, DatetimePicker, Popup,
    Cell, CellGroup, Panel, Dialog, Toast, Loading, ImagePreview, PullRefresh, Picker,
    List, Field, Tabs, Tab,Rate, Tabbar, TabbarItem,Progress,Grid, GridItem,DropdownMenu, DropdownItem,ActionSheet,Search
} from 'vant';
Vue.use(Rate)
Vue.use(Search)
Vue.use(ActionSheet)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Progress)
Vue.use(Tabbar)
Vue.use(TabbarItem)
Vue.use(NavBar)
Vue.use(TreeSelect)
Vue.use(Button)
Vue.use(Uploader)
Vue.use(Icon)
Vue.use(Stepper)
Vue.use(DatetimePicker)
Vue.use(Popup)
Vue.use(CellGroup)
Vue.use(Cell)
Vue.use(Panel)
Vue.use(Dialog)
Vue.use(Toast)
Vue.use(Loading)
Vue.use(ImagePreview)
Vue.use(PullRefresh)
Vue.use(Picker)
Vue.use(List)
Vue.use(Field)
Vue.use(Tabs)
Vue.use(Grid)
Vue.use(GridItem)
Vue.prototype.$dialog = Dialog
Vue.prototype.$imagePreView = ImagePreview
Toast.setDefaultOptions({duration: 1500})

const devUrl = 'http://10.128.12.52:8086/warehousePicking-server/'
const proUrl = 'http://oms.xianfengsg.com:8086/warehousePicking-server/'

console.log(process.env.NODE_ENV)
const url = process.env.NODE_ENV !== 'production' ? devUrl : proUrl

process.env.NODE_ENV !== 'production' ? '' : axios.defaults.baseURL = url
process.uploadUrl = url

Vue.config.productionTip = false
axios.defaults.timeout = 600000;
axios.defaults.headers['Content-Type'] = 'application/json; charset=utf-8'
axios.interceptors.request.use((config) => {
    store.commit('loading', true)
    config.headers['token'] = sessionStorage.getItem('token') // 请求头带上token
    return config;
}, (error) => {
    // Do something with request error
    return Promise.reject(error);
});
axios.interceptors.response.use((response) => {
    // Do something before request is sent
    if (response.data && response.data.code !== 0) {
        Toast(response.data.msg)
        if (response.data.code === 401) { // 401, token失效
            sessionStorage.removeItem('token')
            router.push({name: 'login'})
        }
    }
    store.commit('loading', false)

    return response;
}, (error) => {
    console.log(error)
    store.commit('loading', false)

    return Promise.reject(error);
})

const get = (url, params = {}) => {
    return new Promise(resolve => {
        axios
            .get(url, {params: params})
            .then(response => resolve(response.data))
            .catch(err => console.log(err))
    })
}
const post = (url, params = {}) => {
    return new Promise(resolve => {
        axios
            .post(url, JSON.stringify(params))
            .then(response => resolve(response.data))
            .catch(err => console.log(err))
    })
}
const put = (url, params = {}) => {
    return new Promise(resolve => {
        axios
            .put(url, JSON.stringify(params))
            .then(response => resolve(response.data))
            .catch(err => console.log(err))
    })
}
Vue.prototype.$get = get
Vue.prototype.$post = post
Vue.prototype.$put = put

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
