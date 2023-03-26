const env = import.meta.env.MODE || 'production';
const api = {
    development: "https://sslc.dev.com",
    test: "https://sslc.test.com",
    production: "https://mock.mengxuegu.com/mock/628b4361cc411017d3bb5905/vitemock",
}
const mockURL = "https://mock.mengxuegu.com/mock/628b4361cc411017d3bb5905/vitemock"


export default {
    nameSpace: "sslc",
    env,
    allRoutes: true,   // 是否使用本地路由
    mock: true,        // 是否使用mock数据
    mockURL,            // mock地址
    baseURL: api[env]
}