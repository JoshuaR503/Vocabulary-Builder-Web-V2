import Vue from 'vue';
import Router from 'vue-router';

import { Home, Game } from './components/index';

Vue.use(Router);

// Routes
const router = new Router({
  mode: 'history',
  hash: true,
  routes: [
    { path: "/", name: 'Home', component: Home},
    {
      path: '/game',
      name: 'Game',
      component: Game
    },
  ]
});

export default router;