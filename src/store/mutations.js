import {get_category} from  '../api'
/**
 * 获取图片分类列表
* */
export const getPicList = (state)=>{
    get_category({}).then(data => {
        let arr = [];
        let all = data.data;
        if (all.code===0 && all.data){
            all.data.map((item) => {
                // 接口数据解析，默认缩略图pic展示分类下第一张图片
                let pic = JSON.stringify(item.pic)
                // 分类下没有图片展示默认图
                if (pic == '[]') pic = this.logo
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
        }
        state.picList = arr
    })
    window.console.log("全部上传成功， mutaitons开始执行")
}