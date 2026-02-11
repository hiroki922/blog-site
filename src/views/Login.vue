<template>
  <div class="login-page">
    <section class="section">
      <div class="container">
        <div class="login-container">
          <h1>管理者ログイン</h1>
          <p class="login-subtitle">ポートフォリオ管理画面にアクセス</p>

          <form @submit.prevent="handleLogin">
            <BaseInput
              v-model="email"
              type="email"
              label="メールアドレス"
              placeholder="admin@example.com"
              required
            />

            <BaseInput
              v-model="password"
              type="password"
              label="パスワード"
              required
            />

            <ErrorMessage v-if="error" :message="error" />

            <BaseButton
              type="submit"
              :loading="loading"
              class="login-button"
            >
              ログイン
            </BaseButton>
          </form>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuth } from '../composables/useAuth'
import BaseInput from '../components/common/BaseInput.vue'
import BaseButton from '../components/common/BaseButton.vue'
import ErrorMessage from '../components/common/ErrorMessage.vue'

const router = useRouter()
const route = useRoute()
const { signIn, error, loading } = useAuth()

const email = ref('')
const password = ref('')

const handleLogin = async () => {
  const success = await signIn(email.value, password.value)
  if (success) {
    const redirect = route.query.redirect || '/admin'
    router.push(redirect)
  }
}
</script>

<style scoped>
.login-page {
  min-height: calc(100vh - 200px);
  display: flex;
  align-items: center;
  justify-content: center;
}

.login-container {
  max-width: 450px;
  margin: 0 auto;
  padding: var(--spacing-2xl);
  background-color: var(--color-background-alt);
  border-radius: var(--border-radius);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.login-container h1 {
  text-align: center;
  margin-bottom: var(--spacing-sm);
  color: var(--color-primary);
}

.login-subtitle {
  text-align: center;
  color: var(--color-text-light);
  margin-bottom: var(--spacing-xl);
}

.login-button {
  width: 100%;
  margin-top: var(--spacing-md);
}
</style>
