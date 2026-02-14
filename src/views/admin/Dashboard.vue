<template>
  <div class="dashboard">
    <h1>ダッシュボード</h1>
    <p class="welcome-message">ポートフォリオ管理画面へようこそ</p>

    <div class="stats-grid">
      <div class="stat-card">
        <h3>ブログ投稿</h3>
        <p class="stat-number">{{ blogCount }}</p>
        <router-link to="/admin/blog" class="stat-link">管理する →</router-link>
      </div>

      <div class="stat-card">
        <h3>プロジェクト</h3>
        <p class="stat-number">{{ projectCount }}</p>
        <router-link to="/admin/projects" class="stat-link">管理する →</router-link>
      </div>

      <div class="stat-card" :class="{ 'has-unread': unreadCount > 0 }">
        <h3>コンタクト</h3>
        <p class="stat-number">{{ contactCount }}</p>
        <p v-if="unreadCount > 0" class="unread-note">未読 {{ unreadCount }}件</p>
        <router-link to="/admin/contacts" class="stat-link">確認する →</router-link>
      </div>
    </div>

    <div class="quick-actions">
      <h2>クイックアクション</h2>
      <div class="actions-grid">
        <router-link to="/admin/blog/new" class="action-button">
          <span>新しいブログ記事</span>
        </router-link>
        <router-link to="/admin/projects/new" class="action-button">
          <span>新しいプロジェクト</span>
        </router-link>
        <router-link to="/" class="action-button secondary">
          <span>サイトを表示</span>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useBlog } from '../../composables/useBlog'
import { useProjects } from '../../composables/useProjects'
import { useContacts } from '../../composables/useContacts'

const { blogs, fetchAllBlogs } = useBlog()
const { projects, fetchAllProjects } = useProjects()
const { contacts, fetchAllContacts } = useContacts()

const blogCount = ref(0)
const projectCount = ref(0)
const contactCount = ref(0)
const unreadCount = ref(0)

onMounted(async () => {
  await Promise.all([
    fetchAllBlogs(),
    fetchAllProjects(),
    fetchAllContacts()
  ])

  blogCount.value = blogs.value.length
  projectCount.value = projects.value.length
  contactCount.value = contacts.value.length
  unreadCount.value = contacts.value.filter(c => !c.read).length
})
</script>

<style scoped>
.dashboard h1 {
  margin-bottom: var(--spacing-sm);
  color: var(--color-primary);
}

.welcome-message {
  color: var(--color-text-light);
  margin-bottom: var(--spacing-xl);
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: var(--spacing-lg);
  margin-bottom: var(--spacing-2xl);
}

.stat-card {
  background-color: var(--color-background);
  padding: var(--spacing-xl);
  border-radius: var(--border-radius);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.stat-card h3 {
  margin: 0 0 var(--spacing-md) 0;
  color: var(--color-text-light);
  font-size: 0.95rem;
  font-weight: 600;
  text-transform: uppercase;
}

.stat-number {
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--color-secondary);
  margin: 0 0 var(--spacing-md) 0;
}

.stat-link {
  color: var(--color-secondary);
  text-decoration: none;
  font-weight: 600;
  transition: color var(--transition-fast);
}

.stat-link:hover {
  color: var(--color-primary);
}

.has-unread {
  border-left: 4px solid var(--color-danger);
}

.unread-note {
  font-size: 0.85rem;
  color: var(--color-danger);
  font-weight: 600;
  margin: 0 0 var(--spacing-sm) 0;
}

.quick-actions {
  background-color: var(--color-background);
  padding: var(--spacing-xl);
  border-radius: var(--border-radius);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.quick-actions h2 {
  margin: 0 0 var(--spacing-lg) 0;
  font-size: 1.25rem;
}

.actions-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: var(--spacing-md);
}

.action-button {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-md) var(--spacing-lg);
  background-color: var(--color-secondary);
  color: white;
  text-decoration: none;
  border-radius: var(--border-radius);
  font-weight: 600;
  transition: all var(--transition-fast);
}

.action-button:hover {
  background-color: var(--color-primary);
  transform: translateY(-2px);
}

.action-button.secondary {
  background-color: transparent;
  border: 1px solid var(--color-border);
  color: var(--color-text);
}

.action-button.secondary:hover {
  background-color: var(--color-background-alt);
}
</style>
