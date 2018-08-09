const path = require("path");
const htmlWebpackPlugin = require('html-webpack-plugin');
/**
 * 动态生成多个html
 * html-webpack-plugin
 * **/
module.exports = {
    entry: {
        index: './index.js',
        index1: './index1.js',
        login: './login.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js'
    },
    // 本地服务
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'),
        host: 'localhost',
        port: 9000,
    },
    plugins: [
        new htmlWebpackPlugin({
            // 引入的代码块
            chunks: ['index', 'index1'],
            // 入口模板文件
            template: './index.html',
            // 产出的文件名称
            filename: 'index.html'
        }),
        new htmlWebpackPlugin({
            // 引入的代码块
            chunks: ['login'],
            // 入口模板文件
            template: './login.html',
            // 产出的文件名称
            filename: 'login.html'
        })
    ]
}