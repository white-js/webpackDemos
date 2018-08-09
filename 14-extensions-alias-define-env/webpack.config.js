const path = require("path");
const webpack = require('webpack');
const htmlWebpackPlugin = require('html-webpack-plugin');
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
        new webpack.DefinePlugin({
            PRODUCTION: JSON.stringify(true),
            NODE_ENV: JSON.stringify(process.env.NODE_ENV)
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
                use: [{
                    // 将css代码转为js代码，执行的时候向页面中注入一个style标签
                    loader: 'style-loader',
                    // loader的参数
                    options: {
                        insertAt: 'top'
                    }
                    // 处理css中的路径
                }, 'css-loader'],
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