'use client'

import { useUser } from '@/lib/user-context'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import ProfileCard from './ProfileCard'

export default function ProfilePage() {
  const { user } = useUser()
  const router = useRouter()

  useEffect(() => {
    if (user === null) router.push('/login')
  }, [user, router])

  if (!user) return null // or loading spinner

  return (
    <>
      <div className='min-h-screen flex flex-col bg-stone-900 text-slate-300 mt-[100px]'>
        <div className='text-center space-y-4'>
          <h1 className='text-4xl font-bold'>Profile</h1>
        </div>
        <ProfileCard />
      </div>
    </>
  )
}
