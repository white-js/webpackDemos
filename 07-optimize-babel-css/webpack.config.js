const path = require("path");
const htmlWebpackPlugin = require('html-webpack-plugin');
const miniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJSplugin = require('uglifyjs-webpack-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
/**
 * 压缩css js
 * uglifyjs-webpack-plugin optimize-css-assets-webpack-plugin
 * **/
module.exports = {
    entry: './index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
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
        // 给css单独配置目录
        new miniCssExtractPlugin({
            filename: 'style.css'
        })
    ],
    // 优化相关的放这里
    optimization: {
        minimizer: [ 
            // 压缩js
            new UglifyJSplugin({
                cache: true,//启用缓存
                parallel: true,// 使用多进程运行改进编译速度
                sourceMap:true//生成sourceMap映射文件
            }),
            // 压缩css
            new OptimizeCssAssetsWebpackPlugin({})
        ]
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                // 最后添加less-loader
                use: [miniCssExtractPlugin.loader, 'css-loader'],
                exclude: /node_modules/,
                include: path.resolve(__dirname)
            },
            {
                test: /\.jsx?$/,
                use: [{
                        loader: 'babel-loader',
                        options: {
                            presets: ['env', 'stage-0', 'react'],
                            plugins: ['transform-decorators-legacy']
                        }
                    }
                ],
                exclude: /node_modules/,
                include: path.resolve(__dirname)
            }
        ]
    }
}