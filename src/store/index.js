import Vue from 'vue'
import Vuex from 'vuex'
import {myPlugin} from './config'
import mutations from "./mutations"
import actions from './actions'
Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        picList: [],
        cateList: [],
    },
    plugins: [myPlugin],
    mutations: mutations,
    actions: actions
})