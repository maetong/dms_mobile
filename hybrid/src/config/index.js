/**
 * 配置文件
 * 在Vue组件中 可通过 this.$appConfig.xxx 访问
 */
const devConfig = {
  requsetUrl: "http://127.0.0.1:7001", // 请求地址
};

//生产环境
const proConfig = {
  requsetUrl: "https://s.zhoujie16.cn",
};

let config = devConfig;

module.exports = config;
