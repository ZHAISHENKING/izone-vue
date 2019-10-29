import {get_category} from '../api'

export default {
    GET_CATE({commit}){
        get_category({},
            (data) => {
                let arr = [];
                data.data.map((item) => {
                    // 接口数据解析，默认缩略图pic展示分类下第一张图片
                    let pic = JSON.stringify(item.pic)
                    // 分类下没有图片展示默认图
                    if (pic === '[]') pic = null
                    else pic = item.pic[0].image_url
                    let obj = {
                        id: item.id,
                        title: item.title,
                        desc: item.desc,
                        pic: pic,
                        len: item.pic.length
                    }
                    arr.push(obj)
                })
                commit('CATE_LIST',arr)
                commit('SET_PIC_LIST', data.data)
            }
        )
    }
}