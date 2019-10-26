import Vue from 'vue'
import Vuex from 'vuex'
import {myPlugin} from './config'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        picList: []
    },
    plugins: [myPlugin],
    mutations: {
        setPicList(state, list){state.picList = list}
    }
})