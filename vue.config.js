const path = require('path');
const autoprefixer = require('autoprefixer');
const pxtorem = require('postcss-pxtorem');

function resolve (dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  lintOnSave: false,
  devServer: {
    proxy: 'http://oms.xianfengsg.com:8086/warehousePicking-server/'
  },
  chainWebpack: (config)=>{
    config.resolve.alias
        .set('@', resolve('src'))
  },
  publicPath: process.env.NODE_ENV === 'production' ? '/breakage' : '/',
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          autoprefixer(),
          pxtorem({
            rootValue: 37.5,
            propList: ['*']
          })
        ]
      }
    }
  }
}
