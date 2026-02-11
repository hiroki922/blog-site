<template>
  <div class="blog">
    <section class="section">
      <div class="container">
        <h1 class="text-center mb-lg">ブログ</h1>
        <p class="text-center blog-subtitle">
          Web開発に関する考え、チュートリアル、インサイト
        </p>

        <LoadingSpinner v-if="loading" message="ブログを読み込み中..." />
        <ErrorMessage v-else-if="error" :message="error" />
        <div v-else-if="blogs.length === 0" class="text-center mt-lg">
          <p class="no-posts">まだブログ記事がありません</p>
        </div>
        <div v-else class="blog-grid mt-lg">
          <BlogCard v-for="post in blogs" :key="post.id" :post="post" />
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useBlog } from '../composables/useBlog'
import BlogCard from '../components/blog/BlogCard.vue'
import LoadingSpinner from '../components/common/LoadingSpinner.vue'
import ErrorMessage from '../components/common/ErrorMessage.vue'

const { blogs, loading, error, fetchPublishedBlogs } = useBlog()

onMounted(() => {
  fetchPublishedBlogs()
})
</script>

<style scoped>
.blog-subtitle {
  color: var(--color-text-light);
  font-size: 1.1rem;
  max-width: 600px;
  margin: 0 auto;
}

.blog-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: var(--spacing-xl);
}

.blog-card {
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius);
  overflow: hidden;
  transition: transform var(--transition-normal), box-shadow var(--transition-normal);
  background-color: var(--color-background);
}

.blog-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}

.blog-image {
  width: 100%;
  height: 220px;
  background-color: var(--color-background-alt);
  display: flex;
  align-items: center;
  justify-content: center;
}

.placeholder-image {
  color: var(--color-text-light);
  font-weight: 500;
}

.blog-content {
  padding: var(--spacing-lg);
}

.blog-meta {
  display: flex;
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-sm);
  font-size: 0.9rem;
}

.blog-date {
  color: var(--color-text-light);
}

.blog-tag {
  background-color: var(--color-secondary);
  color: white;
  padding: 2px var(--spacing-xs);
  border-radius: 4px;
  font-size: 0.85rem;
}

.blog-content h2 {
  font-size: 1.5rem;
  margin-bottom: var(--spacing-sm);
}

.blog-content p {
  color: var(--color-text);
  line-height: 1.6;
  margin-bottom: var(--spacing-md);
}

.read-more {
  color: var(--color-secondary);
  font-weight: 600;
  transition: color var(--transition-fast);
}

.read-more:hover {
  color: var(--color-primary);
}

@media (max-width: 768px) {
  .blog-grid {
    grid-template-columns: 1fr;
  }
}
</style>
