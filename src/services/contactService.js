import { supabase } from './supabase'

export const contactService = {
  // コンタクト送信
  async submitContact(contact) {
    const { data, error} = await supabase
      .from('contacts')
      .insert([contact])
      .select()
      .single()

    if (error) throw error
    return data
  },

  // 全コンタクト取得（管理者用）
  async getAllContacts() {
    const { data, error } = await supabase
      .from('contacts')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error
    return data
  },

  // 既読にする
  async markAsRead(id) {
    const { data, error } = await supabase
      .from('contacts')
      .update({ read: true })
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data
  },

  // コンタクト削除
  async deleteContact(id) {
    const { error } = await supabase
      .from('contacts')
      .delete()
      .eq('id', id)

    if (error) throw error
  }
}
