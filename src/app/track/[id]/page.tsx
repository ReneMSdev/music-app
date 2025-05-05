'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { Progress } from '@/components/ui/progress'
import { FaRandom, FaStepBackward, FaPlayCircle, FaStepForward } from 'react-icons/fa'
import { FaRepeat, FaCirclePause } from 'react-icons/fa6'

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
    <>
      <div className='w-full bg-slate-900 flex flex-col items-center px-4'>
        <div className='min-h-screen text-white flex flex-col items-center p-6 mt-15'>
          {/* Track Info Card */}
          <div className='flex flex-col lg:flex-row items-center lg:items-end bg-slate-800 p-6 rounded-xl shadow-lg max-w-4xl w-full gap-8'>
            {/* Left: Album Cover */}
            <img
              src={track.album.images[0]?.url || '/placeholder-image.png'}
              alt={track.album.name}
              className='w-40 h-40 object-cover rounded-lg'
            />

            {/* Right: Track Info */}
            <div className='flex flex-col justify-end items-start text-left'>
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

          {/* Karaoke Lyrics Scroll Section */}
          <div className={'max-w-4xl w-full mt-4'}>
            <div className='bg-slate-800 rounded-lg p-6 h-[45vh] overflow-y-auto shadow-inner mt-4 justify-center'>
              <div className='space-y-6'>
                {/* Single line block */}
                <div>
                  <p className='text-white text-xl font-semibold leading-snug'>
                    Big body take both lanes
                  </p>
                  <p className='text-gray-400 text-md italic leading-tight'>
                    Gran cuerpo ocupa ambos carriles
                  </p>
                </div>

                <div>
                  <p className='text-white text-xl font-semibold leading-snug'>
                    Backseat blowin' propane
                  </p>
                  <p className='text-gray-400 text-md italic leading-tight'>
                    Asiento trasero soplando propano
                  </p>
                </div>

                <div>
                  <p className='text-white text-xl font-semibold leading-snug'>
                    All black, five gold chains
                  </p>
                  <p className='text-gray-400 text-md italic leading-tight'>
                    Todo negro, cinco cadenas de oro
                  </p>
                </div>

                <div>
                  <p className='text-white text-xl font-semibold leading-snug'>
                    Young rich bossed up on his own mayne
                  </p>
                  <p className='text-gray-400 text-md italic leading-tight'>
                    Joven rico que se hizo solo, compa
                  </p>
                </div>
              </div>
              {/* ...repeat for more lines */}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Control Bar */}
      <div className='fixed bottom-0 w-full bg-slate-900 p-5 z-50'>
        <div className='max-w-4xl mx-auto flex flex-col items-center justify-center'>
          {/* Control Buttons */}
          <div className='flex items-center justify-center gap-8'>
            <button
              className='text-gray-400 hover:text-white transition-colors cursor-pointer'
              onClick={() => console.log('Shuffle')}
            >
              <FaRandom size={16} />
            </button>
            <button
              className='text-gray-400 hover:text-white transition-colors cursor-pointer'
              onClick={() => console.log('Rewind')}
            >
              <FaStepBackward size={18} />
            </button>
            <button
              className='text-gray-400 hover:text-white transition-colors cursor-pointer'
              onClick={() => setPlaying(!playing)}
            >
              {playing ? <FaCirclePause size={24} /> : <FaPlayCircle size={24} />}
            </button>
            <button
              className='text-gray-400 hover:text-white transition-colors cursor-pointer'
              onClick={() => console.log('Fast Forward')}
            >
              <FaStepForward size={18} />
            </button>
            <button
              className='text-gray-400 hover:text-white transition-colors cursor-pointer'
              onClick={() => console.log('Repeat')}
            >
              <FaRepeat size={16} />
            </button>
          </div>

          {/* Progress bar */}
          <div className='w-full mt-4 flex justify-center'>
            <Progress
              value={40}
              className='h-1 bg-slate-700 w-full max-w-lg [&>div]:bg-white'
            />
          </div>
        </div>
      </div>
    </>
  )
}
