---
title: 在Cocos中制作一个简易血条
date: 2022-12-29 22:28:46
permalink: /pages/cbe7d1/
categories:
  - notes
  - Cocos
tags:
  - 
---


# 在Cocos中制作一个简易血条

> Demo的简单总结

## 素材准备

> 需要准备以下素材，如下所示，可以根据自己的需要自行更换素材

1. 血条外框图片

![bloodBar](https://s1.vika.cn/space/2023/01/04/dbb6b4ec05164bf2878c5a62a3acf8b8)

2.血条填充图片

![blood](https://s1.vika.cn/space/2023/01/04/a0b6971f2c354709807527320a1c1b75)

## 血条制作

### 制作血条有两种方法

1. 直接将图片的类型改成`filled`,通过改变`fillStart`属性来改变血条长度(不讲)。
2. 还有就是利用Cocos的`ProgressBar`组件来制作

### 用ProgressBar制作

1. 创建一个`Progress`组件
2. 将血条外框图片，拖给组件的`progressBar`节点的`sprite Frame`属性
3. 将血条填充图片，拖给组件的`Bar`节点的`sprite Frame`属性
4. 完成效果如图:

![image-20221229221429132](https://s1.vika.cn/space/2023/01/04/b5e83fb2f63e4023aacd65df8805904c)



## 用js来控制血条

- 其实很简单的，只需改变`ProgressBar`组件的`progress`属性即可改变血条的长度。
- `progress`的值是一个小数

```js
//以一个人物的血条为例

//先给人物设定一个血条上限
let hpMaximums = 20；

//定义一个变量用来保存当前血量
let heroHp = hpMaximums;

//要获取到血条组件
this.heroProgress = cc.find('Canvas/bg/heroBlood').getComponent(cc.ProgressBar);

//以角色被怪物攻击打中为例，此时会触发人物的碰撞回调。
//受击函数，可以碰撞回调中调用改函数改变血条长度
playerHit() {
    //可以根据progress来判断角色血条是否为零。
   if (this.heroProgress.progress > 0.05) {
       		//被攻击到时扣除当前角色血量
            this.heroHp--;
       		//获取到血条的progress属性，通过改变它来更改血条长度，因为该属性为小数，所以需先除以血条上限
       		//除以血条上限得到的数就是当前血量的百分比，将它赋值给progress即可。
            this.heroProgress.progress = this.playerHp / hpMaximums;
        } else if (this.heroProgress.progress <= 0.05) {
            //当血条上限变为零时就可以切换到角色死亡的场景结束游戏。
            cc.director.loadScene('dead');
     }
 },


```

