import { supabase } from './supabase'

export const projectService = {
  // 公開プロジェクト一覧取得
  async getPublishedProjects() {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('published', true)
      .order('display_order', { ascending: true })

    if (error) throw error
    return data
  },

  // 全プロジェクト取得（管理者用）
  async getAllProjects() {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('display_order', { ascending: true })

    if (error) throw error
    return data
  },

  // IDでプロジェクト取得
  async getProjectById(id) {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('id', id)
      .single()

    if (error) throw error
    return data
  },

  // プロジェクト作成
  async createProject(project) {
    const { data, error } = await supabase
      .from('projects')
      .insert([project])
      .select()
      .single()

    if (error) throw error
    return data
  },

  // プロジェクト更新
  async updateProject(id, updates) {
    const { data, error } = await supabase
      .from('projects')
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data
  },

  // プロジェクト削除
  async deleteProject(id) {
    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', id)

    if (error) throw error
  },

  // 画像アップロード
  async uploadImage(file) {
    const fileExt = file.name.split('.').pop()
    const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`
    const filePath = `${fileName}`

    const { error: uploadError } = await supabase.storage
      .from('project-images')
      .upload(filePath, file)

    if (uploadError) throw uploadError

    const { data } = supabase.storage
      .from('project-images')
      .getPublicUrl(filePath)

    return data.publicUrl
  },

  // 画像削除
  async deleteImage(imageUrl) {
    const fileName = imageUrl.split('/').pop()
    const { error } = await supabase.storage
      .from('project-images')
      .remove([fileName])

    if (error) throw error
  }
}
