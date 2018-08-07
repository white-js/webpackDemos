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
——————
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


