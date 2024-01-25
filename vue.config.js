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
  },
  pages: {
    index: {
      // page 的入口
      entry: 'src/main.js',
      // 模板来源
      template: 'public/index.html',
      // 在 dist/index.html 的输出
      filename: 'index.html',
      // 当使用 title 选项时，
      // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
      title: 'ASR分析平台',
      // 在这个页面中包含的块，默认情况下会包含
      // 提取出来的通用 chunk 和 vendor chunk。
      chunks: ['chunk-vendors', 'chunk-common', 'index']
    }
  }
})
