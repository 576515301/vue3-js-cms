import request from "../request"
import api from "./api"
// 获取员工列表
export const getStaffList = (data) => request({
    url: api.getStaffList,
    method: "get",
    data
});

// 修改员工信息
export const reviseStaff = (data) => request({
    url: api.reviseStaff,
    method: "post",
    data
});

// 修改员工信息
export const delStaff = (data) => request({
    url: api.delStaff,
    method: "post",
    data
});



