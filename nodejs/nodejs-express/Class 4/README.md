### One:简易文件上传系统的实现
> 对应文件：up.js, post.html, & save文件夹
#### 客户端
- 通过ajax请求实现（略）
- 通过form表单实现，注意enctype（规定了表单向服务器发送数据的编码类型）应改为："multipart/form-data"，在发送前不对任何字符进行编码，直接以源文件的形式上传原始数据
#### 服务器端
- 此前曾使用过的body-parser模块只能用于处理post上传字符串数据的简单情况（此时enctype为application/x-www-form-urlencoded）
- 对于处理文件类型的post数据上传，这里可以使用multer模块
```
$ cnpm i multer

const multer = require('multer');
```
- multer中传入对象参数，使用dest:'dirname'来指定存放路径，.any()表示可以接受任意的数据类型
- 上传后的文件存储在req.files中，例如：
```
server.use(multer({dest:'./save/'}).any());
server.post('',function(req,res,next){
  console.log(req.files);
});
```
- 注意这时候保存下来的文件没有后缀名，无法识别，需要修改req.files中的path属性，来给文件添加上后缀名
- 同时还需要使用到path模块来解析文件路径及其后缀~
- multer模块的详细使用方法请参考[这里~](https://www.npmjs.com/package/multer)

### Two:使用Router更优雅地实现URL处理
> 对应文件：router.js
- 通过使用express框架自带的Router()模块，可以分开书写不同路径的处理中间件，从而使服务器框架更易维护和完善~
```
var userRouter = express.Router();
server.use('/user',userRouter);
userRouter.use('/login',function(req,res,next){
  //
});
```
### Three:使用jade和router制作的简易文章分页浏览页面
> 对应文件：index.jade, index.js

### Four:简易的网页版qq的制作
> 对应文件：qq.html, n.js
- 要点一：ajax请求的书写
- 要点二：后台处理不同请求路径的逻辑
