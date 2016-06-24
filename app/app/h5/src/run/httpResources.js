/**
 * Created by kangdaye on 16/6/23.
 */
import axios from 'axios'

//全局拦截器------

axios.defaults.baseURL = '/';


//请求的参数
axios.interceptors.request.use((config) => {
    console.log(config)
    config.headers = config.headers || {};
    // if (getCookie('token')) {
    //     config.headers.Authorization = 'Bearer ' + getCookie('token').replace(/(^\")|(\"$)/g, '')
    // }
    return config
}, (error) => {
    // Do something with request error
    return Promise.reject(error);
});


//请求回来后的过滤器
axios.interceptors.response.use((response) => {
    // if (response.status === 401) {
    //     signOut()
    //     window.location.pathname = '/login'
    // }
    return response
}, (error) => {
    // Do something with response error
    return Promise.reject(error)
});

