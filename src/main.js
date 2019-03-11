import Vue from 'vue'
import Canvas from '../src/components/Canvas'

Vue.config.productionTip = false

new Vue({
  render: h => h(Canvas),
}).$mount('#app')