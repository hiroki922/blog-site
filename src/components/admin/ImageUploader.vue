<template>
  <div class="image-uploader">
    <label v-if="label" class="label">{{ label }}</label>

    <div
      class="upload-area"
      :class="{ 'has-image': modelValue, 'drag-over': isDragging }"
      @dragover.prevent="isDragging = true"
      @dragleave="isDragging = false"
      @drop.prevent="handleDrop"
      @click="triggerFileInput"
    >
      <img v-if="modelValue" :src="modelValue" alt="プレビュー" class="preview-image" />
      <div v-else class="upload-placeholder">
        <span class="upload-icon">📷</span>
        <p>クリックまたはドラッグ&ドロップで画像をアップロード</p>
        <p class="upload-hint">PNG, JPG, WebP - 最大5MB</p>
      </div>
    </div>

    <input
      ref="fileInputRef"
      type="file"
      accept="image/*"
      class="file-input"
      @change="handleFileChange"
    />

    <div v-if="modelValue" class="image-actions">
      <button type="button" @click="triggerFileInput" class="btn-replace">
        画像を変更
      </button>
      <button type="button" @click="removeImage" class="btn-remove">
        削除
      </button>
    </div>

    <div v-if="uploading" class="upload-progress">
      <LoadingSpinner message="アップロード中..." />
    </div>

    <p v-if="uploadError" class="upload-error">{{ uploadError }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import LoadingSpinner from '../common/LoadingSpinner.vue'

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  label: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['update:modelValue', 'upload'])

const fileInputRef = ref(null)
const isDragging = ref(false)
const uploading = ref(false)
const uploadError = ref('')

const triggerFileInput = () => {
  fileInputRef.value?.click()
}

const handleFileChange = async (e) => {
  const file = e.target.files[0]
  if (file) await processFile(file)
}

const handleDrop = async (e) => {
  isDragging.value = false
  const file = e.dataTransfer.files[0]
  if (file && file.type.startsWith('image/')) {
    await processFile(file)
  }
}

const processFile = async (file) => {
  if (file.size > 5 * 1024 * 1024) {
    uploadError.value = 'ファイルサイズは5MB以下にしてください'
    return
  }

  uploading.value = true
  uploadError.value = ''

  try {
    // emit でファイルを親に渡す（Supabase Storageへのアップロードは親が処理）
    emit('upload', file)

    // ローカルプレビュー用URLを作成
    const previewUrl = URL.createObjectURL(file)
    emit('update:modelValue', previewUrl)
  } catch (err) {
    uploadError.value = 'アップロードに失敗しました'
    console.error(err)
  } finally {
    uploading.value = false
  }
}

const removeImage = () => {
  emit('update:modelValue', '')
  if (fileInputRef.value) fileInputRef.value.value = ''
}
</script>

<style scoped>
.image-uploader {
  margin-bottom: var(--spacing-md);
}

.label {
  display: block;
  margin-bottom: var(--spacing-xs);
  font-weight: 600;
  color: var(--color-text);
}

.upload-area {
  border: 2px dashed var(--color-border);
  border-radius: var(--border-radius);
  cursor: pointer;
  transition: all var(--transition-speed);
  overflow: hidden;
  min-height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.upload-area:hover,
.upload-area.drag-over {
  border-color: var(--color-primary);
  background: rgba(59, 130, 246, 0.05);
}

.upload-area.has-image {
  border-style: solid;
}

.preview-image {
  width: 100%;
  max-height: 300px;
  object-fit: cover;
}

.upload-placeholder {
  text-align: center;
  padding: var(--spacing-xl);
  color: var(--color-text-light);
}

.upload-icon {
  font-size: 3rem;
  display: block;
  margin-bottom: var(--spacing-md);
}

.upload-placeholder p {
  margin-bottom: var(--spacing-xs);
}

.upload-hint {
  font-size: 0.85rem;
  color: var(--color-text-lighter);
}

.file-input {
  display: none;
}

.image-actions {
  display: flex;
  gap: var(--spacing-sm);
  margin-top: var(--spacing-sm);
}

.btn-replace,
.btn-remove {
  padding: var(--spacing-xs) var(--spacing-md);
  border-radius: var(--border-radius-sm);
  border: none;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all var(--transition-speed);
}

.btn-replace {
  background: var(--color-primary);
  color: white;
}

.btn-replace:hover {
  background: var(--color-primary-dark);
}

.btn-remove {
  background: #fee2e2;
  color: var(--color-danger);
}

.btn-remove:hover {
  background: var(--color-danger);
  color: white;
}

.upload-error {
  margin-top: var(--spacing-xs);
  color: var(--color-danger);
  font-size: 0.9rem;
}
</style>
