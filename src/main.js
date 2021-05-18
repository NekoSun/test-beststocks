import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

Vue.directive("filter", {
  bind: function(el, binding) {
    let inputHandler = function(e) {
      let ch = String.fromCharCode(e.which)
      let re = new RegExp(binding.value)
      if (!ch.match(re)) {
        e.preventDefault()
      }
    }
    el.addEventListener("keypress", inputHandler)
  },
  inputHandler: null,
})

new Vue({
  render: h => h(App),
}).$mount('#app')
