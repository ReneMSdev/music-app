'use client'

import { useEffect, useState } from 'react'
import { Spinner } from '@/components/ui/spinner'

export default function SpinnerTest() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 3000) // 3 seconds

    return () => clearTimeout(timer)
  }, [])

  return loading ? (
    <div className='flex h-screen w-full items-center justify-center bg-black'>
      <Spinner size='xxl' />
    </div>
  ) : (
    <div className='flex h-screen items-center justify-center text-white bg-black'>
      <h1 className='text-2xl font-bold'>Loaded! 🎉</h1>
    </div>
  )
}
