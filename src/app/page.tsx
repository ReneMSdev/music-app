'use client'

import { Button } from '@/components/ui/button'
import { LoginForm } from '@/components/login-form'

export default function Home() {
  return (
    <main className='flex flex-col items-center justify-center min-h-screen p-4 text-center'>
      <h1 className='text-4xl font-bold mb-4'>Spotify Lyrics Translator</h1>
      <p className='mb-8'>
        Translate song lyrics in real time as you listen to your favorite music!
      </p>

      <div className='w-full max-w-md mb-8'>
        <LoginForm />
      </div>
    </main>
  )
}
