<template>
  <div class="data-table">
    <table>
      <thead>
        <tr>
          <th v-for="column in columns" :key="column.key">
            {{ column.label }}
          </th>
          <th v-if="$slots.actions">操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="loading">
          <td :colspan="columns.length + ($slots.actions ? 1 : 0)" class="text-center">
            <LoadingSpinner message="データを読み込み中..." />
          </td>
        </tr>
        <tr v-else-if="data.length === 0">
          <td :colspan="columns.length + ($slots.actions ? 1 : 0)" class="text-center empty-message">
            {{ emptyMessage }}
          </td>
        </tr>
        <tr v-else v-for="item in data" :key="item.id">
          <td v-for="column in columns" :key="column.key">
            <slot :name="`cell-${column.key}`" :item="item">
              {{ formatValue(item[column.key], column.format) }}
            </slot>
          </td>
          <td v-if="$slots.actions" class="actions">
            <slot name="actions" :item="item"></slot>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import LoadingSpinner from '../common/LoadingSpinner.vue'

defineProps({
  columns: {
    type: Array,
    required: true,
    // 例: [{ key: 'title', label: 'タイトル', format: 'text' }]
  },
  data: {
    type: Array,
    default: () => []
  },
  loading: {
    type: Boolean,
    default: false
  },
  emptyMessage: {
    type: String,
    default: 'データがありません'
  }
})

const formatValue = (value, format) => {
  if (!value && value !== 0) return '-'

  switch (format) {
    case 'date':
      return new Date(value).toLocaleDateString('ja-JP', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      })
    case 'datetime':
      return new Date(value).toLocaleString('ja-JP', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      })
    case 'boolean':
      return value ? '✓' : '×'
    default:
      return value
  }
}
</script>

<style scoped>
.data-table {
  overflow-x: auto;
  background: var(--color-bg);
  border-radius: var(--border-radius);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

table {
  width: 100%;
  border-collapse: collapse;
  min-width: 600px;
}

thead {
  background: var(--color-primary);
  color: white;
}

th {
  padding: 1rem;
  text-align: left;
  font-weight: 600;
  font-size: 0.9rem;
}

tbody tr {
  border-bottom: 1px solid var(--color-border);
  transition: background-color var(--transition-speed);
}

tbody tr:hover {
  background: rgba(0, 123, 255, 0.05);
}

td {
  padding: 1rem;
  font-size: 0.95rem;
}

td.actions {
  white-space: nowrap;
}

.empty-message {
  padding: 3rem 1rem;
  color: var(--color-text-light);
  font-style: italic;
}

.text-center {
  text-align: center;
}

@media (max-width: 768px) {
  .data-table {
    font-size: 0.85rem;
  }

  th, td {
    padding: 0.75rem 0.5rem;
  }
}
</style>
