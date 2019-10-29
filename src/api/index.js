import {baseRequest} from "./baseRequest";

// 获取图片分类
export let get_category = (params, resolve, inject) => {
    return baseRequest("GET", '/category/all/', params, resolve, inject);
};
// 修改分类title
export let put_cate = (params, resolve, inject) => {
    return baseRequest('POST', '/put/cate', params, resolve, inject)
}
// 获取视频
export let get_all_video = (params, resolve, inject) => {
    return baseRequest("GET", '/video/all/', params, resolve, inject);
};

// 获取所有图片
export let get_all_img = (params, resolve, inject) => {
    return baseRequest("GET", '/image/all/', params, resolve, inject);
};

// 删除图片
export const delete_img = (params, resolve, inject) => {
    return baseRequest('POST', '/delete/img', params, resolve, inject)
}

export let get_img = (params, resolve, inject) => {
    return baseRequest("POST", '/img', params, resolve, inject);
};

export let get_code = (params, resolve, inject) => {
    return baseRequest("GET", '/user/code/', params, resolve, inject);
};

// 注册
export let register = (params, resolve, inject) => {
    return baseRequest("POST", '/user/register/', params, resolve, inject)
};

// 登录
export let login = (params, resolve, inject) => {
    return baseRequest("POST", '/user/login/', params, resolve, inject)
};