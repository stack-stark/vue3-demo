import axios from 'axios'
import { message } from 'ant-design-vue';
import Router from '@/router'
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


// response interceptor
http.interceptors.response.use(
    response => { // http请求正常
        const res = response.data
        if (res.status !== 200 && res.status !== 201 && res.status !== 0) { // 我们服务器返回的数据中的状态码
            return Promise.reject(new Error(res.message || 'Error'))
        }
        return res
    },
    error => { // http请求错误抛出的异常
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