<template>
  <div class="projects">
    <section class="section">
      <div class="container">
        <h1 class="text-center mb-lg">プロジェクト</h1>
        <p class="text-center projects-subtitle">
          これまでに取り組んだプロジェクトの一部をご紹介します
        </p>

        <LoadingSpinner v-if="loading" message="プロジェクトを読み込み中..." />
        <ErrorMessage v-else-if="error" :message="error" />
        <div v-else-if="projects.length === 0" class="text-center mt-lg">
          <p class="no-projects">プロジェクトがまだありません</p>
        </div>
        <div v-else class="projects-grid mt-lg">
          <div v-for="project in projects" :key="project.id" class="project-card">
            <img
              v-if="project.image_url"
              :src="project.image_url"
              :alt="project.title"
              class="project-image"
            />
            <div class="project-content">
              <h3>{{ project.title }}</h3>
              <p>{{ project.description }}</p>
              <div v-if="project.tech_stack && project.tech_stack.length" class="tech-stack">
                <span
                  v-for="tech in project.tech_stack"
                  :key="tech"
                  class="tech-tag"
                >
                  {{ tech }}
                </span>
              </div>
              <div class="project-links">
                <a
                  v-if="project.github_url"
                  :href="project.github_url"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="project-link"
                >
                  GitHub
                </a>
                <a
                  v-if="project.demo_url"
                  :href="project.demo_url"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="project-link primary"
                >
                  デモを見る
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import LoadingSpinner from '../components/common/LoadingSpinner.vue'
import ErrorMessage from '../components/common/ErrorMessage.vue'

// 仮のプロジェクトデータ（後でSupabaseから取得）
const projects = ref([])
const loading = ref(false)
const error = ref(null)

onMounted(() => {
  // TODO: Supabaseからプロジェクトを取得
  // 現時点では空配列
  projects.value = []
})
</script>

<style scoped>
.projects-subtitle {
  color: var(--color-text-light);
  font-size: 1.1rem;
  max-width: 600px;
  margin: 0 auto;
}

.no-projects {
  color: var(--color-text-light);
  font-style: italic;
  padding: var(--spacing-xl);
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: var(--spacing-lg);
}

.project-card {
  background: var(--color-bg);
  border-radius: var(--border-radius);
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform var(--transition-speed), box-shadow var(--transition-speed);
}

.project-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
}

.project-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.project-content {
  padding: var(--spacing-lg);
}

.project-content h3 {
  color: var(--color-text);
  margin-bottom: var(--spacing-sm);
  font-size: 1.25rem;
}

.project-content p {
  color: var(--color-text-light);
  line-height: 1.6;
  margin-bottom: var(--spacing-md);
}

.tech-stack {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-xs);
  margin-bottom: var(--spacing-md);
}

.tech-tag {
  padding: 0.25rem 0.5rem;
  background: var(--color-secondary);
  color: white;
  border-radius: 4px;
  font-size: 0.85rem;
}

.project-links {
  display: flex;
  gap: var(--spacing-sm);
}

.project-link {
  padding: var(--spacing-xs) var(--spacing-md);
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius);
  text-decoration: none;
  color: var(--color-text);
  transition: all var(--transition-speed);
}

.project-link:hover {
  background: var(--color-background-alt);
}

.project-link.primary {
  background: var(--color-primary);
  color: white;
  border-color: var(--color-primary);
}

.project-link.primary:hover {
  background: var(--color-secondary);
  border-color: var(--color-secondary);
}

@media (max-width: 768px) {
  .projects-grid {
    grid-template-columns: 1fr;
  }
}
</style>
