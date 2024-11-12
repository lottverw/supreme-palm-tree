import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import RepositoriesView from '../views/RepositoriesView.vue'
import AuthView from '@/views/AuthView.vue'
import CommitView from '@/views/CommitView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: AuthView,
    },
    {
      path: '/repositories',
      name: 'Repositories',
      component: RepositoriesView
    },
    {
      path: '/auth',
      name: 'Auth',
      component: AuthView
    },
    {
      path: '/repository/:repo/:owner/commits',
      name: 'Commits',
      component: CommitView
    }
  ],
})

export default router
