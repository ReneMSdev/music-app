'use client'

import { useUser } from '@/lib/user-context'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import ProfileCard from './ProfileCard'
import { LoadingSpinner } from '@/components/ui/loading-spinner'

export default function ProfilePage() {
  const { user, loading } = useUser()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) router.push('/login')
  }, [user, loading, router])

  if (loading) return <LoadingSpinner />

  return (
    <>
      <div className='min-h-screen flex flex-col bg-stone-900 text-slate-300 mt-[100px]'>
        <ProfileCard />
      </div>
    </>
  )
}
