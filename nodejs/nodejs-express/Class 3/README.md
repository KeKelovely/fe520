### 1、jade的入门与使用
1. 安装与使用
```
$ npm i jade

const jade = require('jade');
```
2. jade中使用render方法来解析虚拟dom，使用renderFile方法来解析jade文件
- jade文件中的嵌套语法与Ruby、Less相似，不使用括号，而是tab缩进表示层次关系
- render方法中可以传入一个对象以设置参数，如pretty:true表示格式化html
```
var str = render('html'); // <html></html>
var str = renderFile('example.jade',{pretty:true});
```
3. 给jade添加属性值
- example: 标签名(属性1="值1",属性2="值2",...)
```
div(class="ab",id="div")
```
- 使用.操作符与#操作符来简化class与id的书写
```
div.a // div(class="a")
div.a#c // div(class="a",id="c")
```
- 使用json来表示元素的style属性
```
div(style={width:'200px',height:'200px'});
```
- 使用&attributes来显式地声明括号内的内容均为属性
```
div&attributes({key:value,key:value,...})
div&attributes({class:"a",id:"c"})
```
### 2、jade的进阶操作
- 使用|操作符，使内容直接在标签内输出，而不是转换成标签的形式，注意1个|操作符只能对应1行的数据内容
```
div
  |aaa
// 输出结果：<div>aaa</div>
```
- 使用.操作符，使得标签之后的内容全部直接输出，而不用转换(常用于script以及style标签)
```
script.
  window.onload = function(){
    //
  };
```
- 使用inlucde操作符引入外部文件
```
include a.js
include 1.html
include index.css
```
- 使用#{variables}来引入变量，变量的一种传入方式是在renderFile的对象参数中传入：
```
// j2.js
var str = jade.renderFile('./2.jade',{pretty:true,name:'KeKe'});
// 2.jade
html
	head
		title
	body
		div 我的名字是：#{name}
```
- 使用=操作符来为html标签填充内容，!=操作符表示不需要将内容转义，原封不动，直接输出（=操作符相当于替代了#{}）
```
-var a=10
div=a // <div>10</div>
div!=<p>innerHTML</p>b
```
- 使用-操作符在html页面中引入代码段，提供更加灵活的表达，且代码段中引入的变量可以直接在jade中读取并使用
 1. 注意jade并不能编译{},因此在引入JS代码时请按照Ruby类的语法格式用缩进而不是括号来表示代码块
 2. 所以总的来看，就是“一个-操作符对应一段代码块，和Ruby的语法类似”
```
-var a = 5
-var b = 10
div=a+b // <div>15</div>
```
```
body
  -var arr = ['a','b','c','d']
  -for(var i in arr)
      div=arr[i]
```
- 注意switch语句和一般js语法的表达方式不一样：
```
-var a = 10
case a
	when 10
		div a
	when 12
		div b
	default
		div c
```
