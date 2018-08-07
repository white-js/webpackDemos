const path = require("path");
const htmlWebpackPlugin = require('html-webpack-plugin');
/**
 * 新增img的使用
 * url-loader file-loader 处理css和js中引用图片
 * html-withimg-loader  在html中使用图片
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
            template: './index.html',
            filename: 'index.html'
        })
    ],
    module: {
        rules: [
            // 在css和js中使用图片
            {
                test: /\.(png|gif|jpeg|svg|woff|woff2)$/,
                use:{
                    loader: 'url-loader',
                    options: {
                        // 超出1096产出图片，否则产出DataURL
                        limit: 1096,
                        // 图片产出目录
                        outputPath: 'images/',
                        // 产出文件bundel.js引入图片的地址
                        publicPath: '/images'
                    }
                }
            },
            // 在html中使用图片
            {
                test: /\.html/,
                use: 'html-withimg-loader'
            },
            {
                test: /\.css$/,
                use: [{
                    loader: 'style-loader',
                    options: {
                        insertAt: 'top'
                    }
                }, 'css-loader'],
                exclude: /node_modules/,
                include: path.resolve(__dirname)
            }
        ]
    }
}