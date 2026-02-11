<template>
  <button
    :class="['base-button', variant, { loading }]"
    :disabled="disabled || loading"
    :type="type"
  >
    <span v-if="loading" class="spinner"></span>
    <span :class="{ invisible: loading }">
      <slot />
    </span>
  </button>
</template>

<script setup>
defineProps({
  variant: {
    type: String,
    default: 'primary',
    validator: (v) => ['primary', 'secondary', 'danger'].includes(v)
  },
  type: {
    type: String,
    default: 'button'
  },
  loading: Boolean,
  disabled: Boolean
})
</script>

<style scoped>
.base-button {
  padding: var(--spacing-sm) var(--spacing-lg);
  border: none;
  border-radius: var(--border-radius);
  font-weight: 600;
  cursor: pointer;
  transition: all var(--transition-fast);
  position: relative;
  font-size: 1rem;
}

.base-button.primary {
  background-color: var(--color-secondary);
  color: white;
}

.base-button.primary:hover:not(:disabled) {
  background-color: var(--color-primary);
}

.base-button.secondary {
  background-color: transparent;
  border: 1px solid var(--color-border);
  color: var(--color-text);
}

.base-button.secondary:hover:not(:disabled) {
  background-color: var(--color-background-alt);
}

.base-button.danger {
  background-color: #e53e3e;
  color: white;
}

.base-button.danger:hover:not(:disabled) {
  background-color: #c53030;
}

.base-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.spinner {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
}

@keyframes spin {
  to { transform: translate(-50%, -50%) rotate(360deg); }
}

.invisible {
  visibility: hidden;
}
</style>
