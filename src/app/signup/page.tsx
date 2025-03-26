import { SignUpForm } from '@/app/signup/signup-form'

export default function Page() {
  return (
    <div
      className='flex min-h-svh w-full justify-center p-6 md:p-10'
      style={{
        backgroundImage: 'url(/img/water-bg.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className='w-full max-w-sm'>
        <SignUpForm />
      </div>
    </div>
  )
}
