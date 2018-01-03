import Vue from 'vue';
import VueRouter from 'vue-router';

import App from './App';

import routes from './routes';

Vue.use(VueRouter);

window.vm = new Vue({
  el: '#bp-vuejs-app',

  router: new VueRouter({
    routes: routes,
    scrollBehavior(to) {
      if (to.params.anchor) {
        const anchor = document.getElementById(to.params.anchor);
        document.querySelector('main').scrollTop = anchor.offsetTop - 30;
      }
    }
  }),

  render: h => h(App)
});
