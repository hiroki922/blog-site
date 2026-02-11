<template>
  <div class="base-input">
    <label v-if="label">{{ label }}</label>
    <input
      :type="type"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      :placeholder="placeholder"
      :required="required"
      :class="{ error: error }"
    />
    <span v-if="error" class="error-text">{{ error }}</span>
  </div>
</template>

<script setup>
defineProps({
  modelValue: [String, Number],
  label: String,
  type: {
    type: String,
    default: 'text'
  },
  placeholder: String,
  required: Boolean,
  error: String
})

defineEmits(['update:modelValue'])
</script>

<style scoped>
.base-input {
  margin-bottom: var(--spacing-md);
}

.base-input label {
  display: block;
  margin-bottom: var(--spacing-xs);
  font-weight: 600;
  color: var(--color-text);
}

.base-input input {
  width: 100%;
  padding: var(--spacing-sm);
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius);
  font-size: 1rem;
  transition: border-color var(--transition-fast);
  background-color: var(--color-background);
  color: var(--color-text);
}

.base-input input:focus {
  outline: none;
  border-color: var(--color-secondary);
}

.base-input input.error {
  border-color: #e53e3e;
}

.error-text {
  display: block;
  margin-top: var(--spacing-xs);
  color: #e53e3e;
  font-size: 0.875rem;
}
</style>
