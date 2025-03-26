'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useUser } from '@/lib/user-context'

export default function LoggedInHome() {
  const { user } = useUser()
  const router = useRouter()

  useEffect(() => {
    if (user === null) router.push('/login')
  }, [user, router])

  // show nothing or a loading indicator while checking auth
  if (!user) return null

  return (
    <div className='min-h-screen bg-stone-900 text-white flex mt-[200px] justify-center px-4'>
      <div className='text-center space-y-4'>
        <h1 className='text-5xl font-extrabold text-lime-400 animate:pulse'>
          NOW YOU&apos;RE IN 🎧🔥
        </h1>
        {user && <h2 className='text-2xl'>Welcome, {user.user_metadata?.name || user.email}!</h2>}
      </div>
    </div>
  )
}
