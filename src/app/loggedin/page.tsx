'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useUser } from '@/lib/user-context'
import { LoadingSpinner } from '@/components/ui/loading-spinner'
import { Button } from '@/components/ui/button'
import { RecentlyPlayed } from '@/components/spotify/RecentlyPlayed' // Import the new component

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

  useEffect(() => {
    if (!loading && user) {
      // We only need refresh token and expiry to check if refresh is needed
      const { spotify_refresh_token, spotify_expires_at } = user.user_metadata || {}

      if (spotify_refresh_token && spotify_expires_at && Date.now() >= spotify_expires_at) {
        console.log('Spotify access token expired. Refreshing...')

        const refreshSpotifyToken = async () => {
          try {
            const res = await fetch('/api/spotify/refresh', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ refresh_token: spotify_refresh_token }),
            })

            const tokenData = await res.json()

            if (tokenData.access_token) {
              console.log('New Spotify access token received')

              setUser((prev) => {
                if (!prev) return null
                return {
                  ...prev,
                  user_metadata: {
                    ...(prev.user_metadata ?? {}),
                    spotify_access_token: tokenData.access_token,
                    spotify_expires_at: Date.now() + tokenData.expires_in * 1000, // typically 3600 seconds
                    // If Spotify gives back a new refresh_token (rare), update it too
                    ...(tokenData.refresh_token && {
                      spotify_refresh_token: tokenData.refresh_token,
                    }),
                  },
                }
              })
            }
          } catch (error) {
            console.error('Error refreshing Spotify token:', error)
          }
        }

        refreshSpotifyToken()
      }
    }
  }, [user, loading, setUser])
  if (loading) return <LoadingSpinner />

  const handleSpotifyConnect = () => {
    router.push('/api/spotify/login')
  }

  return (
    <div className='min-h-screen bg-stone-900 text-white flex flex-col items-center mt-25'>
      <div className='text-center space-y-4'>
        {user?.user_metadata?.spotify_access_token && (
          <>
            {/* Render the RecentlyPlayed component, passing the token */}
            <RecentlyPlayed accessToken={user.user_metadata.spotify_access_token} />
          </>
        )}

        {/* Show connect button only if token doesn't exist */}
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
