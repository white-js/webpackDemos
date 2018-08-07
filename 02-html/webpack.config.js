const path = require("path");
const htmlWebpackPlugin = require('html-webpack-plugin');
/**
 * 创建出入口并引入服务
 * webpack-dev-server
 * **/
module.exports = {
    entry: './index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    // 本地服务
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'),
        host: 'localhost',
        port: 9000,
    },
    plugins: [
        new htmlWebpackPlugin({
            // 入口模板文件
            template: './index.html',
            // 产出的文件名称
            filename: 'index.html'
        })
    ]
}