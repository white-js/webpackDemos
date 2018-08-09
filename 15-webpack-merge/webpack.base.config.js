const path = require("path");
const webpack = require('webpack');
const htmlWebpackPlugin = require('html-webpack-plugin');
const miniCssExtractPlugin = require('mini-css-extract-plugin');
/**
 * 公共配置
 * **/
module.exports = {
    entry: './index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/'
    },
    plugins: [
        new htmlWebpackPlugin({
            template: './index.html',
            filename: 'index.html'
        }),
        // 给css单独配置目录
        new miniCssExtractPlugin({
            filename: 'style.css'
        })
    ],
    externals: {
        jquery: 'jQuery'
    },
    module:{
        rules: [
            {
                // 要转义的对象
                test: /\.css$/,
                // 要使用的loader，解析顺序是从右往左
                use: [miniCssExtractPlugin.loader, 'css-loader'],
                // 排除需要转义的目录
                exclude: /node_modules/,
                // 要转义的目录
                include: path.resolve(__dirname)
            }
        ]
    },
    resolve: {
        // 指定解析顺序，指定的扩展在引入文件的时候可以不再写文件的扩展名
        extensions: ['.js', '.css'],
        // // 设置别名，在引入的时候可以通过别名使用 
        alias: {
            "util": './util/js/util.js',
        }
    }
}