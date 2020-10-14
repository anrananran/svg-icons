'use strict'
const path = require('path')
const settings = require('./src/settings')

function resolve(dir) {
  return path.join(__dirname, dir)
}

const context = process.argv[4] || 'icons'
module.exports = {
  publicPath: '/' + context,
  outputDir: context,
  assetsDir: 'static',
  lintOnSave: true,
  productionSourceMap: false,
  devServer: {
    compress: true,
    port: 8080,
    open: false,
    overlay: {
      warnings: false,
      errors: true
    }
  },
  css: {
    loaderOptions: {
      scss: {
        prependData: `@import "@/styles/variables.scss";` // 配置sass全局变量，无需在单独的组件引入
      },
      less: {
        modifyVars: { // vant 主题定制
          'red': '#CB3D2B',
          'blue': '#8babff',
          'orange': '#E6A23C',
          'green': '#55D3A4',
          'gray': '#dcdfe6',
          'gray-light': '#e4e7ed',
          'gray-darker': '#606266',
          'gray-dark': '#969799',
          'text-color': '#454545',
          'cell-value-color': '#909399',
          'border-color': '#ebeef5',
          'button-large-height': '45px',
          'button-large-line-height': '43px'
        }
      }
    }
  },
  chainWebpack(config) {
    config.plugins.delete('preload')
    config.plugins.delete('prefetch')

    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end()

    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()

    config.plugin('html')
      .tap(args => {
        args[0].title = settings.title
        return args
      })

    config.plugin('copy')
      .tap(args => {
        args[0][0].ignore = [
          'config.json'
        ]
        return args
      })

    config.module
      .rule('vue')
      .use('vue-loader')
      .loader('vue-loader')
      .tap(options => {
        options.compilerOptions.preserveWhitespace = true
        return options
      })
      .end()
    
    config
      .devtool('cheap-source-map')
    config
      .optimization.splitChunks({
        chunks: 'all',
        cacheGroups: {
          libs: {
            name: 'n',
            test: /[\\/]node_modules[\\/]/,
            priority: 10,
            chunks: 'initial' // only package third parties that are initially dependent
          },
          elementUI: {
            name: 'e', // split elementUI into a single package
            priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
            test: /[\\/]node_modules[\\/]_?element-ui(.*)/ // in order to adapt to cnpm
          },
          commons: {
            name: 'c',
            test: resolve('src/components'), // can customize your rules
            minChunks: 3, //  minimum common number
            priority: 5,
            reuseExistingChunk: true
          }
        }
      })
    config.optimization.runtimeChunk('single')
  }
}
