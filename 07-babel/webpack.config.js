const path = require("path");
const htmlWebpackPlugin = require('html-webpack-plugin');
const miniCssExtractPlugin = require('mini-css-extract-plugin');
/**
 * 转义ES6、ES7、jsx
 * babel-core babel-loader babel-preset-env babel-preset-stage-0 babel-preset-react babel-plugin-transform-decorators-legacy
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
                test: /\.(le|c)ss$/,
                // 最后添加less-loader
                use: [miniCssExtractPlugin.loader, 'css-loader', 'less-loader'],
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