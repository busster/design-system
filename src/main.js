import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

new Vue({
  breakpoints: {
    sm: el => el.width < 500,
    md: el => el.width >= 500 && el.width < 1000
  },
  router,
  store,
  render: h => h(App)
}).$mount('#app')
