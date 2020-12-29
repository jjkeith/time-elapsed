import Vue from 'vue'
import App from './App.vue'
import { BButton, BButtonGroup, BFormInput, BTooltip, BIcon, BIconArrowLeft, BIconArrowRight, BIconExclamationCircleFill, BIconTwitter, BIconChat, BIconEnvelope, BIconGithub, BIconLinkedin } from 'bootstrap-vue'

Vue.config.productionTip = false
// Install only the Vue Bootstrap elements in use
Vue.component('BButton', BButton)
Vue.component('BButtonGroup', BButtonGroup)
Vue.component('BInput', BFormInput)
Vue.component('BTooltip', BTooltip)
Vue.directive('BButton', BButton)
Vue.directive('BInput', BFormInput)
Vue.directive('BTooltip', BTooltip)

Vue.component('BIcon', BIcon)
Vue.component('BIconArrowLeft', BIconArrowLeft);
Vue.component('BIconArrowRight', BIconArrowRight);
Vue.component('BIconExclamationCircleFill', BIconExclamationCircleFill)
Vue.component('BIconTwitter', BIconTwitter)
Vue.component('BIconChat', BIconChat)
Vue.component('BIconEnvelope', BIconEnvelope)
Vue.component('BIconGithub', BIconGithub)
Vue.component('BIconLinkedin', BIconLinkedin)

new Vue({
  render: h => h(App),
}).$mount('#app')


