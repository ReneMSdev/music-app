'use client'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useState } from 'react'
import { Spinner } from '@/components/ui/spinner'
import { toast } from 'react-toastify'
import { login } from '@/lib/auth'
import { useRouter } from 'next/navigation'

export function LoginForm({ className, ...props }: React.ComponentProps<'div'>) {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const form = e.currentTarget as HTMLFormElement
    const email = (form.elements.namedItem('email') as HTMLInputElement).value
    const password = (form.elements.namedItem('password') as HTMLInputElement).value

    const { error } = await login(email, password)

    setLoading(false)

    if (error) toast.error(error.message)
    else {
      router.push('/')
    }
  }

  return loading ? (
    <div className='flex h-screen w-full items-center justify-center'>
      <Spinner size='xxl' />
    </div>
  ) : (
    <div
      className={cn('mt-[80px] flex flex-col items-center px-4', className)}
      {...props}
    >
      <Card className='w-full bg-slate-900 text-white border-2 border-orange-500'>
        <CardHeader>
          <CardTitle className='text-center text-2xl font-extrabold '>
            Login to your account
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin}>
            <div className='flex flex-col gap-4'>
              <div className='grid gap-3'>
                <Label
                  className='font-bold'
                  htmlFor='email'
                >
                  Email
                </Label>
                <Input
                  id='email'
                  type='email'
                  placeholder='m@example.com'
                  required
                />
              </div>
              <div className='grid gap-3'>
                <div className='flex items-center'>
                  <Label
                    htmlFor='password'
                    className='font-bold'
                  >
                    Password
                  </Label>
                  <a
                    href='#'
                    className='ml-auto inline-block text-sm font-bold underline-offset-5 hover:underline hover:decoration-2 hover:text-orange-500'
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input
                  id='password'
                  type='password'
                  placeholder='Do you remember ...'
                  required
                />
              </div>
              <div className='flex flex-col gap-3 mt-1'>
                <Button
                  type='submit'
                  className='w-full font-bold bg-slate-500 hover:bg-slate-600 cursor-pointer'
                >
                  Login
                </Button>
                <h2 className='my-2'>Or login with one of the following:</h2>
                <Button
                  className='w-full text-white font-bold bg-green-500 hover:bg-green-600 cursor-pointer'
                  asChild
                >
                  <a href='/api/auth'>Login with Spotify</a>
                </Button>
                <Button
                  type='button'
                  variant='outline'
                  className='w-full text-white font-bold bg-blue-500 hover:bg-blue-600 hover:text-white cursor-pointer border-none'
                >
                  Login with Google
                </Button>
              </div>
            </div>
            <div className='mt-6 mb-2 text-center text-sm'>
              Don&apos;t have an account?{' '}
              <a
                href='/signup'
                className='font-bold underline decoration-2 underline-offset-5 hover:text-orange-500'
              >
                Sign up
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
