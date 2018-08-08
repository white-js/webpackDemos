const path = require("path");
const htmlWebpackPlugin = require('html-webpack-plugin');
/**
 * 配置sourceMap
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
    ],
    devtool: 'eval-source-map',
    module: {
        rules: [
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