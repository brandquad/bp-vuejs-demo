import Vue from 'vue';
import VueRouter from 'vue-router';

import App from './App';

import routes from './routes';

Vue.use(VueRouter);

window.vm = new Vue({
  el: '#bp-vuejs-app',

  router: new VueRouter({
    routes: routes
  }),

  render: h => h(App)
});
