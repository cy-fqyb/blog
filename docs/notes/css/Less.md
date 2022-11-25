---
title: Less
date: 2022-10-07 15:36:09
permalink: /pages/57f58f/
categories:
  - notes
  - css
tags:
  -
---

# less 初见

## less 的概念

less 是一种动态样式语言，属于 css 预处理器的范畴，它扩展了 css 语言，增添了变量、Mixin、函数等特性
使得 css 更加容易维护和拓展，less 即可以在客户端中运行，也可以借助 node.js 环境在服务器中运行.

:::tip 注意
less 可以借助工具将其转化为 css,推荐使用 vscode 中的 Easy-less 插件。
:::

(less 中文官网)[https://lesscss.com.cn/]

# less 中的混合

## 混合的概念

混合就是将一系列属性从一个规则集导入到另一个规则集的方式。

- 普通混合（缺点：会被编译到 css 文件中）
- 不带输出的混合
- 带参数的混合（类似于函数）

## 带参数并且有默认值的混合（类似于给函数形参设置默认值）

```less
.hunhe(@color:black,@width: 600px/*默认参数*/) {
  //带参数的混合
  width: @width;
  height: 300px;
  background-color: @color;
  margin: 0 auto;
  &:hover {
    background-color: red;
  }
}
```

## 带多个参数的混合

```less
.hunhe(@color:black,@width: 600px) {
  //带参数的混合
  width: @width;
  height: 300px;
  background-color: @color;
  margin: 0 auto;
  &:hover {
    background-color: red;
  }
}
```

## 命名参数(即给指定实参传参)

```less
.hunhe(@color:black,@width: 600px) {
  //带参数的混合
  width: @width;
  height: 300px;
  background-color: @color;
  margin: 0 auto;
  &:hover {
    background-color: red;
  }
}
.wrap3 {
  .hunhe(@width: 400px);
}
```

## 匹配模式（在多个相同的混合中(参数个数必须相同)，匹配特定的混合。）

```less
.mixin(dark, @color) {
  color: darken(@color, 10%);
}
.mixin(light, @color) {
  color: lighten(@color, 10%);
}
// @_ 表示匹配所有
.mixin(@_, @color) {
  display: block;
}

@switch: light;

.class {
  .mixin(@switch, #888);
}
```

## arguments 变量（是个数组用来保存实参）

```less
/*arguments变量*/
.borders(@w,@c,@y) {
  border: @arguments;
}
.bor1 {
  .borders(2px,solid,red);
}
```

:::danger 注意
注意由于 Eass-less 插件只有当文件再次保存时才会再次进行编译
所以当 demo.less 文件中的内容被修改而 test.less 文件未进行再次保存，则 test.css 的内容无法进行更新。
:::

# less 基础

## less 中的注释

less 中有两种注释格式

- 单行注释:以//为开头的注释，不会被编译到 css 文件中。
- 多行注释:以/\*为符号的注释方式，会被编译到 css 文件中

```less
//这是一个不会被编译到css文件中的单行注释。

/*这是一个会被编译到css文件中的多行注释*/
```

## less 中的变量

运用方式:

```less
@color: pink; //属性值作为变量。
@m: margin; //属性名作为变量。
@selector: #wrap; //选择器作为变量。

@{selector}{
    @{m}:0 auto;
    background-color:@color;
}

实际编译效果:
#wrap {
  margin: 0 auto;
  background-color: pink;
}
```

:::tip 注意

- 当 less 中的变量保存的是属性值或是选择器时，调用变量时的格式应为:@{变量名}
- 作为 URL:@{url}
- 变量具有延迟加载即:将作用域中代码解析完后再来调用变量赋值。
  :::

## less 中的嵌套规则

- less 中的嵌套结构与 HTML 中盒子模型的嵌套结构相对应,如下所示。

```html
<div class="wrap">
  <div class="wrap2"></div>
</div>
```

```less
    @{selector}{
    @{m}:0 auto;
    background-color:@color;
    width: auto;
    height:300px;
    transition: 1.5s;
    .wrap2{
        width: 600px;
        height: 300px;
        background-color: yellow;
        margin: 0 auto;
    }
}
```

- &符号在嵌套中的使用
  在选择器前加&表示与父级选择则器同一等级。

```less
.wrap2 {
  width: 600px;
  height: 300px;
  background-color: yellow;
  margin: 0 auto;
  &:hover {
    background-color: skyblue;
  }
}
编译后的效果为:
.wrap:hover {
  background-color: skyblue;
}
```

# less 的计算

## 特点

- 计算结果的单位以最左侧数据的单位为准
- 注意，计算除法时要添加括号，如果不加则无法生效

```less
.wrap3 {
  width: 100+100+200px; //加法
  height: 400px-200-50rem; //减法
  margin-left: 50 * 2 * 3px; //乘法
  margin-right: (300/2) px; //除法
}
```

```css
.wrap3 {
  width: 400px;
  height: 150px;
  margin-left: 300px;
  margin-right: 150 px; //如果less不加括号则该处无法生效
}
```

# 继承（Extend）

## 继承的优点

- less 中继承可以多个选择器应用同一组属性，最终编译为并集选择器。
- 其性能比混合高，但灵活性比混合低。

## 两种继承

### Extend Syntax（不加 all）

```less
.extend2 {
  width: 600px;
  height: 300px;
  background-color: yellow;
  margin: 0 auto;
}
.wrap {
  width: auto;
  height: 300px;
  background-color: skyblue;
  transition: 1.5s;
  .wrap2 {
    &:extend(.extend2); //继承extend2中的属性
  }
  &:hover {
    background-color: red;
  }
}
```

```css
.extend2,
.wrap .wrap2 {
  width: 600px;
  height: 300px;
  background-color: yellow;
  margin: 0 auto;
}
```

### Extend "all"

如果在继承加上 all 则表示在继承时，与继承的选择器相关的所有属性都将被继承。

```less
.extend2 {
  width: 600px;
  height: 300px;
  background-color: yellow;
  margin: 0 auto;
}
.extend2:hover {
  background-color: aqua;
}
.wrap {
  width: auto;
  height: 300px;
  background-color: skyblue;
  transition: 1.5s;
  .wrap2 {
    &:extend(.extend2 all); //加上了all，extend2的hover属性才会被继承
  }
  &:hover {
    background-color: red;
  }
}
```

```css
.extend2,
.wrap .wrap2 {
  width: 600px;
  height: 300px;
  background-color: yellow;
  margin: 0 auto;
}
.extend2:hover,
.wrap .wrap2:hover {
  background-color: aqua;
}
```

> - 可理解为把 all 前的选择器出现的地方全都替换为 extend 前的选择器
> - 即把 .test 替换为 .replacement 生成一个新的选择器应用样式，且不破坏原有的选择器

```less
.a.b.test,
.test.c {
  color: orange;
}
.test {
  &:hover {
    color: green;
  }
}

.replacement:extend(.test all) {
  //继承的另一种写法
}
```

```css
.a.b.test,
.test.c,
.a.b.replacement,
.replacement.c {
  color: orange;
}
.test:hover,
.replacement:hover {
  color: green;
}
```

## 避免编译

- 通过给内容添加单引号或双引号来避免内容被 less 编译而是直接输出到 css 文件中

```less
.extend2 {
  width: "400px+200px";
  height: calc(100px+50rem);
  background-color: yellow;
  margin: 0 auto;
}
```

```css
.extend2 {
  width: "400px+200px";
  height: calc(100px+50rem);
  background-color: yellow;
  margin: 0 auto;
}
```
