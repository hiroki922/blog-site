<template>
  <div class="tag-input">
    <label v-if="label" class="label">{{ label }}</label>
    <div class="tags-container">
      <span v-for="(tag, index) in modelValue" :key="index" class="tag">
        {{ tag }}
        <button type="button" @click="removeTag(index)" class="tag-remove">
          ×
        </button>
      </span>
      <input
        v-model="inputValue"
        type="text"
        :placeholder="placeholder"
        @keydown.enter.prevent="addTag"
        @keydown.comma.prevent="addTag"
        class="tag-input-field"
      />
    </div>
    <p v-if="hint" class="hint">{{ hint }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  modelValue: {
    type: Array,
    default: () => []
  },
  label: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: 'タグを入力してEnterまたはカンマで追加'
  },
  hint: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['update:modelValue'])

const inputValue = ref('')

const addTag = () => {
  const tag = inputValue.value.trim()
  if (tag && !props.modelValue.includes(tag)) {
    emit('update:modelValue', [...props.modelValue, tag])
    inputValue.value = ''
  }
}

const removeTag = (index) => {
  const newTags = [...props.modelValue]
  newTags.splice(index, 1)
  emit('update:modelValue', newTags)
}
</script>

<style scoped>
.tag-input {
  margin-bottom: var(--spacing-md);
}

.label {
  display: block;
  margin-bottom: var(--spacing-xs);
  font-weight: 600;
  color: var(--color-text);
}

.tags-container {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-xs);
  padding: var(--spacing-sm);
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius);
  background: var(--color-bg);
  min-height: 42px;
  align-items: center;
}

.tag {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.25rem 0.5rem;
  background: var(--color-primary);
  color: white;
  border-radius: 4px;
  font-size: 0.9rem;
}

.tag-remove {
  border: none;
  background: none;
  color: white;
  font-size: 1.2rem;
  cursor: pointer;
  padding: 0;
  line-height: 1;
  transition: opacity var(--transition-speed);
}

.tag-remove:hover {
  opacity: 0.7;
}

.tag-input-field {
  flex: 1;
  border: none;
  outline: none;
  background: transparent;
  padding: var(--spacing-xs);
  font-size: 1rem;
  min-width: 150px;
}

.hint {
  margin-top: var(--spacing-xs);
  font-size: 0.85rem;
  color: var(--color-text-light);
}
</style>
