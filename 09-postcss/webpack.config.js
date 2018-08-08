const path = require("path");
const htmlWebpackPlugin = require('html-webpack-plugin');
const miniCssExtractPlugin = require('mini-css-extract-plugin');
/**
 * 添加css3前缀
 * postcss-loader  autoprefixer
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
        // 给css单独配置目录
        new miniCssExtractPlugin({
            filename: 'style.css'
        })
    ],
    //postcss: [autoprefixer({browsers: ['IOS > 7', 'Android > 4']})],
    module: {
        rules: [
            {
                test: /\.css$/,
                // 注意这里把之前的style-loader替换为了：miniCssExtractPlugin.loader
                // 使用postcss-loader ,同时手动去创建一个postcss.config.js
                use: [miniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
                exclude: /node_modules/,
                include: path.resolve(__dirname)
            }
        ]
    }
}