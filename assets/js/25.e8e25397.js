(window.webpackJsonp=window.webpackJsonp||[]).push([[25],{395:function(t,s,a){"use strict";a.r(s);var n=a(0),e=Object(n.a)({},(function(){var t=this,s=t._self._c;return s("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[s("h1",{attrs:{id:"vue2-学习笔记"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#vue2-学习笔记"}},[t._v("#")]),t._v(" vue2 学习笔记")]),t._v(" "),s("p",[s("a",{attrs:{href:"https://v2.cn.vuejs.org/",target:"_blank",rel:"noopener noreferrer"}},[t._v("vue2 官方文档"),s("OutboundLink")],1)]),t._v(" "),s("h1",{attrs:{id:"自定义指令"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#自定义指令"}},[t._v("#")]),t._v(" 自定义指令")]),t._v(" "),s("p",[s("a",{attrs:{href:"https://v2.cn.vuejs.org/v2/guide/custom-directive.html",target:"_blank",rel:"noopener noreferrer"}},[t._v("官方文档"),s("OutboundLink")],1)]),t._v(" "),s("ul",[s("li",[s("p",[t._v("自定义指令分为全局自定义指令,和组件局部自定义指令")])]),t._v(" "),s("li",[s("p",[t._v("全局自定义指令")])])]),t._v(" "),s("div",{staticClass:"language-js line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[t._v("Vue"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("directive")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"fbind"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("bind")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("el"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("binding")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    el"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("value "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" binding"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("value"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("inserted")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("el"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" binding")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    el"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("focus"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])]),t._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[t._v("1")]),s("br"),s("span",{staticClass:"line-number"},[t._v("2")]),s("br"),s("span",{staticClass:"line-number"},[t._v("3")]),s("br"),s("span",{staticClass:"line-number"},[t._v("4")]),s("br"),s("span",{staticClass:"line-number"},[t._v("5")]),s("br"),s("span",{staticClass:"line-number"},[t._v("6")]),s("br"),s("span",{staticClass:"line-number"},[t._v("7")]),s("br"),s("span",{staticClass:"line-number"},[t._v("8")]),s("br")])]),s("ul",[s("li",[t._v("局部组件自定义指令")])]),t._v(" "),s("div",{staticClass:"language-js line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//在组件中的directives对象中配置自定义指令")]),t._v("\n\n"),s("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("directives")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//directives对象用于自定义指令")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//自定义指令处理函数,会传入两个参数。一个是指令所在的真实DOM元素,另一个是指令所关联的值")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//自定义指令处理函数何时会被调用:1.指令和元素绑定成功时(第一次),2.指令所在的模板被重新解析")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//函数式自定义指令")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("big")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("element"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" binding")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n      element"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("innerText "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" binding"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("value "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("*")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("10")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n      "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//该函数中的this指向window")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//对象式函数指令")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("fbind")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n      "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("bind")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("el"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" binding")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        el"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("value "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" binding"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("value"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n      "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n      "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("inserted")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("el"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" binding")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        el"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("value "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" binding"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("value"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n        el"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("focus")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n      "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n      "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("update")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("el"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" binding")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        el"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("value "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" binding"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("value"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n      "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])]),t._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[t._v("1")]),s("br"),s("span",{staticClass:"line-number"},[t._v("2")]),s("br"),s("span",{staticClass:"line-number"},[t._v("3")]),s("br"),s("span",{staticClass:"line-number"},[t._v("4")]),s("br"),s("span",{staticClass:"line-number"},[t._v("5")]),s("br"),s("span",{staticClass:"line-number"},[t._v("6")]),s("br"),s("span",{staticClass:"line-number"},[t._v("7")]),s("br"),s("span",{staticClass:"line-number"},[t._v("8")]),s("br"),s("span",{staticClass:"line-number"},[t._v("9")]),s("br"),s("span",{staticClass:"line-number"},[t._v("10")]),s("br"),s("span",{staticClass:"line-number"},[t._v("11")]),s("br"),s("span",{staticClass:"line-number"},[t._v("12")]),s("br"),s("span",{staticClass:"line-number"},[t._v("13")]),s("br"),s("span",{staticClass:"line-number"},[t._v("14")]),s("br"),s("span",{staticClass:"line-number"},[t._v("15")]),s("br"),s("span",{staticClass:"line-number"},[t._v("16")]),s("br"),s("span",{staticClass:"line-number"},[t._v("17")]),s("br"),s("span",{staticClass:"line-number"},[t._v("18")]),s("br"),s("span",{staticClass:"line-number"},[t._v("19")]),s("br"),s("span",{staticClass:"line-number"},[t._v("20")]),s("br"),s("span",{staticClass:"line-number"},[t._v("21")]),s("br"),s("span",{staticClass:"line-number"},[t._v("22")]),s("br"),s("span",{staticClass:"line-number"},[t._v("23")]),s("br"),s("span",{staticClass:"line-number"},[t._v("24")]),s("br"),s("span",{staticClass:"line-number"},[t._v("25")]),s("br")])]),s("h2",{attrs:{id:"自定义指令的钩子函数"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#自定义指令的钩子函数"}},[t._v("#")]),t._v(" 自定义指令的钩子函数")]),t._v(" "),s("p",[t._v("自定义指令存在生命周期\n一个指令存在几个钩子函数(即在某些特殊时期，自动被调用的函数)")]),t._v(" "),s("ul",[s("li",[t._v("bind 函数:只调用一次，指令第一次绑定到元素时调用。在这里可以进行一次性的初始化设置。")]),t._v(" "),s("li",[t._v("inserted 函数:被绑定元素插入父节点时调用 (仅保证父节点存在，但不一定已被插入文档中)。")]),t._v(" "),s("li",[t._v("update 函数:模板被重新解析时调用")]),t._v(" "),s("li",[t._v("componentUpdated 函数:指令所在组件的 VNode 及其子 VNode 全部更新后调用。")]),t._v(" "),s("li",[t._v("ubind 函数:只会调用一次,当指令与元素解绑时被调用")])]),t._v(" "),s("h2",{attrs:{id:"使用自定义指令需要注意的问题"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#使用自定义指令需要注意的问题"}},[t._v("#")]),t._v(" 使用自定义指令需要注意的问题")]),t._v(" "),s("ol",[s("li",[s("p",[t._v("自定义指令的命名:无法使用小驼峰命名，如"),s("strong",[t._v("v-bigNumber")]),t._v("中的 "),s("strong",[t._v("bigNumber")]),t._v(" 会被解析为 "),s("strong",[t._v("bignumber")]),t._v(",官方推荐使用(v-big-number)")])]),t._v(" "),s("li",[s("p",[t._v("自定义指令中的回调函数中的 this 指向:vue 不会维护自定义指令中的回调函数,所以自定义指令中的回调函数中的 this 指向 window")])])]),t._v(" "),s("h1",{attrs:{id:"生命周期"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#生命周期"}},[t._v("#")]),t._v(" 生命周期")]),t._v(" "),s("ul",[s("li",[t._v("一个 vue 实例从开始创建到销毁后所经历的周期，叫做生命周期")]),t._v(" "),s("li",[t._v("vue 在不同的特殊时期，自动帮你调用的函数叫做生命周期函数")])]),t._v(" "),s("h2",{attrs:{id:"生命周期函数"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#生命周期函数"}},[t._v("#")]),t._v(" 生命周期函数")]),t._v(" "),s("h3",{attrs:{id:"beforecreate"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#beforecreate"}},[t._v("#")]),t._v(" beforeCreate")]),t._v(" "),s("ul",[s("li",[t._v("此时无法通过 vm 访问到 data 中的数据、methods 中的方法")]),t._v(" "),s("li",[t._v("该生命周期函数，在 vue 实例被创建前被调用")])]),t._v(" "),s("h3",{attrs:{id:"created"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#created"}},[t._v("#")]),t._v(" Created")]),t._v(" "),s("ul",[s("li",[t._v("该函数在 vue 实例被创建好后立马被同步调用")]),t._v(" "),s("li",[t._v("此时 vue 实例已经创建完毕,数据监测、数据代理已经完成。")]),t._v(" "),s("li",[t._v("可以通过 vm 访问到 data 中的数据、methods 中配置好的方法")])]),t._v(" "),s("h3",{attrs:{id:"beforemount"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#beforemount"}},[t._v("#")]),t._v(" beforeMount")]),t._v(" "),s("ul",[s("li",[t._v("该函数在这阶段，vue 已经解析好模板，已经生成了虚拟 DOM，准备将虚拟 DOM 转化为真实 DOM 后进行挂载。")]),t._v(" "),s("li",[t._v("页面呈现的是未经 vue 编译 DOM 结构")]),t._v(" "),s("li",[t._v("所有对 DOM 的操作，最终都不奏效")])]),t._v(" "),s("h3",{attrs:{id:"mounted"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#mounted"}},[t._v("#")]),t._v(" Mounted")]),t._v(" "),s("ul",[s("li",[t._v("实例被挂载完成后调用，这时 "),s("code",[t._v("el")]),t._v(" 被新创建的 "),s("code",[t._v("vm.$el")]),t._v(" 替换了。")]),t._v(" "),s("li",[t._v("页面中呈现的是经过 vue 编译的 DOM。")]),t._v(" "),s("li",[t._v("此时对 DOM 的操作均能生效，但应尽可能避免操作 DOM。")]),t._v(" "),s("li",[t._v("至此初始化过程结束，一般在此处进行：开启定时器，发送网络请求、订阅消息、绑定自定义事件、等初始化操作")])]),t._v(" "),s("h3",{attrs:{id:"beforeupdate"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#beforeupdate"}},[t._v("#")]),t._v(" beforeUpdate")]),t._v(" "),s("ul",[s("li",[t._v("在数据发生改变后，DOM 被更新之前被调用")]),t._v(" "),s("li",[t._v("此时数据是新的，但页面是旧的(拿到了更新后的数据，准备重新解析模板更新页面，但还没开始)")]),t._v(" "),s("li",[t._v("页面尚未和数据保持同步")])]),t._v(" "),s("h3",{attrs:{id:"updated"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#updated"}},[t._v("#")]),t._v(" updated")]),t._v(" "),s("ul",[s("li",[t._v("在数据更改导致的虚拟 DOM 重新渲染和更新完毕之后被调用。")]),t._v(" "),s("li",[t._v("此时模板已经重新解析完成，虚拟 DOM 已经转化为真实 DOM，页面已经更新完毕。")]),t._v(" "),s("li",[t._v("此时数据是新的，页面也是新的，即页面和数据保持同步")])]),t._v(" "),s("h3",{attrs:{id:"beforedestory"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#beforedestory"}},[t._v("#")]),t._v(" beforeDestory")]),t._v(" "),s("ul",[s("li",[t._v("在 vue 实例被销毁前被调用，在这一步还能使用实例")]),t._v(" "),s("li",[t._v("vm(vue 实例)中的 data、methods、指令等等，都处于可用状态，马上要执行销毁流程")]),t._v(" "),s("li",[t._v("一般在此阶段执行关闭定时器、取消订阅消息、解绑自定义事件等收尾操作")]),t._v(" "),s("li",[t._v("对数据的修改不会触发更新")])]),t._v(" "),s("h3",{attrs:{id:"destroyed"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#destroyed"}},[t._v("#")]),t._v(" destroyed")]),t._v(" "),s("ul",[s("li",[t._v("在 vue 实例被完全销毁后调用。")]),t._v(" "),s("li",[t._v("执行到该步骤后，会解绑 vue 实例中的所有指令，移除所有的自定义事件监听器(原生事件监听还能奏效)，所有的子实例(子组件)也被销毁")])]),t._v(" "),s("h1",{attrs:{id:"vue-cli-脚手架"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#vue-cli-脚手架"}},[t._v("#")]),t._v(" vue-cli(脚手架)")]),t._v(" "),s("p",[s("a",{attrs:{href:"https://cli.vuejs.org/zh/",target:"_blank",rel:"noopener noreferrer"}},[t._v("官方文档"),s("OutboundLink")],1)]),t._v(" "),s("ul",[s("li",[t._v("vue 脚手架是 vue 官方提供的标准化开发工具(官方现在更推荐使用 vite)")])]),t._v(" "),s("h2",{attrs:{id:"安装-vue-脚手架"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#安装-vue-脚手架"}},[t._v("#")]),t._v(" 安装 vue 脚手架")]),t._v(" "),s("blockquote",[s("p",[t._v("安装之前确保电脑已经装了 nodejs 的环境")])]),t._v(" "),s("ol",[s("li",[t._v("下载前建议先配置 npm 淘宝镜像:"),s("strong",[t._v("npm config set registry https://registry.npm.taobao.org")]),t._v("(防止下载速度过慢)")]),t._v(" "),s("li",[t._v("全局安装 vue 脚手架:"),s("strong",[t._v("npm install -g @vue/cli")]),t._v("(只需执行一次即可)")]),t._v(" "),s("li",[t._v("选择自己想要创建项目的目录打开从 cmd 窗口，使用命令快速创建项目:"),s("strong",[t._v("vue create 项目名称")])]),t._v(" "),s("li",[t._v("在 cmd 窗口使用 cd 命令，进入项目文件。运行:"),s("strong",[t._v("npm run serve")]),t._v("即可将项目运行起来。")]),t._v(" "),s("li",[t._v("在当前 cmd 窗口按下 Ctrl+c 即可结束项目")])]),t._v(" "),s("h2",{attrs:{id:"vue-脚手架结构"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#vue-脚手架结构"}},[t._v("#")]),t._v(" vue 脚手架结构")]),t._v(" "),s("h3",{attrs:{id:"杂乱文件"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#杂乱文件"}},[t._v("#")]),t._v(" 杂乱文件")]),t._v(" "),s("ul",[s("li",[s("p",[t._v(".gitignore:git 的忽略文件，在里面配置那些文件不受 git 的管理")])]),t._v(" "),s("li",[s("p",[t._v("babel.config.js:babel 的配置文件。(不用碰)")])]),t._v(" "),s("li",[s("p",[t._v("jsconfig.json:目录中存在 jsconfig.json 文件表示该目录是 JavaScript 项目的根目录。\njsconfig.json 文件指定根文件和 JavaScript 语言服务提供的功能选项。")])]),t._v(" "),s("li",[s("p",[t._v("package.json:用来管理和记录下载的包的文件")])]),t._v(" "),s("li",[s("p",[t._v("package-lock.json:包的版本控制文件")])]),t._v(" "),s("li",[s("p",[t._v("README.md:项目的说明文件(markdown 格式文件，常用于写笔记或说明文档)")])]),t._v(" "),s("li",[s("p",[t._v("vue.config.js:脚手架的配置文件(建议在这关闭 eslint 的语法检查)")])])]),t._v(" "),s("h3",{attrs:{id:"node-modules"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#node-modules"}},[t._v("#")]),t._v(" node_modules")]),t._v(" "),s("ul",[s("li",[t._v("存放项目所依赖的包的文件夹")])]),t._v(" "),s("h3",{attrs:{id:"src"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#src"}},[t._v("#")]),t._v(" src")]),t._v(" "),s("ul",[s("li",[t._v("存放项目主体的文件的夹")]),t._v(" "),s("li",[t._v("src 中的 main.js 文件:整个项目的入口文件")]),t._v(" "),s("li",[t._v("src 中的 assets 用于存放静态资源文件")]),t._v(" "),s("li",[t._v("src 中的 components 用于存放所有组件文件(App.vue 除外)")])]),t._v(" "),s("h2",{attrs:{id:"render-函数"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#render-函数"}},[t._v("#")]),t._v(" render 函数")]),t._v(" "),s("div",{staticClass:"language-js line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[t._v("  "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("render")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("createElement")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("createElement")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'h1'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'helloWorld'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n  "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//简写形式,形参可以任意该变")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token function-variable function"}},[t._v("render")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),s("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("createElement")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=>")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("createElement")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'h1'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'helloWorld'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])]),t._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[t._v("1")]),s("br"),s("span",{staticClass:"line-number"},[t._v("2")]),s("br"),s("span",{staticClass:"line-number"},[t._v("3")]),s("br"),s("span",{staticClass:"line-number"},[t._v("4")]),s("br"),s("span",{staticClass:"line-number"},[t._v("5")]),s("br"),s("span",{staticClass:"line-number"},[t._v("6")]),s("br")])]),s("ul",[s("li",[t._v("该函数由 vue 自己调用,调用该函数时,会传入一个函数(createElement,通过该函数可以创建具体的元素)")])])])}),[],!1,null,null,null);s.default=e.exports}}]);