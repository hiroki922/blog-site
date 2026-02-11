<template>
  <div class="blog-list">
    <div class="page-header">
      <h1>ブログ投稿管理</h1>
      <BaseButton @click="createNew" variant="primary">
        新規作成
      </BaseButton>
    </div>

    <ErrorMessage v-if="error" :message="error" class="mb-md" />

    <DataTable
      :columns="columns"
      :data="blogs"
      :loading="loading"
      empty-message="ブログ投稿がまだありません"
    >
      <!-- タイトル列 - クリックで詳細ページへ -->
      <template #cell-title="{ item }">
        <router-link :to="`/blog/${item.slug}`" target="_blank" class="title-link">
          {{ item.title }}
        </router-link>
      </template>

      <!-- 公開状態列 -->
      <template #cell-published="{ item }">
        <span :class="['status-badge', item.published ? 'published' : 'draft']">
          {{ item.published ? '公開中' : '下書き' }}
        </span>
      </template>

      <!-- タグ列 -->
      <template #cell-tags="{ item }">
        <div class="tags-list">
          <span v-for="tag in item.tags" :key="tag" class="tag-chip">
            {{ tag }}
          </span>
          <span v-if="!item.tags || item.tags.length === 0" class="no-tags">-</span>
        </div>
      </template>

      <!-- 操作列 -->
      <template #actions="{ item }">
        <div class="action-buttons">
          <BaseButton @click="editBlog(item.id)" size="small">
            編集
          </BaseButton>
          <BaseButton @click="confirmDelete(item)" variant="danger" size="small">
            削除
          </BaseButton>
        </div>
      </template>
    </DataTable>

    <!-- 削除確認モーダル -->
    <div v-if="deleteConfirm" class="modal-overlay" @click="cancelDelete">
      <div class="modal" @click.stop>
        <h3>ブログ投稿を削除</h3>
        <p>「{{ deleteConfirm.title }}」を削除してもよろしいですか？</p>
        <p class="warning-text">この操作は取り消せません。</p>
        <div class="modal-actions">
          <BaseButton @click="cancelDelete" variant="secondary">
            キャンセル
          </BaseButton>
          <BaseButton @click="deleteBlog" variant="danger" :loading="deleting">
            削除する
          </BaseButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useBlog } from '../../composables/useBlog'
import DataTable from '../../components/admin/DataTable.vue'
import BaseButton from '../../components/common/BaseButton.vue'
import ErrorMessage from '../../components/common/ErrorMessage.vue'

const router = useRouter()
const { blogs, loading, error, fetchAllBlogs, deleteBlog: deleteBlogService } = useBlog()

const deleteConfirm = ref(null)
const deleting = ref(false)

const columns = [
  { key: 'title', label: 'タイトル' },
  { key: 'published', label: '状態' },
  { key: 'tags', label: 'タグ' },
  { key: 'created_at', label: '作成日', format: 'date' },
  { key: 'updated_at', label: '更新日', format: 'date' }
]

onMounted(() => {
  fetchAllBlogs()
})

const createNew = () => {
  router.push('/admin/blog/new')
}

const editBlog = (id) => {
  router.push(`/admin/blog/${id}/edit`)
}

const confirmDelete = (blog) => {
  deleteConfirm.value = blog
}

const cancelDelete = () => {
  deleteConfirm.value = null
}

const deleteBlog = async () => {
  if (!deleteConfirm.value) return

  deleting.value = true
  try {
    await deleteBlogService(deleteConfirm.value.id)
    deleteConfirm.value = null
    // リストを再取得
    await fetchAllBlogs()
  } catch (err) {
    console.error('削除エラー:', err)
  } finally {
    deleting.value = false
  }
}
</script>

<style scoped>
.blog-list {
  padding: var(--spacing-lg);
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-lg);
}

.page-header h1 {
  font-size: 2rem;
  color: var(--color-text);
}

.title-link {
  color: var(--color-primary);
  text-decoration: none;
  font-weight: 500;
  transition: color var(--transition-speed);
}

.title-link:hover {
  color: var(--color-secondary);
  text-decoration: underline;
}

.status-badge {
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.85rem;
  font-weight: 600;
}

.status-badge.published {
  background: #d4edda;
  color: #155724;
}

.status-badge.draft {
  background: #fff3cd;
  color: #856404;
}

.tags-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.25rem;
}

.tag-chip {
  padding: 0.2rem 0.5rem;
  background: var(--color-primary);
  color: white;
  border-radius: 4px;
  font-size: 0.8rem;
}

.no-tags {
  color: var(--color-text-light);
}

.action-buttons {
  display: flex;
  gap: 0.5rem;
}

/* モーダル */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal {
  background: var(--color-bg);
  padding: var(--spacing-lg);
  border-radius: var(--border-radius);
  max-width: 500px;
  width: 90%;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
}

.modal h3 {
  margin-bottom: var(--spacing-md);
  color: var(--color-text);
}

.modal p {
  margin-bottom: var(--spacing-sm);
  color: var(--color-text);
}

.warning-text {
  color: #dc3545;
  font-weight: 600;
}

.modal-actions {
  display: flex;
  gap: var(--spacing-sm);
  justify-content: flex-end;
  margin-top: var(--spacing-lg);
}

@media (max-width: 768px) {
  .blog-list {
    padding: var(--spacing-md);
  }

  .page-header {
    flex-direction: column;
    align-items: flex-start;
    gap: var(--spacing-md);
  }

  .action-buttons {
    flex-direction: column;
  }
}
</style>
