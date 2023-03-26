import request from "../request"
import api from "./api"

// 登录
export const login = (data) => request({
    url: api.login,
    method: 'post',
    data
});
// 获取用户数据
export const getUserInfo = (data) => request({
    url: api.getUserInfo,
    method: 'get',
    data
});



