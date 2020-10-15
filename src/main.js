import Vue from 'vue'
import App from './App.vue'
import router from './router'

import 'normalize.css'
import './styles/index.scss'
import './icons'

import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import directives from '@fe/packages/directives'
import promiseFinally from 'promise.prototype.finally'

promiseFinally.shim()

Vue.use(Element)

directives.forEach(directive => {
  Vue.use(directive)
})

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
