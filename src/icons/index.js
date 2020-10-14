import Vue from 'vue'
import { SvgIcon } from '@fe/packages/components'

// register globally
Vue.component('svg-icon', SvgIcon)

const req = require.context('./svg', false, /\.svg$/)
const requireAll = requireContext => requireContext.keys().map(requireContext)
requireAll(req)

const svgIcons = req.keys().reduce((svgIcons, extPath) => {
  const extName = extPath.replace(/^\.\/(.*)\.\w+$/, '$1')
  const value = req(extPath)
  svgIcons[extName] = value
  return svgIcons
}, {})

export default Object.keys(svgIcons)

