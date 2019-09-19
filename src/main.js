import Vue from 'vue'
import App from './App.vue'
import VeeValidate from 'vee-validate';

import {store} from './store';
import {router} from './routes';

Vue.use(VeeValidate, {
  classes: true,
  classNames: {
    invalid: 'invalid'
  }
});

new Vue({
  el: '#app',
  store, 
  router,
  render: h => h(App)
})
