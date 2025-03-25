'use client'

import { useUser } from '@/lib/user-context'

export default function LoggedInHome() {
  const { user } = useUser()

  return (
    <div className='min-h-screen bg-black text-white flex items-center justify-center px-4'>
      <div className='text-center space-y-4'>
        <h1 className='text-5xl font-extrabold text-lime-400 animate:pulse'>
          NOW YOU&apos;RE IN 🎧🔥
        </h1>
        {user && <p className='text-xl'>Welcome, {user.user_metadata?.name || user.email}!</p>}
      </div>
    </div>
  )
}
