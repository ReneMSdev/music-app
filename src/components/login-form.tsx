import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export function LoginForm({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      className={cn('flex flex-col gap-6', className)}
      {...props}
    >
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>Enter your email below to login to your account</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className='flex flex-col gap-6'>
              <div className='grid gap-3'>
                <Label htmlFor='email'>Email</Label>
                <Input
                  id='email'
                  type='email'
                  placeholder='m@example.com'
                  required
                />
              </div>
              <div className='grid gap-3'>
                <div className='flex items-center'>
                  <Label htmlFor='password'>Password</Label>
                  <a
                    href='#'
                    className='ml-auto inline-block text-sm underline-offset-4 hover:underline'
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input
                  id='password'
                  type='password'
                  required
                />
              </div>
              <div className='flex flex-col gap-3'>
                <Button
                  type='submit'
                  className='w-full font-bold bg-slate-500 hover:bg-slate-700 cursor-pointer'
                >
                  Login
                </Button>
                <Button
                  className='w-full text-white font-bold bg-green-500 hover:bg-green-600 cursor-pointer'
                  asChild
                >
                  <a href='/api/auth'>Login with Spotify</a>
                </Button>
                <Button
                  type='button'
                  variant='outline'
                  className='w-full text-white font-bold bg-blue-500 hover:bg-blue-600 hover:text-white cursor-pointer'
                >
                  Login with Google
                </Button>
              </div>
            </div>
            <div className='mt-4 text-center text-sm'>
              Don&apos;t have an account?{' '}
              <a
                href='#'
                className='font-bold underline underline-offset-4 hover:text-green-600'
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
