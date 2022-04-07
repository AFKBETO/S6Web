import { createRouter, createWebHistory } from 'vue-router'
import Exercice1View from '../views/Exercice1View.vue'
import Exercice2View from '../views/Exercice2View.vue'

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
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
