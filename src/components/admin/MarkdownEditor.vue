<template>
  <div class="markdown-editor">
    <label v-if="label" class="label">{{ label }}</label>

    <div class="tabs">
      <button
        type="button"
        :class="['tab', { active: activeTab === 'edit' }]"
        @click="activeTab = 'edit'"
      >
        編集
      </button>
      <button
        type="button"
        :class="['tab', { active: activeTab === 'preview' }]"
        @click="activeTab = 'preview'"
      >
        プレビュー
      </button>
    </div>

    <div class="editor-content">
      <textarea
        v-if="activeTab === 'edit'"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        :placeholder="placeholder"
        class="editor-textarea"
      ></textarea>

      <div v-else class="preview-content" v-html="previewHtml"></div>
    </div>

    <p v-if="hint" class="hint">{{ hint }}</p>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { marked } from 'marked'
import DOMPurify from 'dompurify'

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  label: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: 'Markdownで記事を書く...'
  },
  hint: {
    type: String,
    default: ''
  }
})

defineEmits(['update:modelValue'])

const activeTab = ref('edit')

const previewHtml = computed(() => {
  if (!props.modelValue) return '<p class="empty-preview">プレビューがありません</p>'
  return DOMPurify.sanitize(marked.parse(props.modelValue))
})
</script>

<style scoped>
.markdown-editor {
  margin-bottom: var(--spacing-md);
}

.label {
  display: block;
  margin-bottom: var(--spacing-xs);
  font-weight: 600;
  color: var(--color-text);
}

.tabs {
  display: flex;
  border-bottom: 1px solid var(--color-border);
}

.tab {
  padding: var(--spacing-sm) var(--spacing-md);
  border: none;
  background: none;
  cursor: pointer;
  font-size: 1rem;
  color: var(--color-text-light);
  transition: all var(--transition-speed);
  border-bottom: 2px solid transparent;
}

.tab:hover {
  color: var(--color-primary);
}

.tab.active {
  color: var(--color-primary);
  border-bottom-color: var(--color-primary);
}

.editor-content {
  border: 1px solid var(--color-border);
  border-top: none;
  border-radius: 0 0 var(--border-radius) var(--border-radius);
  min-height: 400px;
}

.editor-textarea {
  width: 100%;
  min-height: 400px;
  padding: var(--spacing-md);
  border: none;
  outline: none;
  font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
  font-size: 0.95rem;
  line-height: 1.6;
  resize: vertical;
}

.preview-content {
  padding: var(--spacing-md);
  min-height: 400px;
  line-height: 1.8;
}

.empty-preview {
  color: var(--color-text-light);
  font-style: italic;
  text-align: center;
  padding: var(--spacing-xl);
}

.hint {
  margin-top: var(--spacing-xs);
  font-size: 0.85rem;
  color: var(--color-text-light);
}

/* プレビューのMarkdownスタイル */
.preview-content :deep(h1) {
  font-size: 2rem;
  margin-top: 1.5rem;
  margin-bottom: 1rem;
  font-weight: 700;
}

.preview-content :deep(h2) {
  font-size: 1.5rem;
  margin-top: 1.25rem;
  margin-bottom: 0.75rem;
  font-weight: 600;
}

.preview-content :deep(h3) {
  font-size: 1.25rem;
  margin-top: 1rem;
  margin-bottom: 0.5rem;
  font-weight: 600;
}

.preview-content :deep(p) {
  margin-bottom: 1rem;
}

.preview-content :deep(code) {
  background: #f4f4f4;
  padding: 0.2rem 0.4rem;
  border-radius: 3px;
  font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
  font-size: 0.9rem;
}

.preview-content :deep(pre) {
  background: #f4f4f4;
  padding: 1rem;
  border-radius: var(--border-radius);
  overflow-x: auto;
  margin-bottom: 1rem;
}

.preview-content :deep(pre code) {
  background: none;
  padding: 0;
}

.preview-content :deep(ul),
.preview-content :deep(ol) {
  margin-bottom: 1rem;
  padding-left: 2rem;
}

.preview-content :deep(li) {
  margin-bottom: 0.5rem;
}

.preview-content :deep(blockquote) {
  border-left: 4px solid var(--color-primary);
  padding-left: 1rem;
  margin: 1rem 0;
  color: var(--color-text-light);
  font-style: italic;
}

.preview-content :deep(a) {
  color: var(--color-primary);
  text-decoration: none;
}

.preview-content :deep(a:hover) {
  text-decoration: underline;
}

.preview-content :deep(img) {
  max-width: 100%;
  height: auto;
  border-radius: var(--border-radius);
  margin: 1rem 0;
}

.preview-content :deep(table) {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 1rem;
}

.preview-content :deep(th),
.preview-content :deep(td) {
  border: 1px solid var(--color-border);
  padding: 0.5rem;
  text-align: left;
}

.preview-content :deep(th) {
  background: var(--color-background-alt);
  font-weight: 600;
}
</style>
