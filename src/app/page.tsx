import { Button } from '@/components/ui/button'
import { HomeIcon, UserIcon, LogInIcon } from 'lucide-react'
import Link from 'next/link'

export default function Home() {
  return (
    <div className='min-h-screen bg-gradient-to-br from-zinc-900 to-black text-white'>
      {/* Sticky Navbar */}
      <header className='sticky top-0 z-50 w-full bg-black/70 backdrop-blur border-b border-zinc-800 shadow-md'>
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
              className='text-amber-300 flex items-center gap-1 hover:text-amber-400'
            >
              <HomeIcon className='w-5 h-5' /> <span>Home</span>
            </Link>
            <Link
              href='/profile'
              className='text-amber-300 flex items-center gap-1 hover:text-amber-400'
            >
              <UserIcon className='w-5 h-5' /> <span>Profile</span>
            </Link>
            <Button
              asChild
              variant='secondary'
              className='text-white border-white hover:bg-lime-500'
            >
              <Link
                href='/login'
                className='bg-gradient-to-t from-red-700 to-orange-400 flex items-center gap-1'
              >
                <LogInIcon className='w-4 h-4' /> <span>Login</span>
              </Link>
            </Button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section
        className='relative w-full min-h-[calc(100vh-72px)] bg-cover bg-center px-6 pt-[150px] flex justify-center text-center'
        style={{ backgroundImage: "url('/img/hero.jpg')" }}
      >
        <div className='p-6 rounded-xl max-w-3xl'>
          <h2 className='text-4xl md:text-5xl font-extrabold mb-6'>The world of music is yours!</h2>
          <h3 className='font-bold text-lg md:text-xl text-zinc-300 mb-9 italic'>
            Translate any song. Understand every verse.
          </h3>
          <Button
            size='lg'
            className='w-48 bg-gradient-to-t from-red-700 to-orange-400 text-white font-bold hover:brightness-110 cursor-pointer'
          >
            Get Started
          </Button>
        </div>
      </section>
    </div>
  )
}
