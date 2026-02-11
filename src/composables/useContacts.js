import { ref } from 'vue'
import { contactService } from '../services/contactService'

export function useContacts() {
  const contacts = ref([])
  const loading = ref(false)
  const error = ref(null)

  // コンタクト送信
  const submitContact = async (contactData) => {
    loading.value = true
    error.value = null
    try {
      await contactService.submitContact(contactData)
      return true
    } catch (err) {
      error.value = err.message
      console.error('Error submitting contact:', err)
      return false
    } finally {
      loading.value = false
    }
  }

  // 全コンタクト取得（管理者用）
  const fetchAllContacts = async () => {
    loading.value = true
    error.value = null
    try {
      contacts.value = await contactService.getAllContacts()
    } catch (err) {
      error.value = err.message
      console.error('Error fetching contacts:', err)
    } finally {
      loading.value = false
    }
  }

  // 既読にする
  const markAsRead = async (id) => {
    loading.value = true
    error.value = null
    try {
      const updated = await contactService.markAsRead(id)
      const index = contacts.value.findIndex(c => c.id === id)
      if (index !== -1) {
        contacts.value[index] = updated
      }
      return true
    } catch (err) {
      error.value = err.message
      console.error('Error marking as read:', err)
      return false
    } finally {
      loading.value = false
    }
  }

  // コンタクト削除
  const deleteContact = async (id) => {
    loading.value = true
    error.value = null
    try {
      await contactService.deleteContact(id)
      contacts.value = contacts.value.filter(c => c.id !== id)
      return true
    } catch (err) {
      error.value = err.message
      console.error('Error deleting contact:', err)
      return false
    } finally {
      loading.value = false
    }
  }

  return {
    contacts,
    loading,
    error,
    submitContact,
    fetchAllContacts,
    markAsRead,
    deleteContact
  }
}
