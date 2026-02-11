import { ref, computed } from 'vue'
import { supabase } from '../services/supabase'

const user = ref(null)
const loading = ref(false)
const error = ref(null)

export function useAuth() {
  // 認証状態の確認
  const checkAuth = async () => {
    loading.value = true
    try {
      const { data: { session } } = await supabase.auth.getSession()
      user.value = session?.user ?? null
    } catch (err) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  // ログイン
  const signIn = async (email, password) => {
    loading.value = true
    error.value = null
    try {
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password
      })

      if (signInError) throw signInError

      user.value = data.user
      return true
    } catch (err) {
      error.value = err.message
      return false
    } finally {
      loading.value = false
    }
  }

  // ログアウト
  const signOut = async () => {
    loading.value = true
    error.value = null
    try {
      const { error: signOutError } = await supabase.auth.signOut()
      if (signOutError) throw signOutError
      user.value = null
      return true
    } catch (err) {
      error.value = err.message
      return false
    } finally {
      loading.value = false
    }
  }

  // 認証状態の監視
  supabase.auth.onAuthStateChange((event, session) => {
    user.value = session?.user ?? null
  })

  const isAuthenticated = computed(() => !!user.value)

  return {
    user,
    loading,
    error,
    isAuthenticated,
    checkAuth,
    signIn,
    signOut
  }
}
