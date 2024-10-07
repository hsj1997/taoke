/**axios封装
 * 请求拦截、相应拦截、错误统一处理
 */
import axios from 'axios';
//import QS from 'qs';

import router from '@/router.ts'

//import { message } from 'ant-design-vue';

// import store from '../store/index'

// 环境的切换
console.log('当前环境：'+process.env.NODE_ENV);
if (process.env.NODE_ENV == 'development') {
    axios.defaults.baseURL = 'http://192.168.1.117:8099/';//https://hsj1997.top/
} else if (process.env.NODE_ENV == 'debug') {
    axios.defaults.baseURL = '';
} else if (process.env.NODE_ENV == 'production') {
    axios.defaults.baseURL = 'https://www.bzhsg.top/';
}

// 请求超时时间
axios.defaults.timeout = 15000;

// post请求头
//axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';
//
// 请求拦截器
axios.interceptors.request.use(
    config => {
        // 每次发送请求之前判断是否存在token，如果存在，则统一在http请求的header都加上token，不用每次请求都手动添加了
        // 即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断
        const token = localStorage.getItem("token");
        token && (config.headers.Authorization = token);
        return config;
    },
    error => {
        return Promise.error(error);
    })

// 响应拦截器
axios.interceptors.response.use(

    response => {
        if (response.status === 200) {
            return Promise.resolve(response);
        } else {
            return Promise.reject(response);
        }
    },
    // 服务器状态码不是200的情况
    error => {


        if (error.response.status) {
            switch (error.response.status) {
                // 401: 未登录
                // 未登录则跳转登录页面，并携带当前页面的路径
                // 在登录成功后返回当前页面，这一步需要在登录页操作。
                case 401:
                    router.replace({
                        path: '/login',
                        query: {
                            redirect: router.currentRoute.fullPath
                        }
                    });
                    break;
                // 403 token过期
                // 登录过期对用户进行提示
                // 清除本地token和清空vuex中token对象
                // 跳转登录页面
                case 403:
                    Toast({
                        message: '登录过期，请重新登录',
                        duration: 1000,
                        forbidClick: true
                    });
                    // 清除token
                    localStorage.removeItem('token');
                   // store.commit('loginSuccess', null);
                    // 跳转登录页面，并将要浏览的页面fullPath传过去，登录成功后跳转需要访问的页面
                    setTimeout(() => {
                        router.replace({
                            path: '/login',
                            query: {
                                redirect: router.currentRoute.fullPath
                            }
                        });
                    }, 1000);
                    break;
                // 404请求不存在
                case 404:
                    // Toast({
                    //     message: '网络请求不存在',
                    //     duration: 1500,
                    //     forbidClick: true
                    // });
                    //message.error(网络请求不存在);
                    break;
                // 其他错误，直接抛出错误提示
                default:
                    // Toast({
                    //     message: error.response.data.message,
                    //     duration: 1500,
                    //     forbidClick: true
                    // });
                    //message.error(error.response.data.message);
            }
            return Promise.reject(error.response);
        }
    }
);
/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function get(url, params){
    return new Promise((resolve, reject) =>{

        axios.get(url, {
            params: params
        })
            .then(res => {

                resolve(res.data);
            })
            .catch(err => {
                reject(err.data)
            })
    });
}
/**
 * post方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function post(url, params) {
    return new Promise((resolve, reject) => {
        //debugger
        axios.post(url, params)
            .then(res => {
                resolve(res.data);
            })
            .catch(err => {
                reject(err.data)
            })
    });
}

    export function download(url, params){
        return new Promise((resolve, reject) =>{

            axios.get(url, {
                responseType:"blob",
                params: params,
            })
                .then(res => {

                    // 设置下载文件名称，使用正则取出名称

                    let contentDisposition = "";
                    //浏览器问题可能会出现 content-disposition 匹配不到
                    //console.log(res.headers)
                    if (res.headers["content-disposition"]) contentDisposition = res.headers["content-disposition"];
                    if (res.headers["Content-disposition"]) contentDisposition = res.headers["Content-Disposition"];

                    //console.log(contentDisposition.split("''"))
                    let  fileName  = contentDisposition.split("''")[1];
                    if (fileName == undefined ||fileName ==null ){
                        fileName = "未知异常，请确认内容.xlsx"
                    }else{
                        fileName = decodeURIComponent( fileName);
                    }
                    let url = window.URL.createObjectURL(new Blob([res.data]));
                    let link = document.createElement("a");
                    link.style.display = "none";
                    link.href = url;
                    link.setAttribute("download", fileName);
                    document.body.appendChild(link);
                    link.click();

                    resolve(res.data);
                })
                .catch(err => {
                    reject(err.data)
                })
        });
    }
