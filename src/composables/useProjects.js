import { ref } from 'vue'
import { projectService } from '../services/projectService'

export function useProjects() {
  const projects = ref([])
  const currentProject = ref(null)
  const loading = ref(false)
  const error = ref(null)

  // 公開プロジェクト取得
  const fetchPublishedProjects = async () => {
    loading.value = true
    error.value = null
    try {
      projects.value = await projectService.getPublishedProjects()
    } catch (err) {
      error.value = err.message
      console.error('Error fetching projects:', err)
    } finally {
      loading.value = false
    }
  }

  // 全プロジェクト取得（管理者用）
  const fetchAllProjects = async () => {
    loading.value = true
    error.value = null
    try {
      projects.value = await projectService.getAllProjects()
    } catch (err) {
      error.value = err.message
      console.error('Error fetching all projects:', err)
    } finally {
      loading.value = false
    }
  }

  // プロジェクト作成
  const createProject = async (projectData) => {
    loading.value = true
    error.value = null
    try {
      const newProject = await projectService.createProject(projectData)
      projects.value.push(newProject)
      return newProject
    } catch (err) {
      error.value = err.message
      console.error('Error creating project:', err)
      return null
    } finally {
      loading.value = false
    }
  }

  // プロジェクト更新
  const updateProject = async (id, updates) => {
    loading.value = true
    error.value = null
    try {
      const updated = await projectService.updateProject(id, updates)
      const index = projects.value.findIndex(p => p.id === id)
      if (index !== -1) {
        projects.value[index] = updated
      }
      return updated
    } catch (err) {
      error.value = err.message
      console.error('Error updating project:', err)
      return null
    } finally {
      loading.value = false
    }
  }

  // プロジェクト削除
  const deleteProject = async (id) => {
    loading.value = true
    error.value = null
    try {
      await projectService.deleteProject(id)
      projects.value = projects.value.filter(p => p.id !== id)
      return true
    } catch (err) {
      error.value = err.message
      console.error('Error deleting project:', err)
      return false
    } finally {
      loading.value = false
    }
  }

  // 画像アップロード
  const uploadImage = async (file) => {
    loading.value = true
    error.value = null
    try {
      return await projectService.uploadImage(file)
    } catch (err) {
      error.value = err.message
      console.error('Error uploading image:', err)
      return null
    } finally {
      loading.value = false
    }
  }

  return {
    projects,
    currentProject,
    loading,
    error,
    fetchPublishedProjects,
    fetchAllProjects,
    createProject,
    updateProject,
    deleteProject,
    uploadImage
  }
}
