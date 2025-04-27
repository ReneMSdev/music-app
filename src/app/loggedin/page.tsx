'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useUser } from '@/lib/user-context'
import { supabase } from '@/lib/supabase'
import { LoadingSpinner } from '@/components/ui/loading-spinner'
import { Button } from '@/components/ui/button'
import { RecentlyPlayed } from '@/components/spotify/RecentlyPlayed'

export default function LoggedInHome() {
  const { user, setUser, loading } = useUser()
  const router = useRouter()
  const searchParams = useSearchParams()
  const [tokensProcessed, setTokensProcessed] = useState(false)
  const [refreshing, setRefreshing] = useState(true)

  useEffect(() => {
    const refreshSessionAndUser = async () => {
      console.log('Refreshing Supabase session...')
      await supabase.auth.refreshSession()

      console.log('Fetching latest Supabase user...')
      const { data, error } = await supabase.auth.getUser()

      if (error || !data?.user) {
        console.error('Error fetching user after refresh', error)
        router.push('/login')
        return
      }

      console.log('Got fresh user from Supabase:', data.user)
      console.log('User metadata is:', data.user.user_metadata)

      console.log('Setting fresh user into context', data.user)
      setUser(data.user)
      setRefreshing(false)
    }

    refreshSessionAndUser()
  }, [setUser, router])

  useEffect(() => {
    const accessToken = searchParams.get('access_token')
    const refreshToken = searchParams.get('refresh_token')
    const expiresIn = searchParams.get('expires_in')

    if (
      !tokensProcessed &&
      !loading &&
      !refreshing &&
      user &&
      accessToken &&
      refreshToken &&
      expiresIn
    ) {
      console.log('Updating user context with Spotify tokens from URL...')

      setUser((prev) => {
        if (!prev) return null
        return {
          ...prev,
          user_metadata: {
            ...(prev.user_metadata ?? {}),
            spotify_access_token: accessToken,
            spotify_refresh_token: refreshToken,
            spotify_expires_at: Date.now() + parseInt(expiresIn) * 1000,
          },
        }
      })

      setTokensProcessed(true)
      router.replace('/loggedin') // clean URL
    }
  }, [searchParams, setUser, router, user, loading, refreshing, tokensProcessed])

  if (loading || refreshing) return <LoadingSpinner />

  const handleSpotifyConnect = () => {
    router.push('/api/spotify/login')
  }

  return (
    <div className='min-h-screen bg-stone-900 text-white flex flex-col items-center mt-25'>
      <div className='text-center space-y-4'>
        {user?.user_metadata?.spotify_access_token ? (
          <RecentlyPlayed accessToken={user.user_metadata.spotify_access_token} />
        ) : (
          <div className='mt-8 space-y-5'>
            <p className='text-lg text-red-400 font-semibold'>
              🚨 Please connect your Spotify account to continue
            </p>
            <Button
              onClick={handleSpotifyConnect}
              className='mt-2 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded cursor-pointer'
            >
              Connect Spotify
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
