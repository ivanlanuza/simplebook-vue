import Vue from 'vue'
import App from './App.vue'
import vuetify from './settings/vuetify';
import router from './settings/router';

Vue.config.productionTip = false;

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app');


