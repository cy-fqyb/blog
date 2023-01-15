---
title: pinia
date: 2023-01-04 22:49:52
permalink: /pages/eca6c0/
categories:
  - notes
  - vue
tags:
  -
---

# pinia

> [Pinia 中文文档](https://pinia.web3doc.top/)
>
> [b 站教程](https://www.bilibili.com/video/BV11Y411b7nb/)

## 1.什么是 pinia

- 最新的 Vue 状态管理库，用于替代 Vuex
- 特点:
  - 使用更加简便
  - 更好的支持 Ts

## 2.pinia 的安装

- 使用包管理工具来安装 pinia

```shell
yarn add pinia
# or
npm install pinia
```

## 3.pinia 的基本使用

### 3.1 创建 pinia 实例

- 在`main.js`中引用 pinia 然后注册

```js
import { createApp } from "vue";
import App from "./App.vue";
import { createPinia } from "pinia";

//创建vue实例
const app = createApp(App);

//创建pinia实例
const pinia = createPinia();

//挂载pinia实例
app.use(pinia);

//将vue实例挂载到页面上
app.mount("#app");
```

- Vue2 使用 pinia

```js
//如果是vue2使用pinia插件还需多安装一个插件
import { createPinia, PiniaVuePlugin } from "pinia";

Vue.use(PiniaVuePlugin);
const pinia = createPinia();

new Vue({
  el: "#app",
  // 其他选项...
  // ...
  // 注意同一个pinia实例可以在多个Vue应用中使用
  pinia,
});
```

### 3.2 创建 store 文件夹

- 在`src`文件夹下创建一个 store 文件夹用来存储 pinia 相关文件
- 在`store`文件夹下创建一个`index.js`用来充当 pinia 的容器

```js
//引入defineStoreAPI用来创建容器
import {defineStore} from 'pinia'

//定义一个容器然后暴露
export deault defineStore('main',{
    //类似于data用来保存全局的数据
    state:()=>{
        return {
            num: 100,
      		name: "张三",
      		age: "25",
        }
    },
    //类似于computed(计算属性),用来封装计算属性，有缓存的功能
    getters:{
         maxNum() {
      		return this.num * 10;
    	},
    },
    //类似于methods,用来存储对数据的操作方法,封装业务逻辑，用来修改state
    actions:{
        dataChange() {
      	//this.num++;
      	this.name = "牛马";
      	this.age++;
      	setTimeout(() => {
        this.num++;
        console.log(1122);
      }, 1000);
    },
    }
})

```

### 3.3 在组件使用 pinia

- 如果想要使用 pinia 需要在组件中引入 store 并且要在 setup 中声明调用

```js
//引入创建好的容器
import myStore from "../store/index";

//调用函数创建store实例,然后就可以通过实例对象访问到store中的属性和方法
const mainStore = myStore();
```

- 模板中使用 pinia 的数据

```html
<template>
  <h2>piniaDemo中的数据{{ mainStore.num }}</h2>
  <h2>名字:{{ mainStore.name }}</h2>
  <h2>年龄:{{ mainStore.age }}</h2>
  <h2>piniaDemo中更大的数据:{{ mainStore.maxNum }}</h2>
  <button @click="handleAge">点击年龄添加</button>
</template>
```

- 通过结构赋值来获取 store 中的属性

```js
let { name, num, age, maxNum } = mainStore;
//但这样通过结构赋值得到的数据不是响应式的数据

//为了解决以上问题，可以借助pinia内置的API来解决
import { storeToRefs } from "pinia";

//通过这样获得的数据就是响应式的数据
let { name, age, num, maxNum } = storeToRefs(mainStore);
```

- getters 的使用和配置

```js
//getters类似于组件中的computed计算属性
getters: {
    //写成函数的形式，且会收到state作为参数，通过如state.age这种形式可以访问到state中的数据
    maxNum(state) {
      return this.num * 10;
    },
},
```

- actions 的配置和使用

```js
//在store文件夹下的index.js
actions:{
    dataChange(){
       this.name = "牛马";
       this.age++;
      	setTimeout(() => {
        this.num++;
      }, 1000);
    }
}

//在组件中
function handleAge() {
    //以这种形式调用即可
   mainStore.dataChange()
}
```

- 修改 state 中的数据
  - 方法一:当修改单个属性数据时，直接修改即可
  - 方法二:当需要批量修改数据时的`$patch()`的对象形式来修改
  - 方法三:当需要批量修改数据时的`$patch()`的函数形式来修改
  - 方法四：调用 actions 中的方法来修改(推荐使用这种)

```js
function handleAge() {
  // 方式一:直接修改数据
  //mainStore.age++;

  // 方式二:通过$patch()来修改多个数据
  // mainStore.$patch({
  //     name: '牛马',
  //     num: mainStore.num + 1
  // })

  // 方式三:通过$patch的一个函数来修改
  // mainStore.$patch(state => {
  //     mainStore.name = '牛马' + 1;
  //     mainStore.num++;
  // })

  // 方式四:通过action来修改
  mainStore.dataChange();
}
```

## 4.基于 pinia 的简单案例

### 4.1 案例准备

### 需求说明

- 商品列表

  - 展示商品列表
  - 添加到购物车

- 购物车

  - 展示购物车商品列表
  - 展示总价格
  - 订单结算
  - 展示结算状态

### 页面模板

- App.vue

```vue
<template>
  <h1>Pinia - 购物车展示</h1>
  <hr />
  <h2>商品列表</h2>
  <ProductList></ProductList>
  <hr />
  <ShoppingCart></ShoppingCart>
</template>

<script setup>
import ProductList from "./components/ProductList.vue";
import ShoppingCart from "./components/ShoppingCart.vue";
</script>
```

- ProductList.vue

```vue
<template>
  <ul>
    <li>
      商品名称 - 商品价格
      <button>添加到购物车</button>
    </li>
    <li>
      商品名称 - 商品价格
      <button>添加到购物车</button>
    </li>
    <li>
      商品名称 - 商品价格
      <button>添加到购物车</button>
    </li>
  </ul>
</template>
<script setup></script>
```
