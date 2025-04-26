'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useUser } from '@/lib/user-context'
import { LoadingSpinner } from '@/components/ui/loading-spinner'
import { Button } from '@/components/ui/button'

export default function LoggedInHome() {
  const { user, setUser, loading } = useUser()
  const router = useRouter()
  const searchParams = useSearchParams()
  const [tokensProcessed, setTokensProcessed] = useState(false) // 🔥 add this

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login')
    }
  }, [user, loading, router])

  useEffect(() => {
    const accessToken = searchParams.get('access_token')
    const refreshToken = searchParams.get('refresh_token')
    const expiresIn = searchParams.get('expires_in')

    if (!tokensProcessed && !loading && user && accessToken && refreshToken && expiresIn) {
      console.log('Updating user with Spotify tokens')

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

      setTokensProcessed(true) // ✅ mark as processed so it doesn't loop

      router.replace('/loggedin') // clean the URL
    }
  }, [searchParams, setUser, router, user, loading, tokensProcessed])

  if (loading) return <LoadingSpinner />

  const handleSpotifyConnect = () => {
    router.push('/api/spotify/login')
  }

  return (
    <div className='min-h-screen bg-stone-900 text-white flex flex-col items-center mt-40'>
      <div className='text-center space-y-4'>
        {user && (
          <h2 className='text-2xl'>Welcome, {user.user_metadata?.full_name || user.email}!</h2>
        )}

        {user?.user_metadata?.spotify_access_token && (
          <h1 className='text-4xl font-bold text-green-400 mt-6 animate-pulse'>
            ✅ Spotify Connected Successfully!
          </h1>
        )}

        {!user?.user_metadata?.spotify_access_token && (
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
