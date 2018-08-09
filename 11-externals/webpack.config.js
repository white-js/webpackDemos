const path = require("path");
const webpack = require('webpack');
const htmlWebpackPlugin = require('html-webpack-plugin');
/**
 * 从外部引用第三方库，不打包，并且又不影响我们在程序中以CMD、AMD或者window/global全局等方式进行使用
 * externals
 * **/
module.exports = {
    entry: './index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/'
    },
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'),
        host: 'localhost',
        port: 9000,
    },
    plugins: [
        new htmlWebpackPlugin({
            template: './index.html',
            filename: 'index.html'
        }),
    ],
    externals: {
        jquery: 'jQuery'
    },
    module: {
    }
}