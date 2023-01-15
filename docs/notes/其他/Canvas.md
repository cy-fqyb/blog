---
title: Canvas
date: 2023-01-08 02:08:06
permalink: /pages/0246b4/
categories:
  - notes
  - 其他
tags:
  - 
---
## Canvas笔记

> 复习了不考就好玩了，能使用 canvas 绘制基础图形就行：矩形，圆形，线
>
> [HTML5 Canvas](https://www.runoob.com/html/html5-canvas.html),[Canvas - Web API 接口参考](https://developer.mozilla.org/zh-CN/docs/Web/API/Canvas_API)

### 什么是Canvas

- HTML5 <canvas> 元素用于图形的绘制，通过脚本 (通常是JavaScript)来完成
- `<canvas>`标签只是图形容器，您必须使用脚本来绘制图形

### 渲染上下文

- canvas 起初是空白的。为了展示，首先脚本需要找到渲染上下文，然后在它的上面绘制。[`<canvas>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/canvas) 元素有一个叫做 [`getContext()`](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLCanvasElement/getContext) 的方法，这个方法是用来获得渲染上下文和它的绘画功能。
- 说人话简称为:画笔

### 绘制矩形

- [`fillRect(x, y, width, height)`](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/fillRect)(填充的矩形)
- [`strokeRect(x, y, width, height)`](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/strokeRect)(矩形边框)
- [`clearRect(x, y, width, height)`](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/clearRect)(橡皮擦?)

```js
function draw() {
  var canvas = document.getElementById('canvas');
  if (canvas.getContext) {
    var ctx = canvas.getContext('2d');

    ctx.fillRect(25, 25, 100, 100);
    ctx.clearRect(45, 45, 60, 60);
    ctx.strokeRect(50, 50, 50, 50);
  }
}
```

### 绘制路径

```js
function draw() {
  var canvas = document.getElementById('canvas');
  if (canvas.getContext) {
    var ctx = canvas.getContext('2d');

    ctx.beginPath();//通知它开始准备绘制
    ctx.moveTo(75, 50);//选择起点
    ctx.lineTo(100, 75);//经过的点
    ctx.lineTo(100, 25);
    ctx.fill();//通过填充路径的内容区域生成实心的图形,如果是调用ctx.stroke()则是绘制一个轮廓
  }
}
```

- 绘制直线，需要用到的方法`lineTo()`，绘制一条从当前位置到指定 x 以及 y 位置的直线。

### 绘制圆形

- 绘制圆弧或者圆，我们使用`arc()`方法

```js
function draw() {
  var canvas = document.getElementById('canvas');
  if (canvas.getContext){
    var ctx = canvas.getContext('2d');

    for(var i = 0; i < 4; i++){
      for(var j = 0; j < 3; j++){
        ctx.beginPath();
        var x = 25 + j * 50; // x 坐标值
        var y = 25 + i * 50; // y 坐标值
        var radius = 20; // 圆弧半径
        var startAngle = 0; // 开始点
        var endAngle = Math.PI + (Math.PI * j) / 2; // 结束点
        var anticlockwise = i % 2 == 0 ? false : true; // 顺时针或逆时针

        ctx.arc(x, y, radius, startAngle, endAngle, anticlockwise);

        if (i>1){
          ctx.fill();
        } else {
          ctx.stroke();
        }
      }
    }
  }
}
```

- [`arc(x, y, radius, startAngle, endAngle, anticlockwise)`](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/arc)
- 画一个以（x,y）为圆心的以 radius 为半径的圆弧（圆），从 startAngle 开始到 endAngle 结束，按照 anticlockwise 给定的方向（默认为顺时针）来生成。
- `arc()` 函数中表示角的单位是弧度，不是角度。角度与弧度的 js 表达式:**弧度=(Math.PI/180)\*角度**

