import Vue from 'vue';
import Router from 'vue-router';

import { Home, Game, End } from './components/index';

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
    {
      path: '/end',
      name: 'End',
      component: End
    },
  ]
});

export default router;