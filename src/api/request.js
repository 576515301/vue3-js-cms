import axios from 'axios'
import config from '@config/config';
import storage from '@utils/storage';
import { ElMessage } from 'element-plus';

let baseURL = config.mock ? config.mockURL : config.baseURL;

if (config.env === 'production') {
    baseURL = config.baseURL
}

const instance = axios.create({
    baseURL,
    timeout: 5000, // 超时时间，单位毫秒
    withCredentials: true // 跨域请求时是否携带cookie
})

// 请求拦截器
instance.interceptors.request.use(config => {
    // 判断是否存在token，如果存在，则在请求头中加入token
    const token = storage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
}, error => {
    return Promise.reject(error)
})

// 响应拦截器
instance.interceptors.response.use(response => {
    const { code, data, msg } = response.data
    if (code !== 200) {
        ElMessage.error(msg || '失败|code')
        return Promise.reject(new Error(`响应失败：${code}`))
    }
    return data
}, error => {
    ElMessage.error(error || "拦截器catch")
    return Promise.reject(error)
})

// 封装Axios请求
const request = ({ url, method = 'get', data = {} }) => {
    const options = {
        url,
        method
    }
    if (method.toLocaleLowerCase() === 'get') {
        options.params = data
    } else {
        options.data = data
    }
    return instance(options)
}



// 导出API请求
export default request
