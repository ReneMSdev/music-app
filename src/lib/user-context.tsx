'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from './supabase'
import { User } from '@supabase/supabase-js'

type UserContextType = {
  user: User | null
  loading: boolean
}

const UserContext = createContext<UserContextType>({ user: null, loading: true })

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const refreshSpotifyToken = async (refreshToken: string) => {
      try {
        const res = await fetch('/api/spotify/refresh', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ refresh_token: refreshToken }),
        })

        const tokenData = await res.json()

        if (tokenData.access_token) {
          const expiresAt = Date.now() + tokenData.expires_in * 1000

          // Update in Supabase user metadata
          await supabase.auth.updateUser({
            data: {
              spotify_access_token: tokenData.access_token,
              spotify_expires_at: expiresAt,
              ...(tokenData.refresh_token && {
                spotify_refresh_token: tokenData.refresh_token,
              }),
            },
          })

          // Update local user state
          const { data: updatedUser } = await supabase.auth.getUser()
          if (updatedUser?.user) setUser(updatedUser.user)
        }
      } catch (err) {
        console.error('Error refreshing Spotify token:', err)
      }
    }

    const getUser = async () => {
      const { data } = await supabase.auth.getUser()
      const currentUser = data?.user

      if (currentUser) {
        const { spotify_refresh_token, spotify_expires_at } = currentUser.user_metadata || {}
        const now = Date.now()

        if (spotify_refresh_token && spotify_expires_at && now >= spotify_expires_at) {
          await refreshSpotifyToken(spotify_refresh_token)
        } else {
          setUser(currentUser)
        }
      }

      setLoading(false)
    }

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        setUser(session.user ?? null)
      }
    })

    getUser()

    return () => listener.subscription.unsubscribe()
  }, [])

  return <UserContext.Provider value={{ user, loading }}>{children}</UserContext.Provider>
}

export function useUser() {
  return useContext(UserContext)
}
