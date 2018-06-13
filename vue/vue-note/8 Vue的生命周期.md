# 9 Vue的生命周期

![Vue文档-lifecycle](https://v1-cn.vuejs.org/images/lifecycle.png)

## 9.1 生命周期的类型

- created(){}：Vue对象创建时执行
- beforeComplie(){}：Vue编译（渲染）前执行
- compiled(){}：Vue编译（渲染）之后执行
- ready(){}：实例加载到文档中之后执行（类似于window.onload）
- beforeDestroy(){}：Vue元素销毁之前
- destroyed(){}：Vue元素销毁之后

## 9.2 使用生命周期

```
new Vue({
	el: 'body',
	data: {
		msg: 'hello Vue',
	},
	created(){
		console.log(1);
	},
	compiled(){
		console.log(2);
	},
	ready(){
		console.log(3);
	},
	destoryed(){
		console.log(4);
	}
})
```