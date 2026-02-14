<template>
  <div class="contact">
    <section class="section">
      <div class="container">
        <div class="contact-header text-center">
          <h1>お問い合わせ</h1>
          <p class="contact-subtitle">
            ご質問・ご依頼はこちらからお気軽にご連絡ください
          </p>
        </div>

        <!-- 送信完了メッセージ -->
        <div v-if="submitted" class="success-card">
          <div class="success-icon">✅</div>
          <h2>送信完了！</h2>
          <p>お問い合わせありがとうございます。<br>内容を確認後、折り返しご連絡いたします。</p>
          <button @click="resetForm" class="btn-reset">新しいお問い合わせ</button>
        </div>

        <!-- コンタクトフォーム -->
        <div v-else class="contact-form-wrapper">
          <form @submit.prevent="handleSubmit" class="contact-form">
            <ErrorMessage v-if="error" :message="error" />

            <BaseInput
              v-model="form.name"
              label="お名前"
              :error="errors.name"
              placeholder="山田 太郎"
              required
            />

            <BaseInput
              v-model="form.email"
              label="メールアドレス"
              :error="errors.email"
              placeholder="example@email.com"
              type="email"
              required
            />

            <BaseTextarea
              v-model="form.message"
              label="メッセージ"
              :error="errors.message"
              placeholder="お問い合わせ内容をご記入ください..."
              rows="6"
              required
            />

            <BaseButton type="submit" variant="primary" :loading="loading" class="submit-btn">
              送信する
            </BaseButton>
          </form>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useContacts } from '../composables/useContacts'
import { validateRequired, validateEmail } from '../utils/validators'
import BaseInput from '../components/common/BaseInput.vue'
import BaseTextarea from '../components/common/BaseTextarea.vue'
import BaseButton from '../components/common/BaseButton.vue'
import ErrorMessage from '../components/common/ErrorMessage.vue'

const { loading, error, submitContact } = useContacts()

const submitted = ref(false)
const form = reactive({ name: '', email: '', message: '' })
const errors = reactive({ name: '', email: '', message: '' })

const validate = () => {
  errors.name = validateRequired(form.name, 'お名前')
  errors.email = validateRequired(form.email, 'メールアドレス') || validateEmail(form.email)
  errors.message = validateRequired(form.message, 'メッセージ')
  return !errors.name && !errors.email && !errors.message
}

const handleSubmit = async () => {
  if (!validate()) return
  const success = await submitContact({ ...form })
  if (success) submitted.value = true
}

const resetForm = () => {
  submitted.value = false
  Object.assign(form, { name: '', email: '', message: '' })
  Object.assign(errors, { name: '', email: '', message: '' })
}
</script>

<style scoped>
.contact {
  min-height: 80vh;
}

.contact-header {
  margin-bottom: var(--spacing-xl);
}

.contact-header h1 {
  font-size: 2.5rem;
  font-weight: 800;
  color: var(--color-text);
  margin-bottom: var(--spacing-md);
}

.contact-subtitle {
  color: var(--color-text-light);
  font-size: 1.1rem;
}

.success-card {
  max-width: 500px;
  margin: 0 auto;
  text-align: center;
  background: white;
  padding: var(--spacing-xl);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
}

.success-icon {
  font-size: 4rem;
  margin-bottom: var(--spacing-md);
}

.success-card h2 {
  font-size: 1.8rem;
  color: var(--color-text);
  margin-bottom: var(--spacing-md);
}

.success-card p {
  color: var(--color-text-light);
  line-height: 1.8;
  margin-bottom: var(--spacing-lg);
}

.btn-reset {
  padding: 0.75rem 2rem;
  background: var(--color-primary);
  color: white;
  border: none;
  border-radius: var(--border-radius);
  font-size: 1rem;
  cursor: pointer;
  transition: all var(--transition-speed);
}

.btn-reset:hover {
  background: var(--color-primary-dark);
  transform: translateY(-2px);
}

.contact-form-wrapper {
  max-width: 640px;
  margin: 0 auto;
}

.contact-form {
  background: white;
  padding: var(--spacing-xl);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
}

.submit-btn {
  width: 100%;
  margin-top: var(--spacing-md);
  padding: 1rem;
  font-size: 1.1rem;
}

@media (max-width: 768px) {
  .contact-header h1 {
    font-size: 2rem;
  }

  .contact-form {
    padding: var(--spacing-lg);
  }
}
</style>
