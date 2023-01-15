---
title: Es6
date: 2022-10-03 00:00:00
permalink: /pages/0af321/
categories: 
  - notes
  - javaScript
tags: 
  - 
---

# Es6 模块化

## 什么是模块

- 将实现某一功能的 js 代码抽离出来构成一个单独的 js 文件,当需要这一功能时，再将该 js 文件引入，该 js 文件能被称为一个模块。
- 一个模块就是一个独立的文件

## 模块化的优势

- 防止命名冲突
- 实现代码的复用
- 提高代码的可维护性
- 每个模块只会加载一次，若再去加载同目录下同文件，直接从内存中读取。

## 模块化语法

即如何将模块暴露出去供人使用(export),如何引入已经写好的模块来使用(import)

### 暴露方式(export)

- 分别暴露:即在模块中，将所有的变量和函数都去调用 export 命令将它们一一暴露

```js
export let name = "张三";

export function hanshu() {
  console.log("分别暴露");
}
```

- 统一暴露:在模块中将所有的变量或函数整合成一个对象，最后将这个对象暴露出去。

```js
let msg = {
  name: "张三",
  age: 25,
  sex: "男",
};

function printf() {
  console.log(msg);
}

export { msg, printf };
```

- 默认暴露:暴露一个对象，将想要暴露的内容直接写在对象中

```js
export default {
  print(obj) {
    console.log(obj);
  },
  xinxi: {
    name: "张三",
    sex: "未知",
    age: 30,
  },
};
```

### 引入方式(import)

```html
<script type="module">
  //注意type的类型为module

  //分别暴露
  import { hanshu } from "./module/分别暴露.js";
  hanshu();

  //统一暴露
  import { printf, msg } from "./module/统一暴露.js";
  printf();
  console.log(msg);

  //默认暴露
  import zs from "./module/默认暴露.js";
  zs.print(zs.xinxi);
</script>
```

### as 的用法

- 在 Es6 模块化中，as 用于引入或暴露模块时，对模块中的变量或方法等进行重命名，从而实现将模块中的变量隐藏起来防止被修改

- 暴露时使用 as 重命名

```js
let msg = {
  name: "张三",
  age: 25,
  sex: "男",
};

function printf() {
  console.log(msg);
}

export { msg, printf as conlog }; //暴露时将printf函数重命名为conlog
```

- 引入时使用 as 重命名

```js
//将引入的msg变量用as重命名为nsg
import { msg as nsg } from "./module/统一暴露.js";

//将所有模块中暴露的内容整合成一个对象并用as对其进行重命名
import * as ty from "模块地址";
```

### import 命令特点

- import 命令会提升到整个模块的头部，首先执行。
- 多次重复执行同一句 import 语句，那么只会执行第一次,执行完第一次后会将其暂存起来，下次在执行同样的 import 命令,会去读取内存而不是再次引入。

### export default 的特点

- 在一个文件或模块中，export default 命令只能使用一次。(多个默认值显然不合理)

- 引入其它暴露方式的模块时，需要在引入时将想要引入的变量用{}括起来(Es6 解构赋值),而 export default 不需要。

- 使用 export default 暴露的内容在引入时，可以使用任意的变量来接收

```js
import zs from "./module/默认暴露.js";
```
