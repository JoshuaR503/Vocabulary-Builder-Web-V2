import Vue from 'vue';
import Router from 'vue-router';

import { Home } from './components/index';

Vue.use(Router);

// Routes
const router = new Router({
  mode: 'history',
  hash: true,
  routes: [
    { path: "*", component: Home},
  ]
});

export default router;