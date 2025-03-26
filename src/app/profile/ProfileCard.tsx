'use client'

import { useUser } from '@/lib/user-context'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Input } from '@/components/ui/input'

export default function ProfileCard() {
  const { user } = useUser()
  const name = user?.user_metadata?.full_name || 'No Name'
  const email = user?.email || 'No Email'
  const avatarUrl = user?.user_metadata?.avatar_url

  return (
    <div className='flex justify-center mt-12 px-4'>
      <Card className='w-full max-w-md bg-slate-900 text-slate-300 border-2 border-orange-500'>
        <CardHeader>
          <div className='flex flex-col items-center gap-4'>
            <Avatar className='w-16 h-16'>
              <AvatarImage
                src={avatarUrl}
                alt={name}
              />
              <AvatarFallback className='bg-orange-400 text-2xl text-bold'>
                {name[0]}
              </AvatarFallback>
            </Avatar>
          </div>
        </CardHeader>

        <CardContent className='space-y-4 mb-3'>
          <div>
            <label className='block text-md font-bold mb-2'>Name</label>
            <Input
              value={name}
              readOnly
              className='bg-slate-800 text-white border-none'
            />
          </div>
          <div>
            <label className='block text-md font-bold mb-2'>Email</label>
            <Input
              value={email}
              readOnly
              className='bg-slate-800 text-white border-none'
            />
          </div>
          <div>
            <label className='block text-md font-bold mb-2'>Password</label>
            <Input
              value='******'
              readOnly
              className='bg-slate-800 text-white border-none'
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
