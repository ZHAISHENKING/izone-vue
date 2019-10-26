import {baseRequest} from "./baseRequest";

// 获取图片分类
export let get_category = function get_category(params){
    return baseRequest("GET", '/category/all/', params, '');
};

// 获取视频
export let get_all_video = function get_all_video(params){
    return baseRequest("GET", '/video/all/', params, '');
};

// 获取所有图片
export let get_all_img = function get_img(params){
    return baseRequest("GET", '/image/all/', params, '');
};

// 获取上传图片的token
export let get_token = params => {
    return baseRequest('POST', '/token', params, '')
};

export let get_img = function get_all_img(params){
    return baseRequest("POST", '/img', '', params);
};

export let get_code = function get_code(params){
    return baseRequest("GET", '/user/code/', params, '');
};

// 注册
export let register = function register(params){
    return baseRequest("POST", '/user/register/', '', params)
};

// 登录
export let login = function login(params){
    return baseRequest("POST", '/user/login/', '', params)
};