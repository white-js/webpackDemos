// 方式1： 直接引入
import $4 from 'jquery'
console.log($4)
// 方式二：使用ProvidePlugin
console.log(window.$) 
console.log($)  
// 方式三： 使用expose-loader
console.log(window.$1)
console.log($1)
console.log($2)

