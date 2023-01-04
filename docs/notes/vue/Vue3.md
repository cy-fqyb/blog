---
title: Vue3
date: 2022-10-03 10:24:33
categories: 
  - notes
  - vue
tags: 
  - null
permalink: /pages/858e1b/
---

# Vue3笔记

## setup的两个注意点

- setup的执行时机:在beforeCreate前就会被执行一次，this是undefined。

## watch函数

### 监视单个ref定义的数据

```js
 watch(sum, (newValue, oldValue) => {
            console.log('sum变了', newValue, oldValue);
        }, { immediate: true });
```

### 监视多个ref定义的数据

```js
//监视多个ref定义的数据
watch([sum, msg], (newValue, oldValue) => {
    console.log('数据变了', newValue, oldValue);
})
```

### 监视reactive定义的值

```js
 let person = reactive({
            name: '张三',
            age: '26'
 })
 
 //监视对象类型的数据,默认开启深度监视
watch(person, (newValue, oldValue) => {
    console.log(newValue);
})
```

- 此处无法正确获取`oldValue`
- 默认开启深度监视，且无法关闭。

### 监视reactive定义的对象数据的某个属性

```js
 //监视对象的单一属性
  watch(() => person.age, (newValue, oldValue) => {
      console.log('单一属性', newValue);
  })
```

### 监视reactive定义的对象数据的某些属性

```js
//监视对象的多个属性
watch([() => person.age, () => person.name], (newValue, oldValue) => {
    console.log('单一属性', newValue);
})
```

- 反人类情况:当监视的reactive定义的对象的属性还是一个对象时，要手动开启深度监视才行
