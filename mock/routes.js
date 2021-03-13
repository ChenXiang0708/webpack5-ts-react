const mock = '/mock';//创建根api名 这里的 /mock 如同 后端真实/api
// 自定义路由匹配规则
module.exports = {
    [mock + "/*"]: "/$1", // 路由请求由/mock/*接管
};
