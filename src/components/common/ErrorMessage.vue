<template>
  <div class="error-message">
    {{ message }}
  </div>
</template>

<script setup>
defineProps({
  message: {
    type: String,
    required: true
  }
})
</script>

<style scoped>
.error-message {
  padding: var(--spacing-sm) var(--spacing-md);
  background-color: #fee;
  border: 1px solid #e53e3e;
  border-radius: var(--border-radius);
  color: #e53e3e;
  margin: var(--spacing-md) 0;
}

@media (prefers-color-scheme: dark) {
  .error-message {
    background-color: rgba(229, 62, 62, 0.1);
  }
}
</style>
