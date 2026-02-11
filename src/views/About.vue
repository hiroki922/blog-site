<template>
  <div class="about">
    <section class="section">
      <div class="container">
        <h1 class="text-center mb-lg">About Me</h1>

        <div class="about-content">
          <div class="about-text">
            <h2>こんにちは！</h2>
            <p>
              私はWeb開発者として、モダンな技術を使ったアプリケーション開発に取り組んでいます。
            </p>
            <p>
              フロントエンドからバックエンドまで、幅広い技術スタックに対応し、
              ユーザー体験を重視した開発を心がけています。
            </p>

            <h3>スキルセット</h3>
            <ul class="skills-list">
              <li><strong>フロントエンド:</strong> Vue.js, React, TypeScript, HTML/CSS</li>
              <li><strong>バックエンド:</strong> Node.js, Supabase, PostgreSQL</li>
              <li><strong>ツール:</strong> Git, Vite, Webpack, Docker</li>
              <li><strong>その他:</strong> RESTful API, GraphQL, CI/CD</li>
            </ul>

            <h3>経験</h3>
            <p>
              複数のWebアプリケーション開発プロジェクトに携わり、
              設計から実装、デプロイまで一貫して対応してきました。
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
// About ページ
</script>

<style scoped>
.about-content {
  max-width: 800px;
  margin: 0 auto;
}

.about-text h2 {
  color: var(--color-primary);
  margin-bottom: var(--spacing-md);
}

.about-text h3 {
  color: var(--color-secondary);
  margin-top: var(--spacing-lg);
  margin-bottom: var(--spacing-sm);
}

.about-text p {
  line-height: 1.8;
  margin-bottom: var(--spacing-md);
  color: var(--color-text);
}

.skills-list {
  list-style: none;
  padding: 0;
}

.skills-list li {
  padding: var(--spacing-sm) 0;
  border-bottom: 1px solid var(--color-border);
}

.skills-list li:last-child {
  border-bottom: none;
}

.skills-list strong {
  color: var(--color-primary);
}
</style>
