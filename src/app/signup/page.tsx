import { SignUpForm } from '@/components/signup-form'
import Link from 'next/link'
import { FaArrowLeft } from 'react-icons/fa'
import { Button } from '@/components/ui/button'

export default function Page() {
  return (
    <div
      className='flex min-h-svh w-full items-center justify-center p-6 md:p-10'
      style={{
        backgroundImage: 'url(/img/water-bg.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className='w-full max-w-sm'>
        <SignUpForm />
      </div>

      {/* Back to Home Button */}
      <div className='absolute top-6 left-6'>
        <Button
          asChild
          className='bg-gradient-to-t from-red-700 to-orange-400 flex items-center gap-1 hover:brightness-130'
        >
          <Link href='/'>
            <FaArrowLeft className='text-lg' />
            <span>Back to Home</span>
          </Link>
        </Button>
      </div>
    </div>
  )
}
