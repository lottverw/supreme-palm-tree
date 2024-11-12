import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/repositories',
      name: 'Repositories',
      component: () => import('../views/RepositoriesView.vue'),
    },
    {
      path: '/auth',
      name: 'Auth',
      component: () => import('../views/AuthView.vue')
    },
    {
      path: '/repository/:repo/:owner/commits',
      name: 'Commits',
      component: () => import('../views/CommitView.vue')
    }
  ],
})

export default router
