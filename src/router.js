import Vue from 'vue';
import Router from 'vue-router';

import { Game, End, Report, Home, Adjectives } from './components/index';

Vue.use(Router);

// Routes
const router = new Router({
  mode: 'history',
  hash: true,
  routes: [
    { path: '*', redirect: '/home' },  

    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/adjectives',
      name: 'Adjectives',
      component: Adjectives
    },
    {
      path: '/game',
      name: 'Game',
      component: Game
    },
    {
      path: '/end',
      name: 'End',
      component: End
    },
    {
      path: '/report',
      name: 'Report',
      component: Report
    },
  ]
});

export default router;