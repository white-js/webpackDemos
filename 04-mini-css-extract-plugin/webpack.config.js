const path = require("path");
const htmlWebpackPlugin = require('html-webpack-plugin');
const miniCssExtractPlugin = require('mini-css-extract-plugin');
/**
 * 
 * style-loader css-loader
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
    module: {
        rules: [
            {
                test: /\.css$/,
                // 注意这里把之前的style-loader替换为了：miniCssExtractPlugin.loader
                use: [miniCssExtractPlugin.loader, 'css-loader'],
                exclude: /node_modules/,
                include: path.resolve(__dirname)
            }
        ]
    }
}