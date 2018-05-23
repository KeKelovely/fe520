#### express基础：get、post与use中间件的使用
1. 安装：其中body-parser是用于解析post数据的中间件
```
npm i express body-parser
```
2. 使用：
```
const express = require('express');

const app = express();
```
3. get方法、post方法、use中间件
```
app.get('',function(req,res,next){
  //
});

app.post('',function(req,res,next){
  //
});

// 使用use方法能够同时处理get和post请求
app.use('',function(req,res,next){
  //
});
```
4. 解析get数据，将解析后端额数据绑定到req.query上
```
console.log(req.query); // 解析get数据
```
5. 解析post数据:使用body-parser中间件的urlencoded方法，将解析后的数据绑定到req.body上
```
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded());

console.log(req.body)
```
6. 使用res.send()方法发送数据，相当于原来的res.write()与res.end()方法的整合，注意send()会让服务器的响应结束
7. 使用express-static中间件可以改变服务器文件的路径指向
- 安装
```
npm i express-static
```
- 使用
```
server.use(static('./www'));
```
- 这样访问的路径就会被自动修改为http://localhost:1273/www/filename.ext
