import { supabase } from './supabase'

export async function login(email: string, password: string) {
  return await supabase.auth.signInWithPassword({ email, password })
}

export async function signup(name: string, email: string, password: string) {
  return await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { name },
    },
  })
}
