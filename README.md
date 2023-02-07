# auto-cpfile-webpack-plugin
webpack打包后自动上传文件到服务器

pnpm add auto-cpfile-webpack-plugin --save-dev

const { AutoCpfileWebpackPlugin } = require('auto-cpfile-webpack-plugin')
module.exports = {
  plugins: [
    new AutoCpfileWebpackPlugin({
      host: '', // 主机名
      
    })
  ]
}
