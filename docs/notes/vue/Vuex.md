---
title: Vuex
date: 2022-10-03 10:24:52
categories:
  - notes
  - vue
permalink: /pages/4601d9/
tags:
  -
---

# Vuex

## Vuex 是什么

1. 概念:是一个专门在 Vue 中实现集中式状态管理的一个==Vue 插件==，相当于组件间的一个微型数据库，各组件都能对其进行数据的读取或修改。
2. [官方文档](https://vuex.vuejs.org/zh/)

## 什么时候使用 Vuex

1. 多个组件依赖同一状态(即多个组件共享数据)
2. 来自不同组件的行为需要变更同一状态(即不同组件都需要对同一数据进行修改)

## Vuex 工作原理

<img src="/fqyb-blog/notesImg/vue/vuex" alt="vuex" style="zoom: 67%;" />

### 模块

1. Vue Components:Vue 组件
2. Actions：动作类型(对数据进行的操作,用于统合需要操作的数据和操作，在此可以发送网络请求获取数据或实现一些异步操作)
3. Mutations：数据处理模块
4. State：状态(即共享的数据)

### 工作流程

- 在组件(VueComponents)通过调用 API`dispatch`将要处理的数据和处理的动作发送到 Actions
- Actions 收到数据和处理动作后，调用`commit`将数据和处理动作提交到 Mutations，在 Mutations 中调用函数对数据进行修改操作。
- Mutations 修改好数据后，将数据发送到 State，然后 vuex 重新解析组件然后渲染。

### 注意点

- vuex 允许直接在组件中调用`commit`将数据越过 Actions 将数据提交给 Mutations 处理。
- 不管是 Actions 对象，Mutations 对象，还是 State 对象都需要接受 Store 对象的管理

## 搭建 Vuex 的开发环境

1. 安装 Vuex 的包(npm i vuex,Vue2 的安装命令:npm i vuex@3)

2. 使用 Vuex:

   1. 创建文件:==src/store/index.js==

   ```js
   //该文件用于创建vuex组件中最为核心的store
   //引入vue
   import Vue from "vue";
   //引入vuex
   import Vuex from "vuex";
   //使用插件
   Vue.use(Vuex);
   //准备actions对象
   const actions = {};
   //准备mutations对象
   const mutations = {};
   //准备state对象
   const state = {};
   //创建并导出store
   export default new Vuex.Store({
     actions,
     mutations,
     state,
   });
   ```

   2. 在==main.js==中创建 vm 时传入==store==配置项

   ```js
   //引入Vue
   import Vue from "vue";
   //引入App组件
   import App from "./App";
   //引入store
   import store from "./store";
   //关闭生产提示
   Vue.config.productionTip = false;
   new Vue({
     el: "#app",
     beforeCreate() {
       Vue.prototype.$bus = this; //安装全局事件总线
     },
     render: (h) => h(App),
     store,
   });
   ```

## Vuex 的求和案例

- vuex 中的 index.js

```js
//该文件用于创建vuex组件中最为核心的store

//引入vue
import Vue from "vue";
//引入vuex
import Vuex from "vuex";
//使用插件
Vue.use(Vuex);
//准备actions对象
const actions = {
  //会收到两个函数，一个是传过来的值，一个是上下文对象
  add(context, value) {
    //console.log(value);
    context.commit("ADD", value);
  },
  subtract(context, value) {
    //console.log(value);
    context.commit("SUBTRACT", value);
  },
  addOdd(context, value) {
    if (context.state.sum % 2) {
      context.commit("ADD", value);
    }
  },
  addWait(context, value) {
    setTimeout(() => {
      context.commit("ADD", value);
    }, 2000);
  },
};
//准备mutations对象
const mutations = {
  ADD(state, value) {
    state.sum += value;
    //console.log(state);
  },
  SUBTRACT(state, value) {
    state.sum -= value;
    //console.log(state);
  },
};
//准备state对象
const state = {
  sum: 0,
};
//创建并导出store
export default new Vuex.Store({
  actions,
  mutations,
  state,
});
```

- Count.vue

```html
<template>
  <div>
    <h1>当前求和为:{{ this.$store.state.sum }}</h1>
    <select v-model.number="n">
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
    </select>
    <button @click="add">+</button>
    <button @click="subtract">-</button>
    <button @click="incrementOdd">当前求和为奇数再加</button>
    <button @click="incrementWait">等一等再加</button>
  </div>
</template>

<script>
  export default {
    name: "Count",
    data() {
      return {
        n: 1,
      };
    },
    methods: {
      add() {
        this.$store.dispatch("add", this.n);
      },
      subtract() {
        this.$store.dispatch("subtract", this.n);
      },
      incrementOdd() {
        this.$store.dispatch("addOdd", this.n);
      },
      incrementWait() {
        this.$store.dispatch("addWait", this.n);
      },
    },
  };
</script>

<style></style>
```

## getters配置项

- 用于将state中的数据进行加工，响应给读取数据的组件。(相当于公用的计算属性)
- 如何配置：

```js
const getters = {
    bigSum(state){
        //该函数会收到state作为一个参数
        return state.sum*10
    }
}
```

- 使用命令`this.$store.getters.bigSum`来读取数据

## mapState和mapGetters

- 用于生成映射state中指定数据的计算属性
- 不使用mapState会产生的问题

```js
computed:{
    he(){
        return this.$store.state.sum
    },
    school(){
        return this.$store.state.school
    },
    xueke(){
        return this.$store.state.xueke
    }
}

//以上三个计算属性，它们都调用了this.$store.state,造成不必要的冗余，使用mapState可以实现自动且大量生成和数据具有映射关系的计算属性。 
```

- 使用mapState生成计算属性(对象写法)

```js
mapState({he:'sum',school:'school',xueke:'xueke'})
```

- 当属性名和数据的名相等时可以使用数组写法

```js
...mapState(["sum", "name", "age"]),
```

- mapGetters用法和mapState用法一致

## mapActions和mapMutations

- 二者的作用是用于快速创建具有映射关系的方法
- 不使用时的写法(会造成代码冗余)

```js
add() {
   this.$store.dispatch("add", this.n);
},
subtract() {
  this.$store.dispatch("subtract", this.n);
},
incrementOdd() {
  this.$store.dispatch("addOdd", this.n);
},
incrementWait() {
  this.$store.dispatch("addWait", this.n);
},
```

- 使用这两个可以快速创建(写法也有对象写法和数组写法，形式和上两个函数一样)

```js
...mapMutations({ add: "ADD", subtract: "SUBTRACT" }),
...mapActions(["addOdd", "addWait"]),
```

- 缺点：无法在创建函数时进行传参，需要在插值语法中手动传参

```html
<button @click="add(n)">+</button>
<button @click="subtract(n)">-</button>
<button @click="addOdd(n)">当前求和为奇数再加</button>
<button @click="addWait(n)">等一等再加</button>
```

## Vuex的多组件共享数据案例

> [vuex组件之间数据的共享案例](https://gitee.com/fengqiao-ye/front-end/tree/master/vue/vue2/vue-Demo/21_vuex组件之间数据的共享)

## Vuex的模块化编码

- 目的是让代码更好维护，让数据分类更加明确。
- 将不同业务的mutations，actions，state抽离出来形成一个单独的js文件称之为该业务的模块
- index.js中用于创建store对象用于统管Vuex模块

```js
//count模块
export default {
    namespaced:true,
 	//下面是和业务相关的mutations，actions，state
}

//person模块
export default {
    namespaced:true,
 	//下面是和业务相关的mutations，actions，state
}

//index.js设置
//该文件用于创建Vuex中最为核心的store

//引入Vue
import Vue from "vue";

//引入Vuex
import Vuex from 'vuex';

//使用Vuex
Vue.use(Vuex);

//引用对应的模块
import countOptions from "./count";
import personOptions from "./person";

//创建并暴露store

export default new Vuex.Store({
    modules:{
        countOptions,
        personOptions
    }
});
```

- 由模块化编码所引出来的问题:四个映射生成函数使用方法的改变(其实就是在创建时，指定一下数据所在的命名空间)
- 指定命名空间必须在模块中设置`namespaced:true`来开启使用

```js
//对象写法
...mapMutations('countOptions',{increment:'ADD',decrement:'JIAN'}),
...mapActions('countOptions',{incrementOdd:'jiaOdd',incrementWait:'waitAdd'})

//数组写法
...mapState('countOptions',['sum','school','subject']),
...mapState('personOptions',['personList']),
...mapGetters('countOptions',['bigSum'])
```

- Vuex的迷惑地方(鱿鱼须懂个锤子的Vue :dog:)

```js
//以这种形式调用函数操作数据时，且当使用模块化编码时，第一个参数不是用于指定模块！！
this.$store.commit('personOptions','ADD_PERSON',personObj);//改行代码会报错 

this.$store.commit('personOptions/ADD_PERSON',personObj);//需要通过这种形式来指定模块

//获取getters中处理的数据
this.$store.getters.personOptions.firstPersonName//报错！

this.$store.getters['personOptions/firstPersonName']
//可以通过这种形式来读取，因为Vuex将模块中getters中的属性加工成:"personOptions/firstPersonName"，逆天！！！
```

