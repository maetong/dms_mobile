/**
 * 配置文件
 * 在Vue组件中 可通过 this.$appConfig.xxx 访问
 */
const devConfig = {
  // requsetUrl: "https://mock.yonyoucloud.com/mock/3597", // 请求地址
  requsetUrl: "http://127.0.0.1:8088",  
  // requsetUrl: " http://210.13.111.26:10262"
};

//生产环境
const proConfig = {
  requsetUrl: "", 
};

let config = devConfig;
// let config = proConfig;

module.exports = config;
