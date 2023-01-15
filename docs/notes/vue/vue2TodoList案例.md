---
title: vue2TodoList案例
date: 2022-10-07 15:06:23
permalink: /pages/930c69/
categories:
  - notes
  - vue
tags:
  -
---

# Vue2 实现 TodoList 案例

> 基于尚硅谷的 Vue 课程
>
> 注意需要下载 nanoid 模块(在终端运行 npm i nanoid)

## 注意点

1. 不能修改通过 props 传过来的值
2. 父组件通过 props 可以向子组件传递数据
3. 父组件通过向子组件传递一个函数,在子组件中调用该函数,以此来实现向父组件传递数据

## 效果

![TodoList案例](/img/TodoList案例.png)

## main.js

```js
//引入Vue
import Vue from "vue";
//引入App组件
import App from "./App";
//关闭生产提示
Vue.config.productionTip = false;
new Vue({
  el: "#app",
  render: (h) => h(App),
});
```

## App.vue

```vue
<template>
  <div id="root">
    <div class="todo-container">
      <div class="todo-wrap">
        <MyHeader :addItem="addItem" />
        <MyList
          :matters="matters"
          :changeStyle="changeStyle"
          :deleteItem="deleteItem"
        />
        <MyFooter
          :matters="matters"
          :checkedAll="checkedAll"
          :deleteDone="deleteDone"
        />
      </div>
    </div>
  </div>
</template>

<script>
import MyList from "./components/MyList.vue";
import MyFooter from "./components/MyFooter.vue";
import MyHeader from "./components/MyHeader.vue";
export default {
  name: "App",
  components: { MyList, MyFooter, MyHeader },
  data() {
    return {
      matters: [
        { id: "001", title: "抽烟", done: false },
        { id: "002", title: "喝酒", done: false },
        { id: "003", title: "烫头", done: false },
      ],
    };
  },
  methods: {
    //该方法用于改变事件是否勾选,将事件的id传入进行判断
    changeStyle(item) {
      //在此处对存储的事件进行遍历,找到想要改变的事件改变它的勾选状态
      this.matters.forEach((evelent) => {
        if (evelent.id === item) evelent.done = !evelent.done;
      });
    },
    //该方法用于添加事件
    addItem(item) {
      //将从MyHeader.vue传来的包装好的对象加入到数据中
      this.matters.unshift(item);
    },
    //事件全选
    checkedAll(value) {
      this.matters.forEach((item) => {
        item.done = value;
      });
    },
    //删除单个事件
    deleteItem(id) {
      if (confirm("确定删除吗？")) {
        this.matters.forEach((item) => {
          this.matters = this.matters.filter((item) => item.id !== id); //将不需要删除的元素过滤出来
        });
      }
    },
    //删除已完成的事件
    deleteDone() {
      this.matters.forEach((item) => {
        this.matters = this.matters.filter((item) => !item.done);
      });
    },
  },
};
</script>

<style>
/*base*/
body {
  background: #fff;
}
.btn {
  display: inline-block;
  padding: 4px 12px;
  margin-bottom: 0;
  font-size: 14px;
  line-height: 20px;
  text-align: center;
  vertical-align: middle;
  cursor: pointer;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2), 0 1px 2px rgba(0, 0, 0, 0.05);
  border-radius: 4px;
}
.btn-danger {
  color: #fff;
  background-color: #da4f49;
  border: 1px solid #bd362f;
}
.btn-danger:hover {
  color: #fff;
  background-color: #bd362f;
}
.btn:focus {
  outline: none;
}
.todo-container {
  width: 600px;
  margin: 0 auto;
}
.todo-container .todo-wrap {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
}
</style>
```

## MyHeader.vue

```vue
<template>
  <div class="todo-header">
    <input
      type="text"
      placeholder="请输入你的任务名称，按回车键确认"
      v-model="title"
      @keyup.enter="add"
    />
  </div>
</template>

<script>
//引入nanoid模块
import { nanoid } from "nanoid";
export default {
  name: "MyHeader",
  data() {
    return {
      title: "",
    };
  },
  props: ["addItem"],
  methods: {
    add() {
      //String对象的一个方法
      /* 
				trim() 方法返回一个从两头去掉空白字符的字符串，并不影响原字符串本身,如果被处理的字符串是空串,
				!title.trim()是一个布尔值,值为true
			*/
      if (!this.title.trim()) return alert("输入不能为空"); //判断输入的字符串是否为空

      //如果输入的值不为空,则将收的值包装成一个对象,传给App.vue
      //使用nanoid随机生成一个id
      const itemObj = { id: nanoid(), title: this.title, done: false };
      //将对象传给App
      this.addItem(itemObj);
      //清空输入框
      this.title = "";
    },
  },
};
</script>

<style scoped>
/*header*/
.todo-header input {
  width: 560px;
  height: 28px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 4px 7px;
}

.todo-header input:focus {
  outline: none;
  border-color: rgba(82, 168, 236, 0.8);
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(82, 168, 236, 0.6);
}
</style>
```

## MyList.vue

```vue
<template>
  <ul class="todo-main">
    <MyItem
      v-for="todo in matters"
      :key="todo.id"
      :item="todo"
      :changeStyle="changeStyle"
      :deleteItem="deleteItem"
    />
  </ul>
</template>

<script>
import MyItem from "./MyItem.vue";
export default {
  name: "MyList",
  components: { MyItem },
  props: ["matters", "changeStyle", "deleteItem"],
};
</script>

<style scoped>
/*main*/
.todo-main {
  margin-left: 0px;
  border: 1px solid #ddd;
  border-radius: 2px;
  padding: 0px;
}

.todo-empty {
  height: 40px;
  line-height: 40px;
  border: 1px solid #ddd;
  border-radius: 2px;
  padding-left: 5px;
  margin-top: 10px;
}
</style>
```

## MyItem.vue

```vue
<template>
  <li>
    <label>
      <input
        type="checkbox"
        :checked="item.done"
        @click="changeStyle(item.id)"
      />
      <!-- 如下代码也能实现功能，但是不太推荐，因为有点违反原则，因为修改了props -->
      <!-- <input type="checkbox" v-model="todo.done"/> -->
      <span>{{ item.title }}</span>
    </label>
    <button class="btn btn-danger" @click="deleteItem(item.id)">删除</button>
  </li>
</template>

<script>
export default {
  name: "MyItem",
  props: ["item", "changeStyle", "deleteItem"],
};
</script>

<style scoped>
/*item*/
li {
  list-style: none;
  height: 36px;
  line-height: 36px;
  padding: 0 5px;
  border-bottom: 1px solid #ddd;
}

li label {
  float: left;
  cursor: pointer;
}

li label li input {
  vertical-align: middle;
  margin-right: 6px;
  position: relative;
  top: -1px;
}

li button {
  float: right;
  display: none;
  margin-top: 3px;
}

li:before {
  content: initial;
}

li:last-child {
  border-bottom: none;
}

li:hover {
  background-color: #ddd;
}

li:hover button {
  display: block;
}
</style>
```

## MyFooter.vue

```vue
<template>
  <div class="todo-footer">
    <label>
      <!-- <input type="checkbox" :checked="isAll" @change="checkAll"/> -->
      <input type="checkbox" v-model="isAll" />
    </label>
    <span>
      <span>已完成{{ doneTotal() }}</span> / 全部{{ matters.length }}
    </span>
    <button class="btn btn-danger" @click="deleteDone">清除已完成任务</button>
  </div>
</template>

<script>
export default {
  name: "MyFooter",
  props: ["matters", "checkedAll", "deleteDone"],
  methods: {
    /* 
			reduce() 方法对数组中的每个元素按序执行一个由您提供的 reducer 函数，可选传入两个参数,第二参数是pre的初始值
			每一次运行 reducer 会将先前元素的计算结果作为参数传入，最后将其结果汇总为单个返回值。
			pre:上一次的计算结果
			current:遍历的数组元素
		*/
    doneTotal() {
      return this.matters.reduce(
        (pre, current) => pre + (current.done ? 1 : 0),
        0
      );
    },
  },
  computed: {
    isAll: {
      get() {
        return (
          this.doneTotal() === this.matters.length && this.matters.length > 0
        );
      },
      set(value) {
        this.checkedAll(value);
      },
    },
  },
};
</script>

<style scoped>
/*footer*/
.todo-footer {
  height: 40px;
  line-height: 40px;
  padding-left: 6px;
  margin-top: 5px;
}

.todo-footer label {
  display: inline-block;
  margin-right: 20px;
  cursor: pointer;
}

.todo-footer label input {
  position: relative;
  top: -1px;
  vertical-align: middle;
  margin-right: 5px;
}

.todo-footer button {
  float: right;
  margin-top: 5px;
}
</style>
```

# 运用 webStorage 存储 TodoList 的数据

```js
data(){
    return{
        matters:JSON.parse(localStorage.getItem('matters')) || []
    /*
      从浏览器中读取数据,如果浏览器中初始时，
      没有数据,防止matters.length出错,将一个空数组赋值给它
    */
    }
},
watch:{
    matters:{
      deep:true,//开启深度监视
      handler(value){
        localStorage.setItem('matters',JSON.stringify(value));//将改变的数据存储到浏览器中
      }
    }
  }
```

# 运用全局事件总线传递数据

## 安装全局事件总线

```js
new Vue({
  el: "#app",
  beforeCreate() {
    Vue.prototype.$bus = this; //安装全局事件总线
  },
  render: (h) => h(App),
});
```

## 分析需要传递数据的组件

```js
//在App组件挂载后,使用全局事件总线
mounted(){
		this.$bus.$on('addItem',this.addItem);//接收header组件的数据
		this.$bus.$on('changeStyle',this.changeStyle);//接收来自Item组件的数据
		this.$bus.$on('deleteItem',this.deleteItem);//接收来自Item组件的数据
		this.$bus.$on('checkedAll',this.checkedAll);//接收来自Footer组件的数据
		this.$bus.$on('deleteDone',this.deleteDone);//Footer组件
	}
```

## 各组件的代码

- MyHeader组件

```js
//MyHeader组件
//通过全局事件总线将数据传递给App组件
this.$bus.$emit('addItem',itemObj);
```

- MyItem组件

```html
<template>
    <li>
		<label>
			<input 
			type="checkbox"
			:checked='item.done'
			@click="$bus.$emit('changeStyle',item.id)"
			/>
			<!-- 如下代码也能实现功能，但是不太推荐，因为有点违反原则，因为修改了props -->
			<!-- <input type="checkbox" v-model="todo.done"/> -->
			<span>{{item.title}}</span>
		</label>
		<button class="btn btn-danger" @click="$bus.$emit('deleteItem',item.id)">删除</button>
	</li>
</template>
```

- MyFooter组件

```html
<template>
  <div class="todo-footer">
		<label>
			<!-- <input type="checkbox" :checked="isAll" @change="checkAll"/> -->
			<input type="checkbox" v-model="isAll"/>
		</label>
		<span>
			<span>已完成{{doneTotal()}}</span> / 全部{{matters.length}}
		</span>
		<button class="btn btn-danger" @click="$bus.$emit('deleteDone')">清除已完成任务</button>
	</div>
</template>
```

```js
computed:{
		isAll:{
			get(){
				return this.doneTotal()===this.matters.length&&this.matters.length>0;
			},
			set(value){
				this.$bus.$emit('checkedAll',value);
			}
		}
}
```



