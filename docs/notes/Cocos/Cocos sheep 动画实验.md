---
title: Cocos sheep 动画实验
date: 2022-11-15 09:32:57
permalink: /pages/2ff71b/
categories:
  - notes
  - Cocos
tags:
  -
---

# Cocos sheep 动画实验

## 场景搭建

### 动画编辑(应该都会吧)

- 需要准备 4 个动画:1 个奔跑动画，1 个跳跃动画，1 个摆烂动画，1 个触摸动画。实在不会(可以参考我的)
- 奔跑动画:

<img src="/fqyb-blog/notesImg/CocosSheep/奔跑.png" alt="奔跑" style="zoom:50%;margin-left:450px" />

- 跳跃动画:

<img src="/fqyb-blog/notesImg/CocosSheep/跳跃.png" alt="跳跃" style="zoom:50%;margin-left:450px" />

- 摆烂动画:

<img src="/fqyb-blog/notesImg/CocosSheep/摆烂.png" alt="摆烂" style="zoom:50%;margin-left:450px" />

- 触摸动画:

<img src="/fqyb-blog/notesImg/CocosSheep/触摸.png" alt="触摸" style="zoom:50%;margin-left:450px" />

### 创建动画(秉承着保姆攻略原则):dog:

- 第一步:随便从素材图片中选择一张将它拖到层级管理器上形成一个节点，建议重命名为 sheep
- 第二步:点击控制台旁的动画编辑器，然后跟着指示添加动画组件和动画 clip 文件即可。
- 第三步:然后可以参考上面来创建四个动画，注意四个动画都是同一个节点
- 第四步:将羊的奔跑动画拖入到动画组件的`Default clip`属性

## 编写脚本

```js
cc.Class({
  extends: cc.Component,
  properties: {},
  start() {
    //获取动画组件
    let myAnimation = this.node.getComponent(cc.Animation);
    //先播放一次奔跑动画，以便获取动画的状态信息
    let x = myAnimation.play("sheepRun");
    //让羊以摆烂的状态出现。
    myAnimation.play("sheepDown");
    //添加键盘事件
    cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, (event) => {
      switch (event.keyCode) {
        case 68:
          //当按下s键的时候，让它向右跑
          this.node.x += 20;
          /*根据scale来判断羊的朝向，完全没必要定义那么多的变量,如果羊的朝向和按键方向相反，
          则调用内置函数flipx改变羊的朝向。*/
          if (this.node.scale == 1) cc.tween(this.node).flipX(true).start();
          //isPlaying是用来判断动画是否处于播放状态，猜猜看这行用来干什么。
          if (x.isPlaying === false) myAnimation.play("sheepRun");
          break;
        case 65:
          //当按下a键时让羊向左跑，逻辑和上面一样。
          this.node.x -= 20;
          if (this.node.scale == -1) cc.tween(this.node).flipX(false).start();
          if (x.isPlaying === false) myAnimation.play("sheepRun");
          break;
        case 32:
          //按下空格时，播放跳跃动画。
          myAnimation.play("sheepJump");
          break;
      }
    });
    cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, (event) => {
      if ([68, 65].indexOf(event.keyCode) != -1) {
        //判断按下的键是不是a或者s，---js就是自由啊。
        myAnimation.play("sheepDown");
      }
    });
    // 给羊添加点击事件，当羊被点击时播放被触摸的动画
    this.node.on(cc.Node.EventType.TOUCH_START, () => {
       //被点击时播放触摸的动画。
      this.node.getComponent(cc.Animation).play("sheepTouch");
    });
  },
  animationStop() {
    //用来停止动画,不是用的循环动画的话，这行可以删了，会不会出bug。
    this.node.getComponent(cc.Animation).stop();
  },
});

/* 
  记录一下，缓动系统的翻转方法翻转的是节点的scale属性,
  w s a d 的对应的keyCode为 87，83，68，65
  空格的为32，
  使用动作系统来实现转向
  let y = this.node.runAction(cc.flipX(true));
*/
```

## 其它设置

- 脚本挂载:直接将脚本挂载给 sheep 节点即可
- 帧事件:给:sheep:的摆烂动画的最后一帧添加一个帧事件(在里面添加函数 animationStop)

<img src="/fqyb-blog/notesImg/CocosSheep/帧事件.png" alt="帧事件" style="zoom:50%;margin-left:450px" />

## 拓展选择(嫌麻烦，可以不管)

- 简单的加了碰撞盒来限制:sheep:跑出边界
- 修改了下:ram:的跳跃动画的代码

```js
cc.Class({
  extends: cc.Component,
  properties: {
    jumpStart: cc.Vec2,
  },
  start() {
    //获取动画组件
    let myAnimation = this.node.getComponent(cc.Animation);
    console.log(myAnimation);
    let x = myAnimation.play("sheepRun");
    myAnimation.play("sheepDown");
    this.jumpStart = this.node.y;
    cc.director.getCollisionManager().enabled = true;
    //添加键盘事件
    cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, (event) => {
      if (event.keyCode === 68) {
        this.node.x += 20;
        if (this.node.scale == 1) cc.tween(this.node).flipX(true).start();
        if (x.isPlaying === false) myAnimation.play("sheepRun");
      } else if (event.keyCode === 65) {
        this.node.x -= 20;
        if (this.node.scale == -1) cc.tween(this.node).flipX(false).start();
        if (x.isPlaying === false) myAnimation.play("sheepRun");
      } else if (event.keyCode === 32) {
        myAnimation.play("sheepJump");
      }
    });
    cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, (event) => {
      if ([68, 65].indexOf(event.keyCode) != -1) {
        myAnimation.play("sheepDown");
      }
    });
    // 给羊添加点击事件，当羊被点击时播放被触摸的动画
    this.node.on(cc.Node.EventType.TOUCH_START, () => {
      this.node.getComponent(cc.Animation).play("sheepTouch");
    });
  },
  sheepJumpY() {
    this.node.y += 60;
  },
  sheepJump() {
    this.node.y = this.jumpStart;
  },
  onCollisionEnter(other, self) {
    //瞬间转移大法
    this.node.position = cc.Vec2(0, 0);
  },
});
```

## 简单的总结一下:100:

### 涉及到的知识点有

- 动画组件的编辑和通过脚本来控制
- 碰撞系统的使用(我本人加的，原实验没有要求)

### 动画组件的使用

- 如何编辑出想要效果的动画
- 动画准备好后，就可以通过脚本来控制动画
- 想要在脚本中控制动画，就要通过`getComponent(cc.Animation)`来获取动画组件
- 剩下的就是控制动画的播放暂停和停止等等(建议参考官方文档)
- [使用脚本控制动画-官方文档](https://docs.cocos.com/creator/2.4/manual/zh/animation/scripting-animation.html)(作为程序猿，不会翻文档是不合格的！)

### 碰撞系统的使用

- 第一步:给要发生碰撞的两个物体添加碰撞盒
- 第二步:通过代码`cc.director.getCollisionManager().enabled = true;`来开启碰撞系统
- 第三步:添加碰撞回调函数
- 比如上方的代码就是双方碰撞时通过回调函数来改变:sheep:的位置
- 回调函数的类型:

```js
// 只在两个碰撞体开始接触时被调用一次
onBeginContact: function (contact, selfCollider, otherCollider) {
},

// 只在两个碰撞体结束接触时被调用一次
onEndContact: function (contact, selfCollider, otherCollider) {
},

// 每次将要处理碰撞体接触逻辑时被调用
onPreSolve: function (contact, selfCollider, otherCollider) {
},

// 每次处理完碰撞体接触逻辑时被调用
onPostSolve: function (contact, selfCollider, otherCollider) {
}
```

