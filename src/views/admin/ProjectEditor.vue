<template>
  <div class="project-editor">
    <div class="page-header">
      <h1>{{ isEditMode ? 'プロジェクト編集' : '新規プロジェクト作成' }}</h1>
    </div>

    <LoadingSpinner v-if="loading" message="読み込み中..." />

    <form v-else @submit.prevent="handleSubmit" class="editor-form">
      <ErrorMessage v-if="error" :message="error" class="mb-md" />

      <BaseInput
        v-model="form.title"
        label="タイトル"
        :error="errors.title"
        placeholder="プロジェクト名"
        required
      />

      <BaseTextarea
        v-model="form.description"
        label="説明"
        :error="errors.description"
        placeholder="プロジェクトの概要"
        rows="4"
        required
      />

      <ImageUploader
        v-model="form.image_url"
        label="サムネイル画像"
        @upload="handleImageUpload"
      />

      <TagInput
        v-model="form.tech_stack"
        label="技術スタック"
        placeholder="Vue.js, React, etc..."
        hint="使用した技術をEnterで追加"
      />

      <div class="form-row">
        <BaseInput
          v-model="form.github_url"
          label="GitHub URL"
          placeholder="https://github.com/..."
          type="url"
        />
        <BaseInput
          v-model="form.demo_url"
          label="デモURL"
          placeholder="https://..."
          type="url"
        />
      </div>

      <BaseInput
        v-model.number="form.display_order"
        label="表示順"
        type="number"
        hint="数字が小さいほど先に表示されます"
      />

      <div class="form-group">
        <label class="checkbox-label">
          <input type="checkbox" v-model="form.published" />
          <span>このプロジェクトを公開する</span>
        </label>
      </div>

      <div class="form-actions">
        <BaseButton type="button" @click="$router.push('/admin/projects')" variant="secondary">
          キャンセル
        </BaseButton>
        <BaseButton type="submit" variant="primary" :loading="saving">
          {{ isEditMode ? '更新' : '作成' }}
        </BaseButton>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useProjects } from '../../composables/useProjects'
import { validateRequired } from '../../utils/validators'
import BaseInput from '../../components/common/BaseInput.vue'
import BaseTextarea from '../../components/common/BaseTextarea.vue'
import BaseButton from '../../components/common/BaseButton.vue'
import LoadingSpinner from '../../components/common/LoadingSpinner.vue'
import ErrorMessage from '../../components/common/ErrorMessage.vue'
import TagInput from '../../components/admin/TagInput.vue'
import ImageUploader from '../../components/admin/ImageUploader.vue'

const router = useRouter()
const route = useRoute()
const { projects, loading, error, fetchAllProjects, createProject, updateProject, uploadImage } = useProjects()

const isEditMode = computed(() => !!route.params.id)
const saving = ref(false)

const form = reactive({
  title: '',
  description: '',
  image_url: '',
  tech_stack: [],
  github_url: '',
  demo_url: '',
  display_order: 0,
  published: true
})

const errors = reactive({ title: '', description: '' })

onMounted(async () => {
  if (isEditMode.value) {
    await fetchAllProjects()
    const project = projects.value.find(p => p.id === route.params.id)
    if (project) Object.assign(form, project)
  }
})

const handleImageUpload = async (file) => {
  const url = await uploadImage(file)
  if (url) form.image_url = url
}

const validate = () => {
  let valid = true
  errors.title = validateRequired(form.title, 'タイトル')
  errors.description = validateRequired(form.description, '説明')
  if (errors.title || errors.description) valid = false
  return valid
}

const handleSubmit = async () => {
  if (!validate()) return
  saving.value = true
  try {
    if (isEditMode.value) {
      await updateProject(route.params.id, form)
    } else {
      await createProject(form)
    }
    router.push('/admin/projects')
  } finally {
    saving.value = false
  }
}
</script>

<style scoped>
.project-editor { padding: var(--spacing-lg); max-width: 900px; }
.page-header { margin-bottom: var(--spacing-lg); }
.page-header h1 { font-size: 2rem; }
.editor-form {
  background: var(--color-bg);
  padding: var(--spacing-lg);
  border-radius: var(--border-radius);
  box-shadow: var(--shadow);
}
.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--spacing-md);
}
.form-group { margin-bottom: var(--spacing-md); }
.checkbox-label {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  cursor: pointer;
  font-weight: 500;
}
.checkbox-label input[type="checkbox"] {
  width: 18px;
  height: 18px;
}
.form-actions {
  display: flex;
  gap: var(--spacing-md);
  justify-content: flex-end;
  margin-top: var(--spacing-xl);
  padding-top: var(--spacing-lg);
  border-top: 1px solid var(--color-border);
}
@media (max-width: 768px) {
  .form-row { grid-template-columns: 1fr; }
  .project-editor { padding: var(--spacing-md); }
}
</style>
