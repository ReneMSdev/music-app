'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { Button } from '@/components/ui/button'

type TrackData = {
  name: string
  album: {
    images: { url: string }[]
    name: string
    release_date: string
  }
  artists: { name: string }[]
  duration_ms: number
}

export default function TrackPage() {
  const { id } = useParams()
  console.log('Track ID:', id)
  const [track, setTrack] = useState<TrackData | null>(null)
  const [loading, setLoading] = useState(true)
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    const fetchTrack = async () => {
      try {
        const res = await fetch(`/api/spotify/track/${id}`)

        if (!res.ok) {
          throw new Error('Failed to fetch track info')
        }

        const data = await res.json()
        console.log('Track Data:', data)
        setTrack(data)
      } catch (err) {
        console.error('Error loading track:', err)
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchTrack()
    }
  }, [id])

  if (loading) {
    return <div className='text-center text-white p-6'>Loading track...</div>
  }

  if (!track) {
    return <div className='text-center text-red-500 p-6'>Track not found.</div>
  }

  const durationMinutes = Math.floor(track.duration_ms / 60000)
  const durationSeconds = Math.floor((track.duration_ms % 60000) / 1000)

  return (
    <div className='min-h-screen bg-slate-900 text-white flex flex-col items-center p-6'>
      {/* Track Info Card */}
      <div className='flex flex-col items-center bg-slate-800 p-6 rounded-xl max-w-md w-full shadow-lg'>
        <img
          src={track.album.images[0]?.url || '/placeholder-image.png'}
          alt={track.album.name}
          className='w-64 h-64 object-cover rounded-lg'
        />
        <div className='text-center mt-6'>
          <p className='text-sm text-gray-400'>Song</p>
          <h1 className='text-4xl font-extrabold mt-2'>{track.name}</h1>
          <p className='mt-2 text-gray-400'>
            <span className='font-semibold'>
              {track.artists.map((artist) => artist.name).join(', ')}
            </span>{' '}
            • {track.album.name} • {track.album.release_date.slice(0, 4)} • {durationMinutes}:
            {durationSeconds.toString().padStart(2, '0')}
          </p>
        </div>
      </div>

      {/* Music Controls */}
      <div className='mt-10 w-full max-w-md flex flex-col items-center space-y-4'>
        {/* Progress bar (static for now) */}
        <div className='w-full bg-gray-700 h-2 rounded-full overflow-hidden'>
          <div
            className='bg-green-500 h-2'
            style={{ width: playing ? '30%' : '0%' }}
          ></div>
        </div>

        {/* Control buttons */}
        <div className='flex items-center space-x-6 mt-4'>
          <Button variant='outline'>⏮️</Button>
          <Button
            onClick={() => setPlaying(!playing)}
            className='bg-green-500 hover:bg-green-600 text-white text-xl px-6 py-3 rounded-full'
          >
            {playing ? '⏸️' : '▶️'}
          </Button>
          <Button variant='outline'>⏭️</Button>
        </div>
      </div>
    </div>
  )
}
