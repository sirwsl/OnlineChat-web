/**
 * 在生产环境 代理是无法生效的，所以这里没有生产环境的配置
 * -------------------------------
 * The agent cannot take effect in the production environment
 * so there is no configuration of the production environment
 * For details, please see
 * https://pro.ant.design/docs/deploy
 */
export default {
  dev:{
      '/api/': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        pathRewrite: {'^/api': ''},
      },
      '/websocket/': {
        target: 'ws://localhost:8080/', // 后台服务地址以及端口号
        ws: true, // websoket 服务
        changeOrigin: true, //是否跨域
        pathRewrite: {'^/websocket': ''},
      }
    }

};

