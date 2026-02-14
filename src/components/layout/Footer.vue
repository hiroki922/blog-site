<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-content">
        <p>&copy; {{ currentYear }} Dev Notes. All rights reserved.</p>
        <div class="footer-links">
          <a href="https://github.com" target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { computed } from 'vue'

const currentYear = computed(() => new Date().getFullYear())
</script>

<style scoped>
.footer {
  background: var(--color-background-alt);
  padding: var(--spacing-lg) 0;
  margin-top: auto;
  border-top: 1px solid var(--color-border);
}

.footer-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: var(--color-text-light);
}

.footer-links {
  display: flex;
  gap: var(--spacing-md);
}

.footer-links a {
  color: var(--color-text-light);
  text-decoration: none;
  transition: color var(--transition-speed);
}

.footer-links a:hover {
  color: var(--color-primary);
}

@media (max-width: 768px) {
  .footer-content {
    flex-direction: column;
    gap: var(--spacing-md);
    text-align: center;
  }
}
</style>
