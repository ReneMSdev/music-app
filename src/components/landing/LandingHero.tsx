'use client'

import { Button } from '@/components/ui/button'
import Link from 'next/link'

export function LandingHero() {
  return (
    <section
      className='mt-9 relative w-full min-h-[100vh] bg-cover bg-center px-6 pt-[130px] flex justify-center text-center'
      style={{ backgroundImage: "url('/img/hero.jpg')" }}
    >
      <div className='p-6 rounded-xl max-w-3xl'>
        <h2 className='text-5xl md:text-5xl font-extrabold mb-6'>The world of music is yours!</h2>
        <h3 className='font-bold text-xl md:text-2xl text-zinc-300 mb-9 italic'>
          Translate any song. Understand every verse.
        </h3>
        <Button
          asChild
          size='lg'
          className='w-64 bg-gradient-to-t from-red-700 to-orange-400 text-white font-extrabold hover:brightness-110 cursor-pointer'
        >
          <Link href={'/signup'}>Get The Party Started</Link>
        </Button>
      </div>
    </section>
  )
}
