//使用别名 精准匹配到./util/js/util.js
import util from 'util';
util.test();

// 使用扩展名配置 会引入test.css
import './test'


//PRODUCTION = false;
console.log(PRODUCTION)
console.log(NODE_ENV)