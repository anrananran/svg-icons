import Vue from 'vue'
import App from './App.vue'
import router from './router'

import 'normalize.css'
import './styles/index.scss'
import './icons'

import directives from '@fe/packages/directives'
import promiseFinally from 'promise.prototype.finally'

promiseFinally.shim()

directives.forEach(directive => {
  Vue.use(directive)
})

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
