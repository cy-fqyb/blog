(window.webpackJsonp=window.webpackJsonp||[]).push([[23],{391:function(v,t,e){"use strict";e.r(t);var a=e(0),s=Object(a.a)({},(function(){var v=this,t=v._self._c;return t("ContentSlotsDistributor",{attrs:{"slot-key":v.$parent.slotKey}},[t("h1",{attrs:{id:"mvvm模式"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#mvvm模式"}},[v._v("#")]),v._v(" MVVM模式")]),v._v(" "),t("p",[t("img",{attrs:{src:"https://s1.vika.cn/space/2023/01/04/436f3e7d1706475f89efdc12b125fd8d",alt:"mvvm"}})]),v._v(" "),t("h2",{attrs:{id:"旧的服务器模式"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#旧的服务器模式"}},[v._v("#")]),v._v(" 旧的服务器模式")]),v._v(" "),t("ul",[t("li",[t("p",[v._v("在之前网页是在服务器中将视图和数据拼接好渲染好后，将网页发送给浏览器让浏览器显示给用户查看。")])]),v._v(" "),t("li",[t("p",[v._v("这时，浏览器只起到显示网页的作用，而大部分的操作都在服务器中进行。")])]),v._v(" "),t("li",[t("p",[v._v("经典的如MVC模式，由Controller控制视图和模型的拼接。")]),v._v(" "),t("h3",{attrs:{id:"缺点"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#缺点"}},[v._v("#")]),v._v(" 缺点：")]),v._v(" "),t("ol",[t("li",[v._v("大部分工作都在服务器中进行，服务器压力大")]),v._v(" "),t("li",[v._v("前后端不分离")]),v._v(" "),t("li",[v._v("服务器复用性低，如一个web端的服务器，无法为移动端，pc端服务")])])])]),v._v(" "),t("h2",{attrs:{id:"rest服务器"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#rest服务器"}},[v._v("#")]),v._v(" REST服务器")]),v._v(" "),t("blockquote",[t("p",[v._v("一种软件架构分风格")])]),v._v(" "),t("ul",[t("li",[v._v("这种设计的服务器，服务器只负责提供接口，通过接口可以向服务器请求数据，也就是说现在服务器只负责提供数据，即Model。(返回JSON格式的数据)")]),v._v(" "),t("li",[v._v("View即页面仍然在浏览器中显示。")])]),v._v(" "),t("h3",{attrs:{id:"优点"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#优点"}},[v._v("#")]),v._v(" 优点")]),v._v(" "),t("ul",[t("li",[v._v("能够实现前后端分离")]),v._v(" "),t("li",[v._v("提高服务器的复用性")])]),v._v(" "),t("h3",{attrs:{id:"问题来了"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#问题来了"}},[v._v("#")]),v._v(" 问题来了")]),v._v(" "),t("ul",[t("li",[v._v("View(视图有了),由浏览器提供的Model(数据也有了)，但如何将数据和视图整合到一起。")])]),v._v(" "),t("p",[t("img",{attrs:{src:"https://s1.vika.cn/space/2023/01/04/8a86c3af262845deb80836187054e330",alt:"mvvm2png"}})]),v._v(" "),t("ul",[t("li",[v._v("之前通过原生js或者是Jquery通过DOM操作来整合视图和数据，但缺点就是操作繁琐，且容易出问题。")]),v._v(" "),t("li",[v._v("偷懒是人类创新的动力，为了更好且更简便的整合视图和模型，出现了VM(即ViewModel)和Js框架，框架就是用来实现VM负责整合视图和模型。(这样的框架如:Vue、React、Angel)")]),v._v(" "),t("li",[v._v("这就是所谓的MVVM:M指Model(模型),V指View(视图),VM指ViewModel(视图模型)")])]),v._v(" "),t("h2",{attrs:{id:"mvvm模式的优点"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#mvvm模式的优点"}},[v._v("#")]),v._v(" MVVM模式的优点")]),v._v(" "),t("p",[t("strong",[v._v("1. 低耦合")]),v._v('。视图（View）可以独立于Model变化和修改，一个ViewModel可以绑定到不同的"View"上，当View变化的时候Model可以不变，当Model变化的时候View也可以不变。')]),v._v(" "),t("p",[t("strong",[v._v("2. 可重用性")]),v._v("。你可以把一些视图逻辑放在一个ViewModel里面，让很多view重用这段视图逻辑。")]),v._v(" "),t("p",[t("strong",[v._v("3. 独立开发")]),v._v("。开发人员可以专注于业务逻辑和数据的开发（ViewModel），设计人员可以专注于页面设计，使用Expression Blend可以很容易设计界面并生成xaml代码。")]),v._v(" "),t("p",[t("strong",[v._v("4. 可测试")]),v._v("。界面素来是比较难于测试的，而现在测试可以针对ViewModel来写。")])])}),[],!1,null,null,null);t.default=s.exports}}]);