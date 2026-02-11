<template>
  <div class="blog-editor">
    <div class="page-header">
      <h1>{{ isEditMode ? 'ブログ編集' : '新規ブログ作成' }}</h1>
    </div>

    <LoadingSpinner v-if="loading" message="読み込み中..." />

    <form v-else @submit.prevent="handleSubmit" class="editor-form">
      <ErrorMessage v-if="error" :message="error" class="mb-md" />

      <!-- タイトル -->
      <BaseInput
        v-model="form.title"
        label="タイトル"
        :error="errors.title"
        placeholder="ブログ記事のタイトル"
        required
        @input="generateSlug"
      />

      <!-- スラッグ -->
      <BaseInput
        v-model="form.slug"
        label="スラッグ（URL）"
        :error="errors.slug"
        placeholder="url-slug"
        hint="英数字とハイフンのみ使用可能"
        required
      />

      <!-- 説明 -->
      <BaseTextarea
        v-model="form.description"
        label="説明"
        :error="errors.description"
        placeholder="記事の簡単な説明（一覧ページに表示されます）"
        rows="3"
        required
      />

      <!-- 本文 -->
      <MarkdownEditor
        v-model="form.content"
        label="本文"
        placeholder="Markdownで記事を書く..."
        hint="Markdown記法が使えます。**太字**、*斜体*、[リンク](URL)など"
      />

      <!-- タグ -->
      <TagInput
        v-model="form.tags"
        label="タグ"
        placeholder="タグを入力してEnterで追加"
        hint="記事に関連するタグを追加してください"
      />

      <!-- 読了時間 -->
      <BaseInput
        v-model="form.read_time"
        label="読了時間"
        placeholder="例: 5分で読める"
        hint="省略可能"
      />

      <!-- 公開設定 -->
      <div class="form-group">
        <label class="checkbox-label">
          <input type="checkbox" v-model="form.published" />
          <span>この記事を公開する</span>
        </label>
      </div>

      <!-- アクション -->
      <div class="form-actions">
        <BaseButton type="button" @click="goBack" variant="secondary">
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
import { useBlog } from '../../composables/useBlog'
import { slugify } from '../../utils/slugify'
import { validateRequired, validateSlug } from '../../utils/validators'
import BaseInput from '../../components/common/BaseInput.vue'
import BaseTextarea from '../../components/common/BaseTextarea.vue'
import BaseButton from '../../components/common/BaseButton.vue'
import LoadingSpinner from '../../components/common/LoadingSpinner.vue'
import ErrorMessage from '../../components/common/ErrorMessage.vue'
import MarkdownEditor from '../../components/admin/MarkdownEditor.vue'
import TagInput from '../../components/admin/TagInput.vue'

const router = useRouter()
const route = useRoute()
const { fetchBlogById, createBlog, updateBlog, loading, error } = useBlog()

const isEditMode = computed(() => !!route.params.id)
const saving = ref(false)

const form = reactive({
  title: '',
  slug: '',
  description: '',
  content: '',
  tags: [],
  read_time: '5分で読める',
  published: false
})

const errors = reactive({
  title: '',
  slug: '',
  description: '',
  content: ''
})

onMounted(async () => {
  if (isEditMode.value) {
    const blog = await fetchBlogById(route.params.id)
    if (blog) {
      Object.assign(form, blog)
    }
  }
})

const generateSlug = () => {
  if (!isEditMode.value && form.title) {
    form.slug = slugify(form.title)
  }
}

const validate = () => {
  let isValid = true

  // タイトル
  errors.title = validateRequired(form.title, 'タイトル')
  if (errors.title) isValid = false

  // スラッグ
  errors.slug = validateRequired(form.slug, 'スラッグ') || validateSlug(form.slug)
  if (errors.slug) isValid = false

  // 説明
  errors.description = validateRequired(form.description, '説明')
  if (errors.description) isValid = false

  // 本文
  errors.content = validateRequired(form.content, '本文')
  if (errors.content) isValid = false

  return isValid
}

const handleSubmit = async () => {
  if (!validate()) return

  saving.value = true
  try {
    if (isEditMode.value) {
      await updateBlog(route.params.id, form)
    } else {
      await createBlog(form)
    }
    router.push('/admin/blog')
  } catch (err) {
    console.error('保存エラー:', err)
  } finally {
    saving.value = false
  }
}

const goBack = () => {
  router.push('/admin/blog')
}
</script>

<style scoped>
.blog-editor {
  padding: var(--spacing-lg);
  max-width: 900px;
}

.page-header {
  margin-bottom: var(--spacing-lg);
}

.page-header h1 {
  font-size: 2rem;
  color: var(--color-text);
}

.editor-form {
  background: var(--color-bg);
  padding: var(--spacing-lg);
  border-radius: var(--border-radius);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: var(--spacing-md);
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  cursor: pointer;
  font-weight: 500;
  color: var(--color-text);
}

.checkbox-label input[type="checkbox"] {
  width: 20px;
  height: 20px;
  cursor: pointer;
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
  .blog-editor {
    padding: var(--spacing-md);
  }

  .form-actions {
    flex-direction: column-reverse;
  }

  .form-actions button {
    width: 100%;
  }
}
</style>
