### 0、mysql的基本使用方法
#### 0.1 常用操作语句：增、删、改、查
```
1. 增：INSERT INTO `usertable` (`user`,`pass`) VALUES("keke","123456");
2. 删：DELETF FROM `usertable`;
3. 改：UPDATE `usertable` SET user="keke23",pass="123456789";
4. 查：SELECT * FROM `usertable`;
5. 还包括WHERE子句用以限制查询条件...
```
#### 0.2 连接操作符：AND与OR
```
1. SELECT pass,user FROM `usertable` WHERE user="keke" AND pass="123456";
2. SELECT pass,user FROM `usertable` WHERE user="keke" OR user="keke23";
```
### 1、使用express框架与mysql搭建的一个带数据库的简单登录注册系统
> 关联文件：login.js, login.html

### 2、使用express框架与ajax实现的一个文件上传系统
> 关联文件：up.js, up.html
- 使用multer插件来处理post方法上传的文件数据
- 使用构造函数 new Formdata()创建一个表单数据对象，然后使用ajax.send()方法将该表单数据对象发送到服务器

### 3、使用express框架与mysql数据库搭建的一个简单的文章上传与查看系统
> 关联文件：txt.html, ajax.js, 1.jade, 2.jade, server.js
