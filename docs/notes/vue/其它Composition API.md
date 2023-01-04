---
title: 其它Composition API
date: 2022-12-29 02:15:41
permalink: /pages/37ca9f/
categories:
  - notes
  - vue
tags:
  -
---

# 其它 Composition API

## shallowReactive 和 shallowRef

### shallowReactive

- 浅层次的响应式
- 只处理对象最外层的属性的响应式

### shallowRef

- 传入的数据是基本类型是作用和`Ref`相同
- 当传入的数据是对象时，`Ref`会正常处理，而`shallowRef`不做响应式处理没有响应式

### 什么时候使用

- 如果一个对象数据结构层次深且只有最外层属性发生改变时 ==> `shallowReactive`
- 如果一个对象数据，后续的功能不会修改该对象中的属性，而是用新的对象来替换 ==> `shallowRef`

## readonly 和 shallowReadonly

- `readonly`表示数据只读，不能被修改
- `shallowReadonly`表示一个对象数据，最外层数据只读不能被修改，但内层的属性可以被修改。

## toRaw 和 markRaw

- `toRaw`:将包装好的响应式数据还原成原始的样子，且只能处理`reactive`处理的响应式数据
- `markRaw`:给响应式对象添加属性时，正常添加的属性会是响应式数据，但用`markRaw`处理后就不是一个响应式数据。
