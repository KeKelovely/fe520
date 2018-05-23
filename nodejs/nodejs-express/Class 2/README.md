### Class 2 Cookies的使用
#### Cookies的基本操作
1. node默认不带cookie模块，这里需要使用cookie-parser插件
```
$ npm i cookie-parser express express-static body-parser
```
2. 使用cookie-parser插件的res.cookie方法为客户端添加cookie，同时使用req.cookies方法来读取客户端中已有的cookies
- res.cookie方法接收三个参数，分别是cookie的键、值，以及一个对象，对象中用来存储cookie的path、maxAge等信息
- req.cookies方法一次性读取客户端中的所有cookies值，并以对象的形式给出
```
const cookieParser = require('cookie-parser');

res.cookie('name','kekelovely',{maxAge:365*24*3600*1000});
console.log(req.cookies); // {name:kekelovely}
```
3. 利用cookie可以实现页面的自动登录功能，详情可参见index.html以及login.js
4. 删除客户端中的cookies：使用res.clearCookie方法，传入的参数为cookie的键（名字）
```
res.clearCookie('test'); // 删除成功
```
#### Cookies的加密
1. 使用req.secret属性添加加密签名，同时给cookie的signed属性赋值为true
```
req.secret = 'fnasdkfnwemf';
res.cookie('test','kekelovely',{signed:true});
```
2. 反向解密：req.signedCookies只能解析并返回加密后的Cookies，而req.cookies只能处理未加密的Cookies
```
server.use(cookieParser(req.secret)); // 向cookieParser传入参数，参数为req.secret
console.log(req.signedCookies);
```
