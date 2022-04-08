import { createRouter, createWebHistory } from 'vue-router'
import Exercice1View from '../views/Exercice1View.vue'
import Exercice2View from '../views/Exercice2View.vue'
import GroupeA from '../views/GroupeA.vue'
import GroupeB from '../views/GroupeB.vue'
import GroupeAB from '../views/GroupeAB.vue'

const routes = [
  {
    path: '/ex1',
    name: 'exo1',
    component: Exercice1View
  },
  {
    path: '/ex2',
    name: 'exo2',
    component: Exercice2View
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    //component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/ex2/grA',
    name: 'groupeA',
    component: GroupeA
  },
  {
    path: '/ex2/grB',
    name: 'groupeB',
    component: GroupeB
  },
  {
    path: '/ex2/grAB',
    name: 'groupeAB',
    component: GroupeAB
  }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
