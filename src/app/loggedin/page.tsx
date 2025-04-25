'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useUser } from '@/lib/user-context'
import { LoadingSpinner } from '@/components/ui/loading-spinner'
import { Button } from '@/components/ui/button' // Assuming you have a Button component

export default function LoggedInHome() {
  const { user, loading } = useUser()
  const router = useRouter()
  const [checkingSpotify, setCheckingSpotify] = useState(true)

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login')
    } else if (!loading && user) {
      const { spotify_access_token } = user.user_metadata || {}
      if (spotify_access_token) {
        setCheckingSpotify(false) // All good
      } else {
        setCheckingSpotify(false) // No Spotify, but still show page with connect option
      }
    }
  }, [user, loading, router])

  if (loading || checkingSpotify) return <LoadingSpinner />

  const handleSpotifyConnect = () => {
    router.push('/api/spotify/login') // This will start the Spotify auth flow
  }

  return (
    <div className='min-h-screen bg-stone-900 text-white flex flex-col justify-center items-center px-4'>
      <div className='text-center space-y-4'>
        <h1 className='text-5xl font-extrabold text-lime-400 animate-pulse'>
          NOW YOU&apos;RE IN 🎧🔥
        </h1>
        {user && (
          <h2 className='text-2xl'>Welcome, {user.user_metadata?.full_name || user.email}!</h2>
        )}

        {!user?.user_metadata?.spotify_access_token && (
          <div className='mt-8 space-y-4'>
            <p className='text-lg text-red-400 font-semibold'>
              🚨 Please connect your Spotify account to continue
            </p>
            <Button onClick={handleSpotifyConnect}>Connect Spotify</Button>
          </div>
        )}
      </div>
    </div>
  )
}
