const Mock = require("mockjs"); // 引入mockJS
const MR = Mock.Random; // 提mock的随机对象
// 由于jsonServer接收的是一个对象或者是函数，所以此文件需要对外导出一个对象或者函数
// 注意：在使用mockJS的api生成随机数据时，会产生相同数据，如果需要修复这一bug，可自行将id进行随机操作
function mapData(n) {
    let data = [];
    for (let i = 0; i < n; i++) {
        data.push({
            id: i,
            "imgURL": MR.image('750X200', MR.color(), MR.cword(4, 10))
        })
    };
    return data;
};
module.exports = () => {
    let data = Mock.mock({
        "home|5": [
            {
                // 属性“id”是一个自增长数，初始值为1,可以在|后面指定增长量,mockJS语法可参照MockJS官方文档：http://mockjs.com/
                "id|+1": 1,
                "name": "@cname",
                "imgURL": MR.image('750X200', MR.color(), MR.cword(4, 10)) // 产生相同的数据
            },
        ],
        "homee": mapData(10),
        // 如果需要添加其它接口可在此文件内添加...
    });
    return data;
};
