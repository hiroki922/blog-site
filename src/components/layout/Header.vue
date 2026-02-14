<template>
  <header class="header">
    <div class="container">
      <nav class="nav">
        <router-link to="/" class="logo">
          Dev Notes
        </router-link>

        <button class="nav-toggle" @click="toggleMenu" aria-label="メニュー">
          <span></span>
          <span></span>
          <span></span>
        </button>

        <ul :class="['nav-menu', { active: isMenuOpen }]">
          <li><router-link to="/" @click="closeMenu">Home</router-link></li>
          <li><router-link to="/about" @click="closeMenu">About</router-link></li>
          <li><router-link to="/projects" @click="closeMenu">Projects</router-link></li>
          <li><router-link to="/blog" @click="closeMenu">Blog</router-link></li>
          <li><router-link to="/contact" @click="closeMenu">Contact</router-link></li>
          <li v-if="isAuthenticated">
            <router-link to="/admin" @click="closeMenu">管理画面</router-link>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue'
import { useAuth } from '../../composables/useAuth'

const { isAuthenticated } = useAuth()
const isMenuOpen = ref(false)

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const closeMenu = () => {
  isMenuOpen.value = false
}
</script>

<style scoped>
.header {
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  box-shadow: var(--shadow-sm);
  border-bottom: 1px solid rgba(255, 255, 255, 0.18);
  position: sticky;
  top: 0;
  z-index: 100;
}

.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--spacing-md) 0;
}

.logo {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--color-primary);
  text-decoration: none;
}

.nav-toggle {
  display: none;
  flex-direction: column;
  gap: 4px;
  background: none;
  border: none;
  cursor: pointer;
  padding: var(--spacing-xs);
}

.nav-toggle span {
  width: 25px;
  height: 3px;
  background: var(--color-text);
  transition: all var(--transition-fast);
}

.nav-menu {
  display: flex;
  list-style: none;
  gap: var(--spacing-lg);
  align-items: center;
}

.nav-menu a {
  text-decoration: none;
  color: var(--color-text);
  font-weight: 500;
  transition: color var(--transition-speed);
  position: relative;
}

.nav-menu a:hover {
  color: var(--color-primary);
}

.nav-menu a.router-link-active {
  color: var(--color-primary);
}

.nav-menu a.router-link-active::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  right: 0;
  height: 2px;
  background: var(--color-primary);
}

@media (max-width: 768px) {
  .nav-toggle {
    display: flex;
  }

  .nav-menu {
    position: fixed;
    top: 60px;
    right: 0;
    background: var(--color-bg);
    flex-direction: column;
    width: 200px;
    padding: var(--spacing-lg);
    box-shadow: -2px 0 8px rgba(0, 0, 0, 0.1);
    transform: translateX(100%);
    transition: transform var(--transition-speed);
    align-items: flex-start;
    gap: var(--spacing-md);
  }

  .nav-menu.active {
    transform: translateX(0);
  }
}
</style>
