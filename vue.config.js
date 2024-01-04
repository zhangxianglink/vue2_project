const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave:false, /*关闭语法检查*/
  devServer: {
    port: '8099',
    proxy: 'http://192.168.6.102:9997'
  }
})