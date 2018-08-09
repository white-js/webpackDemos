const webpack = require('webpack');
const merge = require('webpack-merge');
const UglifyJSplugin = require('uglifyjs-webpack-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const base = require('./webpack.base.config.js');
module.exports = merge(base, {
    plugins: [
        new webpack.DefinePlugin({
            PRODUCTION: JSON.stringify(true),
            'process.env.NODE_ENV': JSON.stringify('development')
        })
    ],
    optimization: {
        minimizer: [            
        new UglifyJSplugin({
              cache: true,//启用缓存
              parallel: true,// 使用多进程运行改进编译速度
              sourceMap:true//生成sourceMap映射文件
        }),
        new OptimizeCssAssetsWebpackPlugin({})
      ]    
}
})