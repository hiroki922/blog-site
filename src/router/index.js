import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import Projects from '../views/Projects.vue'
import Blog from '../views/Blog.vue'
import BlogDetail from '../views/BlogDetail.vue'
import Login from '../views/Login.vue'
import AdminLayout from '../views/admin/AdminLayout.vue'
import Dashboard from '../views/admin/Dashboard.vue'
import BlogList from '../views/admin/BlogList.vue'
import BlogEditor from '../views/admin/BlogEditor.vue'
import { requireAuth } from '../middleware/auth'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { title: 'Home - Portfolio' }
  },
  {
    path: '/about',
    name: 'About',
    component: About,
    meta: { title: 'About - Portfolio' }
  },
  {
    path: '/projects',
    name: 'Projects',
    component: Projects,
    meta: { title: 'Projects - Portfolio' }
  },
  {
    path: '/blog',
    name: 'Blog',
    component: Blog,
    meta: { title: 'Blog - Portfolio' }
  },
  {
    path: '/blog/:slug',
    name: 'BlogDetail',
    component: BlogDetail,
    meta: { title: 'Blog Post - Portfolio' }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { title: 'Login - Portfolio' }
  },
  {
    path: '/admin',
    component: AdminLayout,
    beforeEnter: requireAuth,
    children: [
      {
        path: '',
        name: 'Dashboard',
        component: Dashboard,
        meta: { title: 'Dashboard - Admin' }
      },
      {
        path: 'blog',
        name: 'BlogList',
        component: BlogList,
        meta: { title: 'ブログ管理 - Admin' }
      },
      {
        path: 'blog/new',
        name: 'BlogNew',
        component: BlogEditor,
        meta: { title: '新規ブログ作成 - Admin' }
      },
      {
        path: 'blog/:id/edit',
        name: 'BlogEdit',
        component: BlogEditor,
        meta: { title: 'ブログ編集 - Admin' }
      }
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

// ページタイトル設定
router.afterEach((to) => {
  document.title = to.meta.title || 'Portfolio'
})

export default router
