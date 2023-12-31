import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/sign-up',
      name: 'signup',
      component: () => import('../views/SignUpView.vue')
    }
  ]
})

router.beforeEach((to, from, next) => {
  const title = to.meta.title
  if (title) {
    document.title = title as string;
  }
  next()
})

export default router
