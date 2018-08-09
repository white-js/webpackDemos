const path = require("path");
const webpack = require('webpack');
const htmlWebpackPlugin = require('html-webpack-plugin');
const copyWebpackPlugin = require('copy-webpack-plugin');
const cleanWebpackPlugin = require('clean-webpack-plugin');
/**
 * 复制静态目录和打包前清空输出目录
 * copy-webpack-plugin  clear-webpack-plugin
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
        // 拷贝静态目录
        new copyWebpackPlugin([{
            from: path.resolve(__dirname, 'assets'),
            to: path.resolve(__dirname, 'dist/assets')
        }]),
        // 打包前清空输出目录
        new cleanWebpackPlugin([path.resolve(__dirname, 'dist')])
    ],
    externals: {
        jquery: 'jQuery'
    },
    module: {
    }
}