'use client'

import { ReactNode } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { HomeIcon, UserIcon, LogInIcon } from 'lucide-react'

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div className='min-h-screen bg-gradient-to-br from-zinc-900 to-black text-white'>
      {/* Sticky Navbar */}
      <header className='sticky top-0 z-50 w-full bg-slate-900 backdrop-blur shadow-md'>
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
            <Button
              asChild
              variant='secondary'
              className='text-white'
            >
              <Link
                href='/login'
                className='bg-gradient-to-t from-red-700 to-orange-400 flex items-center gap-1 hover:brightness-130'
              >
                <LogInIcon className='w-4 h-4' /> <span>Login</span>
              </Link>
            </Button>
          </nav>
        </div>
      </header>

      <main>{children}</main>
    </div>
  )
}
