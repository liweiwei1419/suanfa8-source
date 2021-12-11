const navConfig = require('../../config/navConfig.js');
const sidebarConfig = require('../../config/sidebarConfig.js');

const { config } = require("vuepress-theme-hope");

module.exports = config({
  title: "算法吧",
  description: "欢迎来到算法吧",
  // dest: "./dist",

  head: [
    [
      "script",
      { src: "https://cdn.jsdelivr.net/npm/react/umd/react.production.min.js" },
    ],
    [
      "script",
      {
        src: "https://cdn.jsdelivr.net/npm/react-dom/umd/react-dom.production.min.js",
      },
    ],
    ["script", { src: "https://cdn.jsdelivr.net/npm/vue/dist/vue.min.js" }],
    [
      "script",
      { src: "https://cdn.jsdelivr.net/npm/@babel/standalone/babel.min.js" },
    ],
    [
    "script", {}, `
    var _hmt = _hmt || [];
(function() {
  var hm = document.createElement("script");
  hm.src = "https://hm.baidu.com/hm.js?15b6e6a744ff92195a76bda533c2c0bf";
  var s = document.getElementsByTagName("script")[0]; 
  s.parentNode.insertBefore(hm, s);
})();
    `
  ],
    ['link', { rel: 'icon', href: '/suanfa8.png' }]
  ],

  themeConfig: {
    logo: '/suanfa8.png',
    hostname: "http://suanfa8.com/",

    author: "liweiwei1419",
    repo: "liweiwei1419/liweiwei1419.github.io",

    nav: navConfig,
    sidebar: sidebarConfig,
    sidebarDepth: -1,
    breadcrumb: true,

    // blog: {
    //   intro: "/intro/",
    //   sidebarDisplay: "mobile",
    //   links: {
    //     Zhihu: "https://zhihu.com",
    //     Baidu: "https://baidu.com",
    //     Github: "https://github.com",
    //   },
    // },

    themeColor: false,

    footer: {
      display: true,
      content: "欢迎来到算法吧",
    },

    comment: {
      type: "valine",
      appId: "mqMDM2jkdekHlk3GRbuUPjoG-gzGzoHsz", // your appId
      appKey: "8kmH8Wx6Dh5ewLScMuafVH9o", // your appKey
      // serverURL: "https://vuepress-theme-hope-comment.vercel.app",
      placeholder: "留言请不要贴一段代码，找别人找 bug，代码问题请自己调试。填写 E-mail 在收到回复的时候会有邮件通知，有反馈和建议请到右上角「留言反馈」处留言，或者给本 GitHub 提一个 issue。"
    },

    copyright: {
      status: "global",
    },

    git: {
      timezone: "Asia/Shanghai",
    },

    search: true,
    searchMaxSuggestions: 10,

    mdEnhance: {
      enableAll: true,
      presentation: {
        plugins: [
          "highlight",
          "math",
          "search",
          "notes",
          "zoom",
          "anything",
          "audio",
          "chalkboard",
        ],
      },
    },

    pwa: {
      favicon: "/favicon.ico",
      cachePic: true,
      apple: {
        icon: "/assets/icon/apple-icon-152.png",
        statusBarColor: "black",
      },
      msTile: {
        image: "/assets/icon/ms-icon-144.png",
        color: "#ffffff",
      },
      manifest: {
        icons: [
          {
            src: "/assets/icon/chrome-mask-512.png",
            sizes: "512x512",
            purpose: "maskable",
            type: "image/png",
          },
          {
            src: "/assets/icon/chrome-mask-192.png",
            sizes: "192x192",
            purpose: "maskable",
            type: "image/png",
          },
          {
            src: "/assets/icon/chrome-512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "/assets/icon/chrome-192.png",
            sizes: "192x192",
            type: "image/png",
          },
        ],
        shortcuts: [
          {
            name: "Guide",
            short_name: "Guide",
            url: "/guide/",
            icons: [
              {
                src: "/assets/icon/guide-maskable.png",
                sizes: "192x192",
                purpose: "maskable",
                type: "image/png",
              },
              {
                src: "/assets/icon/guide-monochrome.png",
                sizes: "192x192",
                purpose: "monochrome",
                type: "image/png",
              },
            ],
          },
        ],
      },
    },
  },

  plugins: {
    // "@mr-hope/comment": {
    //   type: "vssue",
    //   // 设置 `platform` 而不是 `api`
    //   platform: "github",

    //   // 其他的 Vssue 配置
    //   owner: "suanfa8",
    //   repo: "suanfa8.github.io",
    //   clientId: "781767f080152279e543",
    //   clientSecret: "5511f69d1a7e89d925b3fb4887b6f2db7fdf3856",
    // },
  },
});
