import {get_album} from '../api'

export default {
  GET_CATE({commit}) {
    get_album({},
      (data) => {
        let arr = [];
        data.data.map((item) => {
          let obj = {
            id: item.id,
            title: item.title,
            desc: item.desc,
            pic: item.cover,
            len: item.pic.length
          }
          arr.push(obj)
        })
        commit('CATE_LIST', arr)
        commit('SET_PIC_LIST', data.data)
      }
    )
  },
  SAVE_MESSAGE({commit}, msg) {
    commit('ADD_TO_MESSAGES', msg)
  },
  CLEAN_MESSAGES({commit}) {
    commit('CLEAN_MESSAGES')
  }
}