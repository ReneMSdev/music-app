'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { User } from '@supabase/supabase-js'

type UserContextType = {
  user: User | null
  setUser: React.Dispatch<React.SetStateAction<User | null>> // <-- add this!
  loading: boolean
}

const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
  loading: true,
})

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fakeUser = {
      id: '123',
      email: 'test@example.com',
      user_metadata: {
        full_name: 'Test User',
        avatar_url: 'https://example.com/avatar.png',
      },
    } as any // eslint-disable-line @typescript-eslint/no-explicit-any

    setUser(fakeUser)
    setLoading(false)
  }, [])

  return <UserContext.Provider value={{ user, setUser, loading }}>{children}</UserContext.Provider>
}

export function useUser() {
  return useContext(UserContext)
}
