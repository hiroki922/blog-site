<template>
  <div class="admin-layout">
    <aside class="admin-sidebar">
      <div class="sidebar-header">
        <h2>管理画面</h2>
      </div>
      <nav class="sidebar-nav">
        <router-link to="/admin" class="nav-item" exact-active-class="active">
          <span>ダッシュボード</span>
        </router-link>
        <router-link to="/admin/blog" class="nav-item" active-class="active">
          <span>ブログ</span>
        </router-link>
        <router-link to="/admin/projects" class="nav-item" active-class="active">
          <span>プロジェクト</span>
        </router-link>
        <router-link to="/admin/contacts" class="nav-item" active-class="active">
          <span>コンタクト</span>
        </router-link>
        <div class="nav-divider"></div>
        <router-link to="/" class="nav-item">
          <span>サイトを表示</span>
        </router-link>
        <button @click="handleLogout" class="nav-item logout-btn">
          <span>ログアウト</span>
        </button>
      </nav>
    </aside>
    <main class="admin-main">
      <router-view />
    </main>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useAuth } from '../../composables/useAuth'

const router = useRouter()
const { signOut } = useAuth()

const handleLogout = async () => {
  await signOut()
  router.push('/login')
}
</script>

<style scoped>
.admin-layout {
  display: flex;
  min-height: 100vh;
  background-color: var(--color-background-alt);
}

.admin-sidebar {
  width: 250px;
  background-color: var(--color-background);
  border-right: 1px solid var(--color-border);
  position: fixed;
  height: 100vh;
  overflow-y: auto;
}

.sidebar-header {
  padding: var(--spacing-lg);
  border-bottom: 1px solid var(--color-border);
}

.sidebar-header h2 {
  margin: 0;
  font-size: 1.25rem;
  color: var(--color-primary);
}

.sidebar-nav {
  padding: var(--spacing-md);
}

.nav-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-sm) var(--spacing-md);
  color: var(--color-text);
  text-decoration: none;
  border-radius: var(--border-radius);
  transition: background-color var(--transition-fast);
  margin-bottom: var(--spacing-xs);
  cursor: pointer;
  width: 100%;
  border: none;
  background: none;
  text-align: left;
  font-size: 1rem;
}

.nav-item:hover {
  background-color: var(--color-background-alt);
}

.nav-item.active {
  background-color: var(--color-secondary);
  color: white;
}

.nav-divider {
  height: 1px;
  background-color: var(--color-border);
  margin: var(--spacing-md) 0;
}

.logout-btn {
  color: #e53e3e;
}

.logout-btn:hover {
  background-color: rgba(229, 62, 62, 0.1);
}

.admin-main {
  flex: 1;
  margin-left: 250px;
  padding: var(--spacing-xl);
  min-height: 100vh;
}

@media (max-width: 768px) {
  .admin-sidebar {
    width: 200px;
  }

  .admin-main {
    margin-left: 200px;
    padding: var(--spacing-md);
  }
}
</style>
