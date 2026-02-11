import { supabase } from '../services/supabase'

export async function requireAuth(to, from, next) {
  const { data: { session } } = await supabase.auth.getSession()

  if (!session) {
    next({
      path: '/login',
      query: { redirect: to.fullPath }
    })
  } else {
    next()
  }
}
