module.exports = {
  devServer: {
    port: "8088",
    proxy: {
      '/mock': {
        target: 'https://mock.yonyoucloud.com',
        changeOrigin: true,
        pathRewrite: {
          '^/mock': '/mock'
        }
      },
    }
  }
};
