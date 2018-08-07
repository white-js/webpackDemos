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
* 1 [入口](#demo1-01-entry-output-source)

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
