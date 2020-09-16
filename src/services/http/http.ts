import axios from 'axios'
import { message } from 'ant-design-vue';
import Router from '@/router'
import Store from '@/store'
import appGlobal from '@/store/modules/app-global';
// create an axios instance
const http = axios.create({
    //   baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
    timeout: 5000 // 设置请求超时时间
})
// request interceptor
http.interceptors.request.use(
    config => {
        // 在请求发送之前做些什么
        const token = Store.getters["user/getToken"]
        if (token) { //这里携带token
            config.headers['Authorization'] = 'Bearer '+ token
        }
        Store.commit('appGlobal/SET_LOADING_STATUS', true)
        return config
    },
    error => {
        Store.commit('appGlobal/SET_LOADING_STATUS', false)
        // 请求错误
        console.error(error) // for debug
        return Promise.reject(error)
    }
)


// response interceptor
http.interceptors.response.use(
    response => { // http请求正常
        Store.commit('appGlobal/SET_LOADING_STATUS', false)
        const res = response.data
        // if (res.status !== 200 && res.status !== 201 && res.status !== 0) { // 我们服务器返回的数据中的状态码
        //     return Promise.reject(new Error(res.message || 'Error'))
        // }
        if (res.code !== 200 && res.code !== 201 && res.code !== 0) { // 我们服务器返回的数据中的状态码
            return Promise.reject(new Error(res.message || 'Error'))
        }
        return res
    },
    error => { // http请求错误抛出的异常
        Store.commit('appGlobal/SET_LOADING_STATUS', false)
        if(!error.response) {
            message.error("网络请求错误！");
            return Promise.reject('network error or server error')
        }
        console.error(error.response)
        switch (error.response.status) {
            case 401:
                message.error("对不起，未登录授权,请重新登录！");
                Router.push("/login");
                break;
            case 403:
                message.error("对不起，你没有此权限！");
                Router.push("/403");
                break;
            case 404:
                message.error("对不起，你访问的资源不存在！");
                Router.push("/404");
                break;
            default:
                message.error(error['response']['data']['message']?error['response']['data']['message']:error['response']['data']);
                Router.push('/500');
                break;
        }
        return Promise.reject(error)
    }
)

export default http