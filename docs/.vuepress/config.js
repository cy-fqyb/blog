module.exports = {
  // 插件：置顶按钮、图片缩放
  plugins: [
    //"@vuepress/back-to-top",
    "@vuepress/medium-zoom",
    [
      "@vuepress-reco/vuepress-plugin-kan-ban-niang", //看板娘插件
      {
        theme: ["whiteCat"],
        clean: false,
        info: "https://github.com/mengqiuleo",
        messages: {
          welcome: "欢迎来到我的blog",
          home: "回到首页",
          theme: "让其他伙伴陪你吧！",
          close: "再见哦",
        },
        // modelStyle: {
        //   bottom: "40px",
        //   left: "300px",
        // },
        // btnStyle: {
        //   left: "430px",
        //   bottom: "100px",
        // },
        messageStyle: {
          right: "200px",
          bottom: "280px",
          textAlign: "center",
          width: "200px",
          height: "40px",
          lineHeight: "40px",
        },
        height: 360,
      },
    ],
    //樱花插件
    [
      "sakura",
      {
        num: 20, // 默认数量
        show: true, //  是否显示
        zIndex: 1, // 层级
        img: {
          replace: false, // false 默认图 true 换图 需要填写httpUrl地址
          httpUrl: "...", // 绝对路径
        },
      },
    ],
    [
      "dynamic-title",
      {
        // showIcon: 'https://www.typescriptlang.org/favicon-32x32.png?v=8944a05a8b601855de116c8a56d3b3ae',
        showText: "(/≧▽≦/)欢迎回来~",
        // hideIcon: 'https://www.typescriptlang.org/favicon-32x32.png?v=8944a05a8b601855de116c8a56d3b3ae',
        hideText: "(●—●)bye bye~",
        recoverTime: 1000,
      },
    ],

    // vssue评论插件
    [
      "@vssue/vuepress-plugin-vssue",
      {
        // 设置 `platform` 而不是 `api`
        platform: "github",
        locale: "zh",
        // 其他的 Vssue 配置
        owner: "cy-fqyb",
        repo: "blog",
        clientId: "b8f5189c5467acd562b7",
        clientSecret: "539a63222bfc2a9a7b4369ffd341622052fe3c66",
        autoCreateIssue: true,
      },
    ],
  ],
  // 自定义网站 favicon
  head: [["link", { rel: "icon", href: "/img/favicon.ico" }]],
  // 根路径，和仓库名一致
  base: "/fqyb-blog/",
  // 左上角标题
  title: "枫桥夜泊Blog",
  // markdown 相关配置
  markdown: {
    // 代码块行号
    lineNumbers: true,
  },
  theme: "vdoing",
  // 默认主题相关配置
  themeConfig: {
    // 配置左上角的 logo
    logo: "/img/logo.jpg",
    // 导航栏
    nav: require("./nav.js"),
    // 侧边栏
    sidebar: require("./sidebar.js"),
    // sidebar: 'auto',
    // 标题深度，2 表示提取 h2 和 h3 标题
    sidebarDepth: 2,
    // 启用页面滚动效果
    smoothScroll: true,
    // 最后更新时间
    lastUpdated: "更新时间",
    // 默认值是 true 。设置为 false 来禁用所有页面的 下一篇 链接
    nextLinks: true,
    // 默认值是 true 。设置为 false 来禁用所有页面的 上一篇 链接
    prevLinks: true,
    // 导航栏显示 gitee 仓库
    repo: "https://gitee.com/fengqiao-ye",
    repoLabel: "Gitee",
    vssueConfig: {
      platform: "github",
      // 其他的 Vssue 配置
      owner: "cy-fqyb",
      repo: "blog",
      clientId: "b8f5189c5467acd562b7",
      clientSecret: "539a63222bfc2a9a7b4369ffd341622052fe3c66",
      autoCreateIssue: true,
    },
  },
};
