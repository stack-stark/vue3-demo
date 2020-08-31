import axios from 'axios'
import store from '@/store'
import Router from '../../router'
import { message } from 'ant-design-vue';

// create an axios instance
const http = axios.create({
    //   baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
    timeout: 5000 // 设置请求超时时间
})

// request interceptor
http.interceptors.request.use(
    config => {
        // 在请求发送之前做些什么
        // if (store.getters.token) { //这里携带token
        //     // config.headers['X-Token'] = getToken()
        // }
        return config
    },
    error => {
        // 请求错误
        console.error(error) // for debug
        return Promise.reject(error)
    }
)

/**
 * 跳转出错状态页
 * @param page 
 */
const goToStatusPage = (page: string): void => {
    Router.push(page)
}

// response interceptor
http.interceptors.response.use(
    response => { // http请求正常
        const res = response.data
        if (res.status !== 200 || res.status !== 201 || res.status !== 0) { // 我们服务器返回的数据中的状态码
            return Promise.reject(new Error(res.message || 'Error'))
        }
        return res
    },
    error => { // http请求错误抛出的异常
        console.error(error.response)
        switch (error.response.status) {
            case 401:
                message.error("对不起，未登录授权,请重新登录！");
                goToStatusPage("/login");
                break;
            case 403:
                message.error("对不起，你没有此权限！");
                goToStatusPage("/403");
                break;
            case 404:
                message.error("对不起，你访问的资源不存在！");
                goToStatusPage("/404");
                break;
            default:
                message.error(error['response']['data']['message']);
                goToStatusPage("/500");
                break;
        }
        return Promise.reject(error)
    }
)

export default http