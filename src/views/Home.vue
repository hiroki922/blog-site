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
  padding: 8rem 0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
  color: white;
  text-align: center;
  position: relative;
  overflow: hidden;
}

.hero::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(circle at 20% 50%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 80% 80%, rgba(255, 255, 255, 0.1) 0%, transparent 50%);
  animation: pulse 4s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 0.5; }
  50% { opacity: 1; }
}

.hero-title {
  font-size: 4rem;
  font-weight: 800;
  margin-bottom: var(--spacing-md);
  position: relative;
  z-index: 1;
  text-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  letter-spacing: -0.02em;
}

.hero-subtitle {
  font-size: 1.5rem;
  margin-bottom: var(--spacing-xl);
  opacity: 0.95;
  position: relative;
  z-index: 1;
  font-weight: 400;
}

.hero-actions {
  display: flex;
  gap: var(--spacing-md);
  justify-content: center;
}

.btn {
  padding: 1rem 2rem;
  border-radius: var(--border-radius-lg);
  text-decoration: none;
  font-weight: 600;
  transition: all var(--transition-speed) var(--transition-smooth);
  position: relative;
  z-index: 1;
  font-size: 1.1rem;
}

.btn-primary {
  background: white;
  color: #667eea;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}

.btn-primary:hover {
  transform: translateY(-3px) scale(1.02);
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.3);
}

.btn-secondary {
  background: rgba(255, 255, 255, 0.1);
  color: white;
  border: 2px solid rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(10px);
}

.btn-secondary:hover {
  background: rgba(255, 255, 255, 0.2);
  border-color: rgba(255, 255, 255, 0.5);
  transform: translateY(-3px) scale(1.02);
}

.skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: var(--spacing-lg);
  margin-top: var(--spacing-lg);
}

.skill-card {
  padding: 2rem;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  text-align: center;
  transition: all var(--transition-speed) var(--transition-smooth);
  border: 1px solid rgba(255, 255, 255, 0.18);
}

.skill-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
}

.skill-card h3 {
  color: var(--color-primary);
  margin-bottom: var(--spacing-md);
  font-size: 1.5rem;
  font-weight: 700;
}

.skill-card p {
  color: var(--color-text-light);
  line-height: 1.8;
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
