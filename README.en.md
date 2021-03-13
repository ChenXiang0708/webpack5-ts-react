# webpack-temp

## 介绍

基于 webpack5 搭建一个 Typescript 项目模板

## 初始化

> git clone <https://gitee.com/xiaocjee/webpack-temp.git>

> cd webpack-temp

> npm install

## 使用说明

```json
// package.json
{
  // ...
  "scripts": {
    "dev": "webpack serve --config ./config/webpack.dev.js", // 本地运行
    "build:dev": "webpack --config ./config/webpack.dev.js", // 打包开发环境项目包
    "build": "webpack --config ./config/webpack.prod.js" // 打包生产环境项目包
  }
}
```

## 参与贡献

1. Fork 本仓库
2. 新建 Feat_xxx 分支
3. 提交代码
4. 新建 Pull Request
