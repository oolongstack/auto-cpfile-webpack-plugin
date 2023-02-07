# auto-cpfile-webpack-plugin
webpack打包后自动上传文件到服务器
```javascript
pnpm add auto-cpfile-webpack-plugin --save-dev
```
``` javascript
const { AutoCpfileWebpackPlugin } = require('auto-cpfile-webpack-plugin')

module.exports = {
  plugins: [
    new AutoCpfileWebpackPlugin({
      host: '', // 服务器主机名
      username: '', //服务器用户名
      password: '', // 服务器密码
      path: '' // 文件上传到的服务器路径
    })
  ]
}
```
