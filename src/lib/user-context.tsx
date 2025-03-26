'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from './supabase'
import { User } from '@supabase/supabase-js'

type UserContextType = {
  user: User | null
}

const UserContext = createContext<UserContextType>({ user: null })

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser()
      if (data?.user) setUser(data.user)
    }

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        setUser(session?.user ?? null)
      } else setUser(null)
    })

    getUser()

    return () => listener.subscription.unsubscribe()
  }, [])

  return <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
}

export function useUser() {
  return useContext(UserContext)
}
