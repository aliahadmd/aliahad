import { createRouter, createWebHistory } from 'vue-router'
import BlogListPage from '../pages/BlogListPage.vue'
import BlogPostPage from '../pages/BlogPostPage.vue'
import AboutMePage from '../pages/AboutMePage.vue'
import PortfolioPage from '../pages/PortfolioPage.vue'

const routes = [
  {
    path: '/note',
    name: 'BlogList',
    component: BlogListPage
  },
  {
    path: '/note/:slug',
    name: 'BlogPost',
    component: BlogPostPage
  },
  {
    path: '/',
    name: 'AboutMe',
    component: AboutMePage
  },
  {
    path: '/portfolio',
    name: 'Portfolio',
    component: PortfolioPage
  }

]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router