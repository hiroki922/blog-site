<template>
  <div class="contact-list">
    <div class="page-header">
      <h1>お問い合わせ管理</h1>
      <div class="header-stats">
        <span class="unread-badge" v-if="unreadCount > 0">未読 {{ unreadCount }}件</span>
      </div>
    </div>

    <ErrorMessage v-if="error" :message="error" class="mb-md" />

    <DataTable
      :columns="columns"
      :data="contacts"
      :loading="loading"
      empty-message="お問い合わせがまだありません"
    >
      <template #cell-name="{ item }">
        <div :class="['contact-name', { unread: !item.read }]">
          <span v-if="!item.read" class="unread-dot"></span>
          {{ item.name }}
        </div>
      </template>

      <template #cell-message="{ item }">
        <div class="message-preview">{{ truncate(item.message, 60) }}</div>
      </template>

      <template #cell-read="{ item }">
        <span :class="['status-badge', item.read ? 'read' : 'unread']">
          {{ item.read ? '既読' : '未読' }}
        </span>
      </template>

      <template #actions="{ item }">
        <div class="action-buttons">
          <BaseButton @click="viewDetail(item)" size="small">詳細</BaseButton>
          <BaseButton
            v-if="!item.read"
            @click="handleMarkAsRead(item.id)"
            size="small"
            variant="secondary"
          >既読</BaseButton>
          <BaseButton @click="confirmDelete(item)" variant="danger" size="small">削除</BaseButton>
        </div>
      </template>
    </DataTable>

    <!-- 詳細モーダル -->
    <div v-if="selectedContact" class="modal-overlay" @click="selectedContact = null">
      <div class="modal" @click.stop>
        <div class="modal-header">
          <h3>お問い合わせ詳細</h3>
          <button @click="selectedContact = null" class="modal-close">✕</button>
        </div>
        <div class="modal-body">
          <div class="detail-row">
            <span class="label">お名前</span>
            <span>{{ selectedContact.name }}</span>
          </div>
          <div class="detail-row">
            <span class="label">メール</span>
            <a :href="`mailto:${selectedContact.email}`" class="email-link">
              {{ selectedContact.email }}
            </a>
          </div>
          <div class="detail-row">
            <span class="label">受信日時</span>
            <span>{{ formatDate(selectedContact.created_at) }}</span>
          </div>
          <div class="detail-message">
            <span class="label">メッセージ</span>
            <p>{{ selectedContact.message }}</p>
          </div>
        </div>
        <div class="modal-footer">
          <BaseButton
            v-if="!selectedContact.read"
            @click="handleMarkAsRead(selectedContact.id); selectedContact = null"
            variant="secondary"
          >既読にする</BaseButton>
          <a :href="`mailto:${selectedContact.email}`" class="btn-reply">
            返信する
          </a>
        </div>
      </div>
    </div>

    <!-- 削除確認モーダル -->
    <div v-if="deleteTarget" class="modal-overlay" @click="deleteTarget = null">
      <div class="modal" @click.stop>
        <h3>お問い合わせを削除</h3>
        <p>{{ deleteTarget.name }} さんからのお問い合わせを削除しますか？</p>
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
import { ref, computed, onMounted } from 'vue'
import { useContacts } from '../../composables/useContacts'
import DataTable from '../../components/admin/DataTable.vue'
import BaseButton from '../../components/common/BaseButton.vue'
import ErrorMessage from '../../components/common/ErrorMessage.vue'

const { contacts, loading, error, fetchAllContacts, markAsRead, deleteContact } = useContacts()

const selectedContact = ref(null)
const deleteTarget = ref(null)
const deleting = ref(false)

const unreadCount = computed(() => contacts.value.filter(c => !c.read).length)

const columns = [
  { key: 'name', label: 'お名前' },
  { key: 'email', label: 'メール' },
  { key: 'message', label: 'メッセージ' },
  { key: 'read', label: '状態' },
  { key: 'created_at', label: '受信日時', format: 'datetime' }
]

onMounted(() => fetchAllContacts())

const truncate = (str, len) => str.length > len ? str.slice(0, len) + '...' : str

const formatDate = (d) => new Date(d).toLocaleString('ja-JP')

const viewDetail = (contact) => {
  selectedContact.value = contact
  if (!contact.read) handleMarkAsRead(contact.id)
}

const handleMarkAsRead = async (id) => {
  await markAsRead(id)
}

const confirmDelete = (contact) => { deleteTarget.value = contact }

const handleDelete = async () => {
  deleting.value = true
  await deleteContact(deleteTarget.value.id)
  deleteTarget.value = null
  deleting.value = false
}
</script>

<style scoped>
.contact-list { padding: var(--spacing-lg); }
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-lg);
}
.page-header h1 { font-size: 2rem; }
.unread-badge {
  background: var(--color-danger);
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.9rem;
  font-weight: 600;
}
.contact-name {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 500;
}
.contact-name.unread { font-weight: 700; }
.unread-dot {
  width: 8px;
  height: 8px;
  background: var(--color-primary);
  border-radius: 50%;
  flex-shrink: 0;
}
.message-preview { color: var(--color-text-light); font-size: 0.9rem; }
.status-badge {
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.85rem;
  font-weight: 600;
}
.status-badge.read { background: #f3f4f6; color: #6b7280; }
.status-badge.unread { background: #dbeafe; color: #1d4ed8; }
.action-buttons { display: flex; gap: 0.5rem; }
/* モーダル共通 */
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
  border-radius: var(--border-radius-lg);
  max-width: 600px;
  width: 90%;
  box-shadow: var(--shadow-lg);
}
.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-lg);
}
.modal-header h3 { font-size: 1.25rem; }
.modal-close {
  background: none;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
  color: var(--color-text-light);
}
.detail-row {
  display: flex;
  gap: var(--spacing-md);
  padding: var(--spacing-sm) 0;
  border-bottom: 1px solid var(--color-border);
  align-items: center;
}
.detail-message {
  padding: var(--spacing-md) 0;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}
.detail-message p {
  white-space: pre-wrap;
  line-height: 1.8;
  color: var(--color-text);
}
.label {
  font-weight: 600;
  color: var(--color-text-light);
  min-width: 80px;
  font-size: 0.9rem;
}
.email-link { color: var(--color-primary); text-decoration: none; }
.modal-footer {
  display: flex;
  gap: var(--spacing-sm);
  justify-content: flex-end;
  margin-top: var(--spacing-lg);
  padding-top: var(--spacing-md);
  border-top: 1px solid var(--color-border);
}
.btn-reply {
  padding: 0.5rem 1.5rem;
  background: var(--color-primary);
  color: white;
  border-radius: var(--border-radius);
  text-decoration: none;
  font-weight: 600;
  transition: background var(--transition-speed);
}
.btn-reply:hover { background: var(--color-primary-dark); }
.modal p { margin-bottom: var(--spacing-sm); }
.warning-text { color: var(--color-danger); font-weight: 600; }
.modal-actions {
  display: flex;
  gap: var(--spacing-sm);
  justify-content: flex-end;
  margin-top: var(--spacing-lg);
}
</style>
