---
title: grid布局
date: 2022-11-09 10:42:25
permalink: /pages/996f13/
categories:
  - notes
  - css
tags:
  -
---

# Grid 布局

- [CSS Grid 网格布局教程 - 阮一峰](http://ruanyifeng.com/blog/2019/03/grid-layout-tutorial.html)

- 网格布局，又叫栅格布局，是一个基于网格(栅格)的二维布局 系统（横轴和纵轴）。

- 添加 grid 布局代码:`display:grid`

## 相关概念

### 容器和项目

- 采用网格布局的区域叫做容器(container)
- 容器内部采用网格布局的叫做项目(item)

```html
<div class="catiter">
  <div class="item">项目</div>
</div>
```

### 行和列

- 容器内的水平区域称为行，水平区域称为列
- 如下图所示:200 到 800 的颜色区域即列(column),400 到 600 的颜色区域即行(rows)
- 行和列的交叉区域叫做单元格(cell)
- 单元格的个数正常情况下为行数 x 列数
- 划分网格的线，称为"网格线"（grid line）。

<table border="1" width='300px' height='300px'>
  <tr>
    <td align='center'>100</td>
    <td align='center' bgcolor=#FFB6C1>200</td>
    <td align='center'>300</td>
  </tr>
  <tr>
    <td align='center' bgcolor=#FFB6C1>400</td>
    <td align='center' bgcolor=#FFB6C1>500</td>
    <td align='center' bgcolor=#FFB6C1>600</td>
  </tr>
    <tr>
    <td align='center'>700</td>
    <td align='center' bgcolor=#FFB6C1>800</td>
    <td align='center'>900</td>
  </tr>
</table>

## 容器属性

### display

- `display:grid`给指定容器设置 grid 布局
- 通过`display:line-grid`可以设置容器元素为行内元素(默认是块级元素)
  :::danger 注意
  当容器设为网格布局时，容器子元素（项目）的`float`、`display: inline-block`、`display: table-cell`、`vertical-align`和`column-*`等设置都将效。
  :::

### 行和列属性

- `grid-template-columns`属性定义每一列的列宽，有几个列宽代表着有多少列
- `grid-template-rows`属性定义每一行的行高，有几个行高代表有几行

```css
.container {
  display: grid;
  grid-template-columns: 100px 100px 100px;
  grid-template-rows: 100px 100px 100px;
}
/*
	上面代表创建一个3行3列的grid布局容器器列宽和行高都为100px，也可以使用百分比为单位
*/
```

- repeat():用于简化重复的值

```css
.container {
  display: grid;
  grid-template-columns: repeat(3, 100px);
  grid-template-rows: repeat(3, 100px);
}
/*
	该代码等价于上方的代码,该函数要传入2个参数，一个是指定重复的次数，一个指定重复的数值
*/
```

- auto-fill:用于根据容器的列或宽自动指定容器每行或每列的项目个数

```css
.container {
  display: grid;
  grid-template-columns: repeat(auto-fill, 100px);
}

/*
	改代码表示根据容器宽度自动决定每行项目的个数，知道把一行填满才开始换行
*/
```

- fr(fraction,意为片段):根据比例来分配空间，如果两列的宽度为1fr和2fr，表示后者的宽度是前者的两倍。

```css
.container {
  display: grid;
  grid-template-columns: 1fr 1fr;
}
```

- minmax():该函数会返回一个长度范围，它会接收两个参数，分别是最小值和最大值。

```css
.container{
/* 行高 */
grid-template-rows: 200px 100px 100px;
/* 列宽：第一列 200px，第二列自动，第三列占最小10%，最大20% */
grid-template-columns: 200px auto minmax(10%,20%);
}
```

- auto:表示让浏览器自己决定长度

```css
grid-template-columns: 100px auto 100px;
```

- 网格线命名：可以使用方括号来指定每一根网格线的名字，方便引用。

```css
.container {
  display: grid;
  grid-template-columns: [c1] 100px [c2] 100px [c3] auto [c4];
  grid-template-rows: [r1] 100px [r2] 100px [r3] auto [r4];
s}
```

- grid-row-gap和grid-column-gap
  - 第一个用来设置行间距
  - 第二个用来设置列间距
  - grid-gap是二者的合并简写形式

```css
.container {
  grid-row-gap: 20px;
  grid-column-gap: 20px;
}

/*
	上方代码等价于下面的
*/
.container {
  grid-gap: 20px 20px;
}
/*
	如果两个值相等，则可以省略第二个
*/
```

