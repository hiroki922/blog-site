<template>
  <article class="blog-card">
    <router-link :to="`/blog/${post.slug}`" class="blog-link">
      <div class="blog-card-content">
        <h3 class="blog-title">{{ post.title }}</h3>
        <p class="blog-description">{{ post.description }}</p>

        <div class="blog-meta">
          <span class="blog-date">{{ formatDate(post.created_at) }}</span>
          <span class="blog-reading-time">{{ post.read_time }}</span>
        </div>

        <div v-if="post.tags && post.tags.length" class="blog-tags">
          <span v-for="tag in post.tags" :key="tag" class="tag">
            {{ tag }}
          </span>
        </div>
      </div>
    </router-link>
  </article>
</template>

<script setup>
defineProps({
  post: {
    type: Object,
    required: true
  }
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
.blog-card {
  background: var(--color-bg);
  border-radius: var(--border-radius);
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform var(--transition-speed), box-shadow var(--transition-speed);
  height: 100%;
}

.blog-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
}

.blog-link {
  text-decoration: none;
  color: inherit;
  display: block;
}

.blog-card-content {
  padding: var(--spacing-lg);
}

.blog-title {
  font-size: 1.5rem;
  color: var(--color-text);
  margin-bottom: var(--spacing-sm);
  line-height: 1.3;
}

.blog-description {
  color: var(--color-text-light);
  line-height: 1.6;
  margin-bottom: var(--spacing-md);
}

.blog-meta {
  display: flex;
  gap: var(--spacing-md);
  font-size: 0.9rem;
  color: var(--color-text-light);
  margin-bottom: var(--spacing-md);
}

.blog-tags {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-xs);
}

.tag {
  padding: 0.25rem 0.5rem;
  background: var(--color-secondary);
  color: white;
  border-radius: 4px;
  font-size: 0.85rem;
}

@media (max-width: 768px) {
  .blog-title {
    font-size: 1.25rem;
  }
}
</style>
