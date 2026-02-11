<template>
  <div class="base-textarea">
    <label v-if="label">{{ label }}</label>
    <textarea
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      :rows="rows"
      :placeholder="placeholder"
      :required="required"
      :class="{ error: error }"
    ></textarea>
    <span v-if="error" class="error-text">{{ error }}</span>
  </div>
</template>

<script setup>
defineProps({
  modelValue: String,
  label: String,
  rows: {
    type: Number,
    default: 4
  },
  placeholder: String,
  required: Boolean,
  error: String
})

defineEmits(['update:modelValue'])
</script>

<style scoped>
.base-textarea {
  margin-bottom: var(--spacing-md);
}

.base-textarea label {
  display: block;
  margin-bottom: var(--spacing-xs);
  font-weight: 600;
  color: var(--color-text);
}

.base-textarea textarea {
  width: 100%;
  padding: var(--spacing-sm);
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius);
  font-size: 1rem;
  font-family: inherit;
  transition: border-color var(--transition-fast);
  resize: vertical;
  background-color: var(--color-background);
  color: var(--color-text);
}

.base-textarea textarea:focus {
  outline: none;
  border-color: var(--color-secondary);
}

.base-textarea textarea.error {
  border-color: #e53e3e;
}

.error-text {
  display: block;
  margin-top: var(--spacing-xs);
  color: #e53e3e;
  font-size: 0.875rem;
}
</style>
