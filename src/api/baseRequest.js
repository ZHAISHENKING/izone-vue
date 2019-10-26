import axios from "axios";
import qs from 'qs';
import {baseUrl} from './baseUrl.js';

export function baseRequest(method, path, params, data) {
    method = method.toUpperCase() || 'GET';
    let paramsObj = { params: params };
    axios.defaults.baseURL = baseUrl;
    if (method === 'POST') {
        axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
        return axios.post(path, qs.stringify(data));
    } else if (method === 'GET') {
        return axios.get(path, paramsObj);
    } else {
        return axios.delete(path, qs.stringify(data));
    }
}