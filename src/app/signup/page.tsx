import { SignUpForm } from '@/app/signup/signup-form'

export default function Page() {
  return (
    <div className='bg-stone-900 flex min-h-svh w-full justify-center p-6 md:p-10'>
      <div className='w-full max-w-sm'>
        <SignUpForm />
      </div>
    </div>
  )
}
