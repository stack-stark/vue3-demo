/* eslint-disable @typescript-eslint/no-var-requires */
const webpack = require('webpack');
module.exports = {
  devServer: {
    proxy: {
        '/rest': {     //这里最好有一个 /
            target: 'http://uat.panpartner.com/',  // 后台接口域名
            ws: true,        //如果要代理 websockets，配置这个参数
            secure: false,  // 如果是https接口，需要配置这个参数
            changeOrigin: true,  //是否跨域
        }
    }
  },
  // 是否输出SourceMap
  productionSourceMap: process.env.NODE_ENV !== 'production' ? true:false, 

  //打包输出目录
  outputDir: process.env.NODE_ENV !== 'production' ? 'development':'dist',
  chainWebpack(config) {
      // 忽略/moment/locale下的所有文件
    config
      .plugin('ignore')
      .use(new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/));

    config
      .when(process.env.NODE_ENV !== 'development',
        config => {
          config
            .plugin('webpack-bundle-analyzer')
            .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
        }
      );

    //提取公共js
    config.optimization.splitChunks({
      chunks: 'all',
      cacheGroups: {
        libs: {
          name: 'chunk-libs',
          test: /[\\/]node_modules[\\/]/,
          priority: 10,
          chunks: 'initial' // 只打包最初依赖第三方
        },
        antDesignVue: {
          name: 'chunk-antd-vue', 
          priority: 20, // 权重需要大于libs和app，否则它将被打包到libs或app中
          test: /[\\/]node_modules[\\/]_?ant-design-vue(.*)/ // 为了适应cnpm
        },
        loadsh: {
          name: 'chunk-loadsh',
          priority: 30, 
          test: /[\\/]node_modules[\\/]_?loadsh(.*)/ 
        },
        antDesign: {
          name: 'chunk-antDesign',
          priority: 40, 
          test: /[\\/]node_modules[\\/]_?@ant-design(.*)/ 
        },
      }
    });
  }

}