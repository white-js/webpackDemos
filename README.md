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
* 3 [使用css-loader](#demo3-03-cssloader-source)
* 4 [css单独配置目录](#demo4-04-mini-css-extract-plugin-source)
* 5 [使用图片](#demo5-05-img-source)
* 6 [使用less](#demo6-06-less-source)
* 7 [转义ES6、ES7、jsx](#demo7-07-babel-source)
* 8 [sourceMap](#demo8-08-source-map-source)
* 9 [css3增加前缀](#demo9-09-postcss-source)
* 9 [打包第三方类库](#demo10-10-expose-source)
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
    // 方式1
    new webpack.ProvidePlugin({
        // 配置全局需要加上window
        'window.$': 'jquery',
        '$': 'jquery'
    })
]
```
* 3 使用[expose-loader](https://webpack.docschina.org/loaders/expose-loader/)
```javascript
// webpack.config.js ， 此配置是讲变量添加到window下
module: {
    // 方式二
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




