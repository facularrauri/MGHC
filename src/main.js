// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import Buefy from 'buefy'

import es from 'vee-validate/dist/locale/es'
import VeeValidate from 'vee-validate'

Vue.use(VeeValidate, {
  locale: 'es',
  dictionary: {
    es: es
  }
})

Vue.use(Buefy)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
