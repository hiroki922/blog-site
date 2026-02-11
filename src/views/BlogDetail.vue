<template>
  <div class="blog-detail">
    <section class="section">
      <article class="container">
        <LoadingSpinner v-if="loading" message="ブログ記事を読み込み中..." />
        <div v-else-if="error" class="text-center">
          <ErrorMessage :message="error" />
          <router-link to="/blog" class="back-link">← ブログ一覧に戻る</router-link>
        </div>
        <div v-else-if="post">
          <div class="blog-header">
            <h1>{{ post.title }}</h1>
            <div class="blog-meta">
              <span class="blog-date">{{ formatDate(post.created_at) }}</span>
              <span class="blog-reading-time">{{ post.read_time }}</span>
            </div>
            <div class="blog-tags">
              <span v-for="tag in post.tags" :key="tag" class="tag">{{ tag }}</span>
            </div>
          </div>

          <div class="blog-content" v-html="post.contentHtml"></div>

          <div class="blog-footer">
            <router-link to="/blog" class="back-link">
              ← ブログ一覧に戻る
            </router-link>
          </div>
        </div>
      </article>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useBlog } from '../composables/useBlog'
import LoadingSpinner from '../components/common/LoadingSpinner.vue'
import ErrorMessage from '../components/common/ErrorMessage.vue'

const route = useRoute()
const { fetchBlogBySlug, loading, error } = useBlog()
const post = ref(null)

onMounted(async () => {
  const slug = route.params.slug
  post.value = await fetchBlogBySlug(slug)
})

const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}
</script>

<style scoped>
.error-message {
  color: #e53e3e;
  margin-bottom: var(--spacing-md);
}

.blog-header {
  max-width: var(--max-width-text);
  margin: 0 auto var(--spacing-xl);
  text-align: center;
}

.blog-header h1 {
  font-size: 2.5rem;
  margin-bottom: var(--spacing-md);
}

.blog-meta {
  display: flex;
  gap: var(--spacing-md);
  justify-content: center;
  margin-bottom: var(--spacing-md);
  font-size: 0.95rem;
  color: var(--color-text-light);
}

.blog-date,
.blog-reading-time {
  display: flex;
  align-items: center;
}

.blog-tags {
  display: flex;
  gap: var(--spacing-xs);
  justify-content: center;
  flex-wrap: wrap;
}

.tag {
  padding: var(--spacing-xs) var(--spacing-sm);
  background-color: var(--color-secondary);
  color: white;
  border-radius: 4px;
  font-size: 0.85rem;
  font-weight: 500;
}

.blog-content {
  max-width: var(--max-width-text);
  margin: 0 auto var(--spacing-xl);
  font-size: 1.1rem;
  line-height: 1.8;
}

.blog-content :deep(h2) {
  margin-top: var(--spacing-xl);
  margin-bottom: var(--spacing-md);
}

.blog-content :deep(h3) {
  margin-top: var(--spacing-lg);
  margin-bottom: var(--spacing-sm);
}

.blog-content :deep(p) {
  margin-bottom: var(--spacing-md);
}

.blog-content :deep(code) {
  background-color: var(--color-background-alt);
  padding: 2px 6px;
  border-radius: 4px;
  font-family: var(--font-mono);
  font-size: 0.9em;
}

.blog-content :deep(pre) {
  background-color: var(--color-background-alt);
  padding: var(--spacing-md);
  border-radius: var(--border-radius);
  overflow-x: auto;
  margin-bottom: var(--spacing-md);
}

.blog-content :deep(pre code) {
  background: none;
  padding: 0;
}

.blog-footer {
  max-width: var(--max-width-text);
  margin: 0 auto;
  padding-top: var(--spacing-xl);
  border-top: 1px solid var(--color-border);
}

.back-link {
  color: var(--color-secondary);
  font-weight: 600;
  transition: color var(--transition-fast);
}

.back-link:hover {
  color: var(--color-primary);
}

@media (max-width: 768px) {
  .blog-header h1 {
    font-size: 2rem;
  }

  .blog-content {
    font-size: 1rem;
  }
}
</style>
