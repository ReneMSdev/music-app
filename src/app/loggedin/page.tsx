'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useUser } from '@/lib/user-context'
import { LoadingSpinner } from '@/components/ui/loading-spinner'

export default function LoggedInHome() {
  const { user, loading } = useUser()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) router.push('/login')
  }, [user, loading, router])

  // show nothing or a loading indicator while checking auth
  if (loading) return <LoadingSpinner />

  console.log('User metadata:', user?.user_metadata)

  return (
    <div className='min-h-screen bg-stone-900 text-white flex mt-[200px] justify-center px-4'>
      <div className='text-center space-y-4'>
        <h1 className='text-5xl font-extrabold text-lime-400 animate:pulse'>
          NOW YOU&apos;RE IN 🎧🔥
        </h1>
        {user && (
          <h2 className='text-2xl'>Welcome, {user.user_metadata?.full_name || user.email}!</h2>
        )}
      </div>
    </div>
  )
}
