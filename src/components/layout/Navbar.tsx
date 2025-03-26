'use client'

import Link from 'next/link'
import { HomeIcon, UserIcon, LogInIcon, LogOutIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useUser } from '@/lib/user-context'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

export default function Navbar() {
  const { user } = useUser()
  const router = useRouter()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/')
  }

  return (
    <header className='fixed top-0 z-50 w-full bg-slate-900 backdrop-blur shadow-md'>
      <div className='mx-auto flex items-center justify-between px-6 py-4 max-w-7xl'>
        <Link
          href='/'
          className='text-2xl font-bold tracking-tight transition-all duration-300 bg-gradient-to-t from-red-700 to-orange-400 bg-clip-text text-transparent hover:drop-shadow-[0_0_10px_#f97316] cursor-pointer'
        >
          YourSound<span className='text-sm align-top ml-1'>™</span>
        </Link>
        <nav className='flex items-center gap-6'>
          <Link
            href='/'
            className='font-bold text-orange-500 flex items-center gap-1 hover:text-orange-300'
          >
            <HomeIcon className='w-5 h-5' /> <span>Home</span>
          </Link>
          <Link
            href='/profile'
            className='font-bold text-orange-500 flex items-center gap-1 hover:text-orange-300'
          >
            <UserIcon className='w-5 h-5' /> <span>Profile</span>
          </Link>

          {user ? (
            <Button
              onClick={handleLogout}
              className='bg-gradient-to-t from-red-700 to-orange-400 flex items-center gap-1 hover:brightness-130 text-white cursor-pointer'
              variant='secondary'
            >
              <LogOutIcon className='w-4 h-4' /> <span>Logout</span>
            </Button>
          ) : (
            <Button
              asChild
              variant='secondary'
              className='text-white'
            >
              <Link
                href='/login'
                className='bg-gradient-to-t from-red-700 to-orange-400 flex items-center gap-1 hover:brightness-130 cursor-pointer'
              >
                <LogInIcon className='w-4 h-4' /> <span>Login</span>
              </Link>
            </Button>
          )}
        </nav>
      </div>
    </header>
  )
}
