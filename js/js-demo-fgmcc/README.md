# Javascript-Practice
Original Javascript Practice
- 原生Javscript练习
- [原网址链接 The orginal Website link](http://fgm.cc/learn/)

- 备注：原HTML代码在sublime中经过htmlbeautify自动排版后，复制粘贴到github上时会出现神奇的多余空格...**强烈建议粘贴至文本编辑器查看**

### 第1课
#### 控制div属性
1. JS通过访问元素的style对象下的属性来修改元素的样式。可通过键访问或属性访问（和JS中对象是一样的）
2. JS相当于是通过修改元素的cssText，即html元素的style属性来改变样式的，必要时使用cssText=""来清除样式
3. 用Btn[i].index = i，通过给index属性赋值，从而显式地向onclick函数中传入循环变量i
#### 网页换肤
1. 参考上一节的(3)
2. 网页换肤有两种实现方式：
- 预先设置class类，然后给元素添加or删除类来实现样式的修改，常用如setAttribute或className
- 修改元素的style对象下的属性，和上一节类似
   
#### 函数接收参数并弹出
#### 用循环将三个DIV变成红色
#### 鼠标移入/移出改变样式
1. 使用onmouseover事件与onmouseout事件实现
2. 改变样式通过给元素添加/删除类来实现
#### 记住密码提示框
1. 同上，使用onmouseover与onmouseout事件实现
2. 元素的显示与隐藏通过改变元素的display属性(block/none)来实现
### 第2课
#### 模拟输入法
1. onclick事件监听
#### 点击DIV,显示其innerHTML
#### 求出数组中所有数字的和
1. 注意表单.value读取的值是字符串形式，要将其转换为数组的number类型并累加求和
#### 弹出层效果
#### 函数传参，改变Div任意属性的值
#### 图片列表：鼠标移入/移出改变图片透明度
#### 简易选项卡的制作
- 注意DOM结构，两个独立ul加多个li
#### 简易JS年历
- 注意本题的DOM结构与CSS书写
- 在用添加/删除class的方法为元素添加交互动画效果时，注意在循环中要先用一次循环清除掉所有元素的类（以确保元素样式的改变被重置），再为指定元素添加class
#### 单一按钮的显示/隐藏
#### 提示框效果
#### 鼠标移过，修改图片路径
- src.replace(/small/,"big"); (replace方法，以及正则表达式匹配)
- 用一个new Image()构造函数创建一个新的图片对象，用来监听图片是否加载成功，(img.complete判断)if成功，则将加载的div块的display设置为none
#### 复选框checkbox全选/全不选/反选
### 第3课
#### 用typeof查看数据类型
- 略
#### 用parseInt解析数字，并求和
- parseInt直接转换即可，在原来的HTML中是按字符串形式相加的，即input.value默认为字符串字面量
#### 累加按钮
- 用this.value获取DOM元素的值
#### 输入两个数字，比较大小
### ...待更新
