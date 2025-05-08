'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent } from '@/components/ui/card' // Corrected Shadcn Card import path
import Link from 'next/link'

// Define the structure for a track based on Spotify's recently played API response
type Track = {
  id: string
  name: string
  album: {
    images: { url: string }[]
    name: string
  }
  artists: { name: string }[]
}

// Define the structure for the API response item
type RecentlyPlayedItem = {
  track: {
    id: string
    name: string
    album: {
      images: { url: string }[]
      name: string
    }
    artists: { name: string }[]
  }
  played_at: string // Include played_at if needed later
}

// Define the structure for the full API response
type RecentlyPlayedResponse = {
  items: RecentlyPlayedItem[]
  // Add other potential fields like 'next', 'cursors', 'limit', 'href' if needed
}

export function RecentlyPlayed({ accessToken }: { accessToken: string }) {
  const [tracks, setTracks] = useState<Track[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchRecentlyPlayed = async () => {
      setError(null) // Reset error state on new fetch
      try {
        const res = await fetch(`/api/spotify/recently-played?access_token=${accessToken}`, {
          headers: {
            // Send the access token in the Authorization header
            Authorization: `Bearer ${accessToken}`,
          },
        })

        if (!res.ok) {
          const errorData = await res.json()
          throw new Error(errorData.error || 'Failed to fetch recently played tracks')
        }

        const data: RecentlyPlayedResponse = await res.json()
        const items = data.items || []

        // Map the received items to the simplified Track structure
        const simplifiedTracks: Track[] = items.map((item) => ({
          id: item.track.id,
          name: item.track.name,
          album: {
            images: item.track.album.images,
            name: item.track.album.name,
          },
          artists: item.track.artists,
        }))

        setTracks(simplifiedTracks)
      } catch (err) {
        console.error('Error loading recently played:', err)
        setError(err instanceof Error ? err.message : 'An unknown error occurred')
      }
    }

    // Only fetch if an access token is provided
    if (accessToken) {
      fetchRecentlyPlayed()
    } else {
      // Clear tracks if the access token is removed
      setTracks([])
    }
  }, [accessToken]) // Re-run effect if accessToken changes

  if (error) {
    return <p className='text-red-500 p-4'>Error loading tracks: {error}</p>
  }

  if (!tracks.length && !error) {
    // Show loading or no tracks message appropriately
    return <p className='p-4'>Loading recently played tracks ...</p>
  }

  return (
    <div className='w-full max-w-4xl mx-auto p-4'>
      <h2 className='text-2xl font-semibold mb-4 text-white'>Recently Played</h2>
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4'>
        {tracks.slice(0, 10).map((track) => (
          <Link
            href={`/track/${track.id}`}
            key={track.id}
            className='block'
          >
            <Card className='bg-slate-800 border-slate-700 text-white  overflow-hidden hover:bg-slate-700 transition duration-200 rounded-lg'>
              <CardContent className='flex flex-col !p-0 cursor-pointer'>
                <div className='w-full'>
                  <img
                    src={track.album.images?.[0]?.url || '/placeholder-image.png'}
                    alt={track.album.name}
                    className='w-full h-auto aspect-square object-cover rounded-t-lg'
                    width={200}
                    height={200}
                  />
                </div>
                <div className='p-3'>
                  <h3
                    className='text-base font-semibold truncate'
                    title={track.name}
                  >
                    {track.name}
                  </h3>
                  <p
                    className='text-xs text-gray-400 truncate'
                    title={track.artists.map((artist) => artist.name).join(', ')}
                  >
                    {track.artists.map((artist) => artist.name).join(', ')}
                  </p>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
