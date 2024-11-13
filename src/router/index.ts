import { createRouter, createWebHistory } from 'vue-router'
import RepositoriesView from '../views/RepositoriesView.vue'
import AuthView from '@/views/AuthView.vue'
import CommitView from '@/views/CommitView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: AuthView,
      meta: { breadcrumb: 'Home' },
    },
    {
      path: '/repositories',
      name: 'Repositories',
      component: RepositoriesView,
      meta: { breadcrumb: 'Repostitories' },
    },
    {
      path: '/auth',
      name: 'Auth',
      component: AuthView,
    },
    {
      path: '/repository/:repo/commits',
      name: 'Commits',
      component: CommitView,
      meta: { breadcrumb: 'Commits' },
    }
  ],
})

export default router
