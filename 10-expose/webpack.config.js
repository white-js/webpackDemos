const path = require("path");
const webpack = require('webpack');
const htmlWebpackPlugin = require('html-webpack-plugin');
/**
 * 打包第三方类库
 * 方式1：在js文件中直接引入
 * 方式2：使用ProvidePlugin，但是他生成的变量只是在当前模块的上下文，没有在window下，如果某些类库使用以来window下的全局属性的话会报错
 * 方式3：expose-loader  会生成在全局window下面
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
        // 方式二
        new webpack.ProvidePlugin({
            // 配置全局需要加上window
            'window.$': 'jquery',
            '$': 'jquery'
        })
    ],
    //postcss: [autoprefixer({browsers: ['IOS > 7', 'Android > 4']})],
    module: {
        // 方式三
        rules: [{
            test: require.resolve('jquery'),
            use: [{
                loader: 'expose-loader',
                options: '$1'
            },{
                loader: 'expose-loader',
                options: '$2'
            }]
        }]
    }
}