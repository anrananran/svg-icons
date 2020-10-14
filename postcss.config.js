const autoprefixer = require('autoprefixer')
const px2vw = require('postcss-px-to-viewport')
const px2px = require('postcss-px-adjust')

const useRelativeUnit = false // 是否启用相对单位

module.exports = ({ file }) => {
  const isIgnorePackage = file && file.dirname && file.dirname.indexOf('node_modules') > -1  // 忽略第三方包的样式处理
  const basePlugins = [autoprefixer()]
  const extPlugins = []

  if (useRelativeUnit) {
    extPlugins.push(
      px2vw({
        unitToConvert: 'px',
        viewportWidth: isIgnorePackage ? 375 : 750, // 设计稿基准尺寸
        unitPrecision: 5,
        propList: ['*'],
        viewportUnit: 'vw',
        fontViewportUnit: 'vw',
        selectorBlackList: [],
        minPixelValue: 1,
        mediaQuery: false,
        replace: true,
        exclude: [],
        landscape: false
      })
    )
  } else {
    if (!isIgnorePackage) {
      extPlugins.push(
        px2px({
          unit: 'px',
          replace: (match, value, unit) => {
            return parseFloat((value / 2).toFixed(5)) + unit
          },
          mediaQuery: false
        })
      )
    }
  }

  return {
    plugins: [
      ...basePlugins,
      ...extPlugins
    ]
  }
}
