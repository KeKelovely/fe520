# 6 Vue过滤器
- 过滤器的含义并不仅仅是指删除数据，而是对数据进行修改，类似于filter

## 6.1 Vue过滤器的语法格式及自带过滤器

### 6.1.1 过滤器的语法格式
- 过滤器的基本语法格式：
```
{{ msg | 过滤器的名称}}

{{ msg | filter_name }}

// 向过滤器传入参数：

{{ msg | filter_name "arg1" "arg2" "arg3" }}
```

### 6.1.2 Vue的内置过滤器（限于1.x版本）
- uppercase：大写字母
- lowercase：小写字母
- currency：以货币形式输出数据，
- debounce：延时执行：后面的参数表示时间（ms）
```
@click = 'add | debounce "3000" '
```
- limitBy：截取部分元素，第一个参数表示截取元素个数，第二个参数表示从第几个开始截取（位置）
```
<ul v-for='i in arr | limitBy 2 1'></ul>

// 表示从arr的第1个元素开始，只取之后的2个元素
```
- filterBy：过滤并只获取符合条件的元素
```
// 只留下含有字符串h的元素
<ul v-for='i in arr | filterBy "h"'></ul>

// 只留下json对象中name属性的值含有字符串h的元素（注意这里是传入的若干对象组成的数组）
<ul v-for='i in arr | filterBy "h" in name'></ul>
```
- orderBy：排序，参数1表示升序，参数-1表示降序
```
<ul v-for='i in arr | orderBy 1'></ul>
<ul v-for='i in arr | orderBy -1'></ul>
```

## 6.2 自定义过滤器

### 6.2.1 基本格式
- 过滤器定义在Vue对象的filter方法上：，其中val表示传入的模板变量的值，arg表示过滤器之后传入的参数
```
Vue.filter(name,function(val,arg))
```
- 如大写过滤器：
```
Vue.fliter('up',funciton(val){
	return val.toUpperCase();
})

{{ msg | up }}
```

### 6.2.2 双向过滤器
- 双向过滤器提供了输入和输出函数两个接口，用于对传入的模板变量及过滤器参数进行一些中间的处理
- 基本格式如下：
```
Vue.filter('filter_name',{
	read: function(inputval){
		return inputval;
	},
	write: function(val){
		return ...
	}
})
```
- read相当于输入，write相当于输出，所以，write函数的参数inputVal，接收到的是read函数的返回值，write函数的返回值也就是处理后渲染的变量值。
- 总结：
```
Vue.filter('filter_name',{
	read: function(){},
	write: function(){}
})
```