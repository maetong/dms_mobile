module.exports = {
  title: "DMS Mobile 开发文档",
  description: "网站的描述",
  head: [
    ["script", { src: "/js/jquery.min.js" }],
    ["script", { src: "/js/bd.js" }],
  ],
  themeConfig: {
    navbar: true,
    displayAllHeaders: false,
    sidebar: [
      {
        title: "开发指南",
        collapsable: false,
        children: [["/guide/", "开发指南"]],
      },
      {
        title: "基础组件",
        collapsable: false,
        children: [
          ["/markdown/m-page.md", "m-page 页面"],
          ["/markdown/m-button.md", "m-button 按钮"],
          ["/markdown/m-label.md", "m-label 单元格"],
          ["/markdown/m-input.md", "m-input 文本输入"],
          ["/markdown/m-textarea.md", "m-textarea 文本域"],
          ["/markdown/m-picker.md", "m-picker 选择"],
          ["/markdown/m-picker-date.md", "m-picker 时间选择"],
          ["/markdown/validator.md", "validator 表单校验"],
          ["/markdown/m-swipe-cell.md", "m-swipe-cell 滑动单元格"],
          ["/markdown/m-dialog.md", "m-dialog 弹窗交互"],
          ["/markdown/swiper-tab.md", "swiper-tab 标签页"],
          ["/markdown/navbar.md", "navbar 导航栏"],
        ],
      },
      {
        title: "业务组件",
        collapsable: false,
        children: [
          ["/markdown/search-filter.md", "search-filter 筛选"],
          ["/markdown/base-scroll.md", "base-scroll 下拉刷新上拉加载"],
          ["/markdown/m-license.md", "m-license 车牌输入"],
          ["/markdown/m-vehicle-check-cell.md", "车辆检查项"],
          ["/markdown/dict.md", "dict 数据字典"],
          ["/markdown/doc-reader.md", "doc-reader 文档阅读器"],
        ],
      },
    ],
  },
  lastUpdated: "Last Updated",
  host: "127.0.0.1",
  port: 8001,
};
