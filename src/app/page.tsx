import Image from 'next/image'

export default function Home() {
  return (
    <main className='flex flex-col items-center justify-center min-h-screen p-4 text-center'>
      <h1 className='text-4xl font-bold mb-4'>Spotify Lyrics Translator</h1>
      <p className='mb-8'>Translate lyrics in real time as you listen 🎶</p>
      <a
        href='/api/auth'
        className='bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition'
      >
        Log in with Spotify
      </a>
    </main>
  )
}
