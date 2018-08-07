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
    ],
    module: {
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
    }
}