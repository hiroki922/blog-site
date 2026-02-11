import { supabase } from './supabase'

export const blogService = {
  // 公開ブログ一覧取得
  async getPublishedBlogs() {
    const { data, error } = await supabase
      .from('blogs')
      .select('*')
      .eq('published', true)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data
  },

  // スラッグでブログ取得
  async getBlogBySlug(slug) {
    const { data, error } = await supabase
      .from('blogs')
      .select('*')
      .eq('slug', slug)
      .eq('published', true)
      .single()

    if (error) throw error
    return data
  },

  // 全ブログ取得（管理者用）
  async getAllBlogs() {
    const { data, error } = await supabase
      .from('blogs')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error
    return data
  },

  // IDでブログ取得（管理者用）
  async getBlogById(id) {
    const { data, error } = await supabase
      .from('blogs')
      .select('*')
      .eq('id', id)
      .single()

    if (error) throw error
    return data
  },

  // ブログ作成
  async createBlog(blog) {
    const { data, error } = await supabase
      .from('blogs')
      .insert([blog])
      .select()
      .single()

    if (error) throw error
    return data
  },

  // ブログ更新
  async updateBlog(id, updates) {
    const { data, error } = await supabase
      .from('blogs')
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data
  },

  // ブログ削除
  async deleteBlog(id) {
    const { error } = await supabase
      .from('blogs')
      .delete()
      .eq('id', id)

    if (error) throw error
  },

  // タグでフィルタリング
  async getBlogsByTag(tag) {
    const { data, error } = await supabase
      .from('blogs')
      .select('*')
      .contains('tags', [tag])
      .eq('published', true)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data
  }
}
