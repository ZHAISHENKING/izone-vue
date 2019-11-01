import Vue from 'vue'
import Vuex from 'vuex'
import {myPlugin} from './config'
import mutations from "./mutations"
import actions from './actions'
Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        picList: [],  // 图片列表
        cateList: [], // 分类列表
        messages: [], // 消息列表
    },
    plugins: [myPlugin],
    mutations: mutations,
    actions: actions
})