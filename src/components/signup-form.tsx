'use client'

import { useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { signup } from '@/lib/auth'
import { toast } from 'react-toastify'
import Link from 'next/link'
import { useState } from 'react'
import { Spinner } from '@/components/ui/spinner'

export function SignUpForm({ className, ...props }: React.ComponentProps<'div'>) {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const form = e.currentTarget as HTMLFormElement
    const name = (form.elements.namedItem('name') as HTMLInputElement).value
    const email = (form.elements.namedItem('email') as HTMLInputElement).value
    const password = (form.elements.namedItem('password') as HTMLInputElement).value

    const { error } = await signup(name, email, password)

    setLoading(false)

    if (error) toast.error(error.message)
    else {
      toast.success('Check your email to confirm your account ✉️')
      router.push('/loggedin')
    }
  }

  return loading ? (
    <div className='flex h-screen w-full items-center justify-center'>
      <Spinner size='xxl' />
    </div>
  ) : (
    <div
      className={cn(' flex flex-col items-center justify-center min-h-screen  px-4', className)}
      {...props}
    >
      <Card className='w-full bg-slate-900 text-white border-2 border-orange-500'>
        <CardHeader>
          <CardTitle className='text-center text-2xl font-extrabold '>
            Create your account
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSignUp}>
            <div className='flex flex-col gap-7'>
              <div className='grid gap-3'>
                <Label
                  htmlFor='name'
                  className='font-bold'
                >
                  Name
                </Label>
                <Input
                  id='name'
                  type='text'
                  placeholder='What do you want us to call you?'
                  required
                />
              </div>
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
                  placeholder='email@example.com'
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
                </div>
                <Input
                  id='password'
                  type='password'
                  placeholder='Dont forget this one :)'
                  required
                />
              </div>
              <div className='flex flex-col gap-3 mt-3'>
                <Button
                  type='submit'
                  disabled={loading}
                  className='w-full font-bold bg-slate-500 hover:bg-slate-600 cursor-pointer disabled:opacity-50'
                >
                  Sign Up
                </Button>
                <Button
                  className='w-full text-white font-bold bg-green-500 hover:bg-green-600 cursor-pointer'
                  asChild
                >
                  <a href='/api/auth'>Sign Up with Spotify</a>
                </Button>
                <Button
                  type='button'
                  variant='outline'
                  className='w-full text-white font-bold bg-blue-500 hover:bg-blue-600 hover:text-white cursor-pointer border-none'
                >
                  Sign Up with Google
                </Button>
              </div>
            </div>
            <div className='mt-6 mb-2 text-center text-sm'>
              Already have an account?{' '}
              <Link
                href='/login'
                className='font-bold underline decoration-2 underline-offset-5 hover:text-orange-500'
              >
                Login
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
