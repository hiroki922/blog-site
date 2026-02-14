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
import ProjectList from '../views/admin/ProjectList.vue'
import ProjectEditor from '../views/admin/ProjectEditor.vue'
import Contact from '../views/Contact.vue'
import ContactList from '../views/admin/ContactList.vue'
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
    path: '/contact',
    name: 'Contact',
    component: Contact,
    meta: { title: 'Contact - Portfolio' }
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
      },
      {
        path: 'projects',
        name: 'ProjectList',
        component: ProjectList,
        meta: { title: 'プロジェクト管理 - Admin' }
      },
      {
        path: 'projects/new',
        name: 'ProjectNew',
        component: ProjectEditor,
        meta: { title: '新規プロジェクト作成 - Admin' }
      },
      {
        path: 'projects/:id/edit',
        name: 'ProjectEdit',
        component: ProjectEditor,
        meta: { title: 'プロジェクト編集 - Admin' }
      },
      {
        path: 'contacts',
        name: 'ContactList',
        component: ContactList,
        meta: { title: 'お問い合わせ管理 - Admin' }
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
