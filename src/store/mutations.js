import {getStore, setStore} from "../util";
import {
    INIT_PIC_LIST,
    SET_PIC_LIST,
    CATE_LIST
} from "./mutations-type";

export default {
    // 图片列表
    [SET_PIC_LIST](state, list){
        state.picList = list
        setStore('picList', state.picList)
    },
    // 初始化图片列表
    [INIT_PIC_LIST](state){
        state.picList = JSON.parse(getStore('picList'))
        state.cateList = JSON.parse(getStore('cateList'))
    },
    // 图片分类列表
    [CATE_LIST](state, list){
        state.cateList = list
        setStore('cateList', state.cateList)
    }
}