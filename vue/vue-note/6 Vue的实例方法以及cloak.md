# 7 Vue的实例方法以及cloak

## 7.1 Vue的实现原理
- 作者定义了一种基本类型：Vue，并以构造函数的形式实现，如：
```
function Vue(){
	//...
}

Vue.prototype.typename = ...
```
- 因此，我们可以使用new构造函数，来创建一个Vue对象（函数）并运行：
```
new Vue(json);
```
- 显然，我们可以为new构造函数生成的Vue对象赋予一个实例：
```
var v = new Vue(json);
```
- 因此，这个实例v就自然而然地继承了Vue.prototype上定义的各种属性与方法，这也正是本讲的主题

## 7.2 Vue对象上的实例方法
1. 注意，在使用如下vue对象上的实例方法时，请先显示地创建一个vue对象的实例。
- v.$mount方法用于指定作用域（vue作用的DOM对象）,但其优先级不如vue对象内部定义的el属性。作者建议最好不要使用这个方法。
- v.$el属性用于显式地访问作用域指定的DOM对象/元素
- v.$data属性用于访问vue上的数据属性(data)
- v.$options属性用于访问vue对象上的自定义属性以及其他的正常属性
- v.$log()方法用于直接获取data（只能访问，不能修改）
- v.$destory()方法用于销毁vue实例

## 7.3 补充：v-track用于相同元素
- 当vue对象的data属性中存在相同值的元素时，多次传入相同值，将不会被vue对象渲染，vue提供如下warning：
```
Use track-by="$index" if you are expecting duplicate values
```
- 因此，当data中存在重复元素，且你需要循环渲染多个相同数据时，请在DOM元素中声明track-by="$index"
```
<ul v-for="i in arr" track-by="$index">
	<li>{{i}}</li>
</ul>
```

## 7.4 cloak解决闪烁问题
- 在DOM元素上显式地声明v-cloak属性，以避免刷新or加载时出现闪烁，显示变量的问题：
```
<div v-cloak>{{msg}}</div>
```
- 注意在渲染完毕后，v-cloak属性会被自动清除，因此在加载完毕的DOM文档中并不会出现v-cloak属性