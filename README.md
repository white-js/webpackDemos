webpack demo 目标：从创建入口到loader插件以及原理分析

## 使用
```bash
git clone https://github.com/white-js/webpackDemos.git
```
进入想要测试的demo目录，然后执行npm 命令
```bash
cd 01-entry-output
npm i
npm run dev
```
然后访问：http://localhost:8080/

## Index
* 1 [入口和出口](#demo1-01-entry-output-source)
* 2 [动态生成html](#demo2-02-html-source)
* 2-1 [动态生成多个html入口](#demo2-02-html-more-source)
* 3 [使用css-loader](#demo3-03-cssloader-source)
* 4 [css单独配置目录](#demo4-04-mini-css-extract-plugin-source)
* 5 [使用图片](#demo5-05-img-source)
* 6 [使用less](#demo6-06-less-source)
* 7 [转义ES6、ES7、jsx](#demo7-07-babel-source)
* 7-1 [压缩js、css](#demo7-07-optimize-babel-css-source)
* 8 [sourceMap](#demo8-08-source-map-source)
* 9 [css3增加前缀](#demo9-09-postcss-source)
* 10 [打包第三方类库](#demo10-10-expose-source)
* 11 [引入外部第三方库，但是不想webpack打包](#demo11-11-externals-source)
* 12 [复制静态目录和打包前清空输出目录](#demo12-12-copy-and-clean-source)
* 13 [本地服务和mode](#demo13-13-sever-mode-source)
* 14 [扩展名加载顺序、文件别名、全局常量、环境变量](#demo14-14-extensions-alias-define-env-source)
* 15 [webpack-merge打造公共模块，分离出开发环境和生产环境](#demo15-15-webpack-merge-source)
## demo1 01-entry-output ([source](https://github.com/white-js/webpackDemos/tree/master/01-entry-output))

使用webpack-dev-server 启动本地服务，方便访问
```javascript
// package.json
"scripts": {
    "dev": "webpack-dev-server --mode development"
},
```

配置webpack的入口entry和出口output
```javascript
// webpack.config.js
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
    }
}
```

创建入口文件
```javascript
// javascript
alert('初始化成功')
```

前期没有动态生成html文件，所以手动在产出目录(dist)下面创建一个html，并引入bundle.js
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <script src="./bundle.js"></script>
</head>
<body>
    
</body>
</html>
```

## demo2 02-html ([source](https://github.com/white-js/webpackDemos/tree/master/02-html))

在demo1基础上新增了devserver配置和动态生成html文件

首先webpack中引入并使用插件 html-webpack-plugin
```javascript
// webpack.config.js
const htmlWebpackPlugin = require('html-webpack-plugin');
plugins: [
    new htmlWebpackPlugin({
        // 入口模板文件
        template: './index.html',
        // 产出的文件名称
        filename: 'index.html'
    })
]
```

配置devserver，在服务启动以后，打开localhost地址，会默认加载index.html
```javascript
// webpack.config.js
devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    host: 'localhost',
    port: 9000,
},
```

创建模板文件
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
    
</body>
</html>
```
## demo2 02-html-more ([source](https://github.com/white-js/webpackDemos/tree/master/02-html-more))
生成多个html入口,使用chunks决定引入的js文件
* 创建 index.js, index1.js, login.js和login.html
```javascript
plugins: [
    new htmlWebpackPlugin({
        // 引入的代码块
        chunks: ['index', 'index1'],
        // 入口模板文件
        template: './index.html',
        // 产出的文件名称
        filename: 'index.html'
    }),
    new htmlWebpackPlugin({
        // 引入的代码块
        chunks: ['login'],
        // 入口模板文件
        template: './login.html',
        // 产出的文件名称
        filename: 'login.html'
    })
]
```

## demo3 03-cssLoader ([source](https://github.com/white-js/webpackDemos/tree/master/03-cssLoader))

安装loader
```bash
npm i style-loader css-loader -D
```

新增loader配置
```javascript
// webpack.config.js
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
```

新增css文件
```css
/*index.css*/
body{
    color: red;
}
```
引入css文件
```javascript
// index.js
import './index.css'
```

## demo4 04-mini-css-extract-plugin ([source](https://github.com/white-js/webpackDemos/tree/master/04-mini-css-extract-plugin))
使用插件：mini-css-extract-plugin
```javascript
// webpack.config.js
const miniCssExtractPlugin = require('mini-css-extract-plugin');
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
```

## demo5 05-img ([source](https://github.com/white-js/webpackDemos/tree/master/05-img))
使用loader： url-loader file-loader html-withimg-loader

新增loader配置：
```javascript
// webpack.config.js
// 在css和js中使用图片
{
    test: /\.(png|gif|jpeg|svg|woff|woff2)$/,
    use:{
        loader: 'url-loader',
        options: {
            // 超出1096产出图片，否则产出DataURL
            limit: 1096,
            // 图片产出目录
            outputPath: 'images/',
            // 产出文件bundel.js引入图片的地址
            publicPath: '/images'
        }
    }
},
// 在html中使用图片
{
    test: /\.html/,
    use: 'html-withimg-loader'
}
```
js使用图片：
```javascript
// index.js
import './index.css'
import logo from './logo.png'
let jsImg = document.querySelector('#js-img');
jsImg.src = logo;
jsImg.style.width = '200px';
jsImg.style.height = '100px';
```
css中使用图片
````css
/* index.css */
.css-img{
    background: url(./logo.png) no-repeat;
    background-size: cover;
    height: 100px;
    width: 200px;
}
````
html中的代码，和在html中使用图片
````html
<!-- index.html -->
<div>
    js中的图片：
</div>
<img id="js-img" />
<div>
    css中的图片：
</div>
<div class="css-img"></div>
<div>
    html中的图片：<br>
    <img src="./logo.png" style="width: 200px; height: 100px;"/>
</div>
````
## demo6 06-less ([source](https://github.com/white-js/webpackDemos/tree/master/06-less))

使用less，以04-mini-css-extract-plugin为模板修改
使用loader  less  less-loader
```javascript
// webpack.config.js中的修改
test: /\.(le|c)ss$/,
// 最后添加less-loader
use: [miniCssExtractPlugin.loader, 'css-loader', 'less-loader']
```
```html
<!-- index.html -->
<body>
    我是less
</body>
```
```javascript
// index.js
import './index.less'
```
```css
/* index.less */
@color: red;
body{
    color: @color;
}
```
## demo7 07-babel ([source](https://github.com/white-js/webpackDemos/tree/master/07-babel))
安装依赖
```bash
npm i babel-core babel-loader babel-preset-env babel-preset-stage-0 babel-preset-react babel-plugin-transform-decorators-legacy -D
```
配置文件：
```javascript
// module中新增
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
```
js中使用ES6语法
```javascript
const name = 'ES6';
console.log(name);
```
## demo7 07-optimize-babel-css ([source](https://github.com/white-js/webpackDemos/tree/master/07-optimize-babel-css))
* 使用 插件uglifyjs-webpack-plugin optimize-css-assets-webpack-plugin压缩css和js
* webpack4中优化相关的配置放到optimization中
安装依赖：
```bash uglifyjs-webpack-plugin optimize-css-assets-webpack-plugin -D
npm i 
```
配置文件
```javascript
// webpack.config.js
const UglifyJSplugin = require('uglifyjs-webpack-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
optimization: {
    minimizer: [ 
        new UglifyJSplugin({
            cache: true,//启用缓存
            parallel: true,// 使用多进程运行改进编译速度
            sourceMap:true//生成sourceMap映射文件
        }),
        new OptimizeCssAssetsWebpackPlugin({})
    ]
},
```

## demo8 08-source-map ([source](https://github.com/white-js/webpackDemos/tree/master/08-source-map))
- 使用devtool生成sourcemap映射文件快速定位到错误文件
- devtool参数：
- source-map 把映射文件生成到单独的文件，最完整最慢
- cheap-module-source-map 在一个单独的文件中产生一个不带列映射的Map
- eval-source-map 使用eval打包源文件模块,在同一个文件中生成完整sourcemap
- cheap-module-eval-source-map sourcemap和打包后的JS同行显示，没有映射列
增加配置：
```javascript
// webpack.config.js
devtool: 'eval-source-map',
```
此时在js中调用一个不存在的方法a(),此时在控制台看到错误以后点击进去可以直接定位到对应的js文件中
```javascript
console.log('错误输出之前');
a();
console.log('错误之后');
```

## demo9 09-postcss ([source](https://github.com/white-js/webpackDemos/tree/master/09-postcss))
给css3的样式增加属性前缀
- Trident内核：主要代表为IE浏览器, 前缀为-ms
- Gecko内核：主要代表为Firefox, 前缀为-moz
- Presto内核：主要代表为Opera, 前缀为-o
- Webkit内核：产要代表为Chrome和Safari, 前缀为-webkit

安装依赖
```bash
npm i postcss-loader autoprefixer -D
```
```javascript
// webpack.config.js
// 使用postcss-loader ,同时手动去创建一个postcss.config.js
use: [miniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
// postcss.config.js
module.exports={
    plugins:[require('autoprefixer')]
}
```
给placeholder修改颜色
```css
::placeholder{
    color: red;
}
/* 最终生成结果 */
::-webkit-input-placeholder{
    color: red;
}
:-ms-input-placeholder{
    color: red;
}
::-ms-input-placeholder{
    color: red;
}
::placeholder{
    color: red;
}
```
## demo10 10-expose ([source](https://github.com/white-js/webpackDemos/tree/master/10-expose))
打包第三方类库的三种方式：
* 1 直接js中import引入
```javascript
// index.js
import $4 from 'jquery'
```
* 2 webpack插件  [webpack.ProvidePlugin](https://webpack.docschina.org/plugins/provide-plugin/)
```javascript
// webpack.config.js, 此配置只是把变量添加到当前文件的执行上下文，想要放到window下面，变量需要加上window.
plugins: [
    new webpack.ProvidePlugin({
        // 配置全局需要加上window
        'window.$': 'jquery',
        '$': 'jquery'
    })
]
```
* 3 使用[expose-loader](https://webpack.docschina.org/loaders/expose-loader/)
```javascript
// webpack.config.js ， 此配置是将变量添加到window下
module: {
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
```

## demo11 11-externals ([source](https://github.com/white-js/webpackDemos/tree/master/11-externals))
加载外部依赖的时候，防止将某些 import 的包(package)打包到 bundle 中，而是在运行时(runtime)再去从外部获取这些扩展依赖，并且又不影响我们在程序中以CMD、AMD或者window/global全局等方式进行使用
```javascript
// webpack.config.js
externals: {
    jquery: 'jQuery'
},
// index.js
// 可以在js中通过import 引入
import $ from 'jquery'
console.log($);
```
```html
<!-- index.html 在html中通过script引入外部资源-->
<script src="https://code.jquery.com/jquery-3.1.0.js"></script>
```

## demo12 12-copy-and-clean ([source](https://github.com/white-js/webpackDemos/tree/master/12-copy-and-clean))
如果你有些文件不需要被压缩打包，只希望拷贝到输出目录，那么用copy-webpack-plugin插件，如果你需要每次打包前都清空下输出目录来保证每次打包都是最新的文件，那么你需要用clean-webpack-plugin插件
* 创建一个静态目录，assets，里面放上一些静态文件
* 配置打包文件
```javascript
// webpack.config.js
// 引入插件
const copyWebpackPlugin = require('copy-webpack-plugin');
const cleanWebpackPlugin = require('clean-webpack-plugin');
// 使用插件
 // 拷贝静态目录
new copyWebpackPlugin([{
    from: path.resolve(__dirname, 'assets'),
    to: path.resolve(__dirname, 'dist/assets')
}]),
// 打包前清空输出目录
new cleanWebpackPlugin([path.resolve(__dirname, 'dist')])
```
* 执行编译，查看dist目录的输出结果
```bash
num run build
```

## demo13 13-sever-mode ([source](https://github.com/white-js/webpackDemos/tree/master/13-sever-mode))
待更新

## demo14 14-extensions-alias-define-env ([source](https://github.com/white-js/webpackDemos/tree/master/14-extensions-alias-define-env))
* 指定扩展名的解析顺序和设置别名
* 创建test.css 和util/js/util.js
```javascript
// webpack.config.js
resolve: {
    // 指定解析顺序，指定的扩展在引入文件的时候可以不再写文件的扩展名
    extensions: ['.js', '.css'],
    // // 设置别名，在引入的时候可以通过别名使用 
    alias: {
        "util": './util/js/util.js',
    }
}
// index.js 使用
// 使用别名 精准匹配到./util/js/util.js
import util from 'util';
util.test
// 使用扩展名配置 会引入test.css
import 'test'
```

* 使用DefinePlugin设置全局常量
* package.json中 通过依赖cross-env设置环境变量：cross-env NODE_ENV=production
* cross-env解决window的兼容性问题
```javascript
// webpack.config.js
new webpack.DefinePlugin({
    PRODUCTION: JSON.stringify(true),
    // 获取环境变量，并赋值给常量 NODE_ENV
    NODE_ENV: JSON.stringify(process.env.NODE_ENV)
})
// index.js中使用
console.log(PRODUCTION)
```

## demo15 15-webpack-merge ([source](https://github.com/white-js/webpackDemos/tree/master/15-webpack-merge))

使用webpack-merge 产出基础配置base.config 和分离出来开发环境：env.config 生产环境 clent.config

公共模块：一些基础配置
```javascript
// webpack.base.config.js
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
```
开发环境: 做本地服务以及mock服务sourceMap等，可以单独设置mode，以及环境变量process.env.NODE_ENV，这样就不用再再package.json里面写了
```javascript
// webpack.env.config.js
const webpack = require('webpack');
const path = require('path');
const merge = require('webpack-merge');
const base = require('./webpack.base.config.js');

module.exports = merge(base, {
    mode: 'development',
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'),
        host: 'localhost',
        port: 9000,
    },
    devtool: 'eval-source-map',
    plugins: [
        new webpack.DefinePlugin({
            PRODUCTION: JSON.stringify(false),
            'process.env.NODE_ENV': JSON.stringify('development')
        })
    ]
})
```
生产环境：压缩我们的js、css代码
```javascript
// webpack.client.config.js
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
```

