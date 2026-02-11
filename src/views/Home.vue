<template>
  <div class="home">
    <section class="hero">
      <div class="container">
        <h1 class="hero-title">ようこそ</h1>
        <p class="hero-subtitle">
          Web開発者のポートフォリオサイトへ
        </p>
        <div class="hero-actions">
          <router-link to="/projects" class="btn btn-primary">
            プロジェクトを見る
          </router-link>
          <router-link to="/blog" class="btn btn-secondary">
            ブログを読む
          </router-link>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <h2 class="text-center mb-lg">スキル</h2>
        <div class="skills-grid">
          <div class="skill-card">
            <h3>フロントエンド</h3>
            <p>Vue.js, React, TypeScript, HTML/CSS</p>
          </div>
          <div class="skill-card">
            <h3>バックエンド</h3>
            <p>Node.js, Supabase, PostgreSQL</p>
          </div>
          <div class="skill-card">
            <h3>ツール</h3>
            <p>Git, Vite, Webpack, Docker</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
// ホームページ
</script>

<style scoped>
.hero {
  padding: var(--spacing-xl) 0;
  background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%);
  color: white;
  text-align: center;
}

.hero-title {
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: var(--spacing-md);
}

.hero-subtitle {
  font-size: 1.5rem;
  margin-bottom: var(--spacing-xl);
  opacity: 0.9;
}

.hero-actions {
  display: flex;
  gap: var(--spacing-md);
  justify-content: center;
}

.btn {
  padding: var(--spacing-sm) var(--spacing-lg);
  border-radius: var(--border-radius);
  text-decoration: none;
  font-weight: 600;
  transition: all var(--transition-speed);
}

.btn-primary {
  background: white;
  color: var(--color-primary);
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.btn-secondary {
  background: transparent;
  color: white;
  border: 2px solid white;
}

.btn-secondary:hover {
  background: white;
  color: var(--color-primary);
}

.skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: var(--spacing-lg);
  margin-top: var(--spacing-lg);
}

.skill-card {
  padding: var(--spacing-lg);
  background: var(--color-bg);
  border-radius: var(--border-radius);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.skill-card h3 {
  color: var(--color-primary);
  margin-bottom: var(--spacing-sm);
}

.skill-card p {
  color: var(--color-text-light);
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 2rem;
  }

  .hero-subtitle {
    font-size: 1.2rem;
  }

  .hero-actions {
    flex-direction: column;
  }
}
</style>
