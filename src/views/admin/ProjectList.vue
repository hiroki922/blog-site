<template>
  <div class="project-list">
    <div class="page-header">
      <h1>プロジェクト管理</h1>
      <BaseButton @click="createNew" variant="primary">新規作成</BaseButton>
    </div>

    <ErrorMessage v-if="error" :message="error" class="mb-md" />

    <DataTable
      :columns="columns"
      :data="projects"
      :loading="loading"
      empty-message="プロジェクトがまだありません"
    >
      <template #cell-image_url="{ item }">
        <img v-if="item.image_url" :src="item.image_url" :alt="item.title" class="thumb" />
        <span v-else class="no-image">-</span>
      </template>

      <template #cell-tech_stack="{ item }">
        <div class="tags-list">
          <span v-for="tech in (item.tech_stack || [])" :key="tech" class="tag-chip">{{ tech }}</span>
          <span v-if="!item.tech_stack?.length">-</span>
        </div>
      </template>

      <template #cell-published="{ item }">
        <span :class="['status-badge', item.published ? 'published' : 'draft']">
          {{ item.published ? '公開中' : '非公開' }}
        </span>
      </template>

      <template #actions="{ item }">
        <div class="action-buttons">
          <BaseButton @click="editProject(item.id)" size="small">編集</BaseButton>
          <BaseButton @click="confirmDelete(item)" variant="danger" size="small">削除</BaseButton>
        </div>
      </template>
    </DataTable>

    <!-- 削除確認モーダル -->
    <div v-if="deleteTarget" class="modal-overlay" @click="deleteTarget = null">
      <div class="modal" @click.stop>
        <h3>プロジェクトを削除</h3>
        <p>「{{ deleteTarget.title }}」を削除してもよろしいですか？</p>
        <p class="warning-text">この操作は取り消せません。</p>
        <div class="modal-actions">
          <BaseButton @click="deleteTarget = null" variant="secondary">キャンセル</BaseButton>
          <BaseButton @click="handleDelete" variant="danger" :loading="deleting">削除する</BaseButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useProjects } from '../../composables/useProjects'
import DataTable from '../../components/admin/DataTable.vue'
import BaseButton from '../../components/common/BaseButton.vue'
import ErrorMessage from '../../components/common/ErrorMessage.vue'

const router = useRouter()
const { projects, loading, error, fetchAllProjects, deleteProject } = useProjects()

const deleteTarget = ref(null)
const deleting = ref(false)

const columns = [
  { key: 'image_url', label: '画像' },
  { key: 'title', label: 'タイトル' },
  { key: 'tech_stack', label: '技術スタック' },
  { key: 'published', label: '状態' },
  { key: 'display_order', label: '表示順' },
  { key: 'updated_at', label: '更新日', format: 'date' }
]

onMounted(() => fetchAllProjects())

const createNew = () => router.push('/admin/projects/new')
const editProject = (id) => router.push(`/admin/projects/${id}/edit`)
const confirmDelete = (project) => { deleteTarget.value = project }

const handleDelete = async () => {
  deleting.value = true
  await deleteProject(deleteTarget.value.id)
  deleteTarget.value = null
  deleting.value = false
  fetchAllProjects()
}
</script>

<style scoped>
.project-list { padding: var(--spacing-lg); }
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-lg);
}
.page-header h1 { font-size: 2rem; }
.thumb {
  width: 60px;
  height: 40px;
  object-fit: cover;
  border-radius: var(--border-radius-sm);
}
.no-image { color: var(--color-text-light); }
.tags-list { display: flex; flex-wrap: wrap; gap: 0.25rem; }
.tag-chip {
  padding: 0.2rem 0.5rem;
  background: var(--color-secondary);
  color: white;
  border-radius: 4px;
  font-size: 0.8rem;
}
.status-badge {
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.85rem;
  font-weight: 600;
}
.status-badge.published { background: #d4edda; color: #155724; }
.status-badge.draft { background: #f3f4f6; color: #6b7280; }
.action-buttons { display: flex; gap: 0.5rem; }
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.5);
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
  box-shadow: var(--shadow-lg);
}
.modal h3 { margin-bottom: var(--spacing-md); }
.modal p { margin-bottom: var(--spacing-sm); }
.warning-text { color: var(--color-danger); font-weight: 600; }
.modal-actions {
  display: flex;
  gap: var(--spacing-sm);
  justify-content: flex-end;
  margin-top: var(--spacing-lg);
}
</style>
