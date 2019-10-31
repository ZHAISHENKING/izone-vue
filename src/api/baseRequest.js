import axios from "axios";
import qs from 'qs';
import {baseUrl} from './baseUrl.js';

/**
 * 请求封装
 * @param method
 * @param path
 * @param params
 * @param success
 * @param error
 */
export function baseRequest(method, path, params, success, error) {
    method = method.toUpperCase() || 'GET';
    let req = null;
    let paramsObj = { params: params };
    axios.defaults.baseURL = baseUrl;
    if (method === 'GET') {
        req =  axios.get(path, paramsObj);
    }
    else if (method === 'POST') {
        axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
        axios.defaults.headers.post["jwt"] = window.localStorage.getItem('jwt');
        req = axios.post(path, qs.stringify(params));
    }
    thenResponse(req, success, error)
}

/**
 * 请求结果处理
 * @param axiosRequest
 * @param successCallback
 * @param errorCallback
 */
function thenResponse (axiosRequest, successCallback, errorCallback) {
    axiosRequest.then((res) => {
        if (res.status === 200) {
            res = res.data
            if (res.code === 0) {
                if (successCallback) successCallback(res)
            } else {
                if (errorCallback) errorCallback(res.code, res.msg)
                else this.$Message.error(res.msg)
            }
        }
    }).catch((error) => {
        if (errorCallback) errorCallback(-1, error.message)
    })
}