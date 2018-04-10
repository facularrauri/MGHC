// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import Buefy from 'buefy'

Vue.use(Buefy)

Vue.config.productionTip = false

const isAuthenticated = function () {
  return window.localStorage.token
}

router.beforeEach((to, from, next) => {
  if (!to.meta.isPublic && !isAuthenticated()) {
    return next({ name: 'login' })
  }
  if (to.name === 'login' && isAuthenticated()) {
    return next({ name: 'main' })
  }
  return next()
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
