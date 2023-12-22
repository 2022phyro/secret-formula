import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CookView from '../views/CookView.vue'
import { checkAuth, lset } from '@/utils'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/cook/:id?',
      name: 'cook',
      component: CookView,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    }
  ]
})
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // This route requires auth, check if logged in
    // if not, redirect to login page.
    if (!checkAuth()) {
      next({
        name: 'home',
        // Save the location we were at to come back later
        query: { redirect: to.fullPath },
      })
    } else {
      next()
    }
  } else {
    next() // Make sure to always call next()!
  }
})

export default router
