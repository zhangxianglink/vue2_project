const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  // 打包时候打开
  //publicPath: '././',
  transpileDependencies: true,
  lintOnSave:false, /*关闭语法检查*/
  devServer: {
    proxy: {
      '/api': {
         target: 'http://192.168.6.102:9997', // 目标路径，别忘了加http和端口号
         changOrigin: true,   //如果接口跨域这里就要这个参数配置
         pathRewrite: {
             '^/api': '/'  //实际请求地址是http://baidu.com/news/list
         }
       }
     }
  }
})