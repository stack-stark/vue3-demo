/* eslint-disable @typescript-eslint/no-var-requires */
const webpack = require('webpack');
module.exports = {
  productionSourceMap:false,
  chainWebpack(config) {
    config
      .plugin('ignore')
      // 忽略/moment/locale下的所有文件
      .use(new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/));
    config
      .when(process.env.NODE_ENV !== 'development',
        config => {
          config
            .plugin('webpack-bundle-analyzer')
            .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
        }
      );
    config.optimization.splitChunks({
      chunks: 'all',
      cacheGroups: {
        libs: {
          name: 'chunk-libs',
          test: /[\\/]node_modules[\\/]/,
          priority: 10,
          chunks: 'initial' // only package third parties that are initially dependent
        },
        antDesignVue: {
          name: 'chunk-antd-vue', // split elementUI into a single package
          priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
          test: /[\\/]node_modules[\\/]_?ant-design-vue(.*)/ // in order to adapt to cnpm
        },
        loadsh: {
          name: 'chunk-loadsh', // split elementUI into a single package
          priority: 30, // the weight needs to be larger than libs and app or it will be packaged into libs or app
          test: /[\\/]node_modules[\\/]_?loadsh(.*)/ // in order to adapt to cnpm
        },
        antDesign: {
          name: 'chunk-antDesign', // split elementUI into a single package
          priority: 40, // the weight needs to be larger than libs and app or it will be packaged into libs or app
          test: /[\\/]node_modules[\\/]_?@ant-design(.*)/ // in order to adapt to cnpm
        },
      }
    });
  }

}