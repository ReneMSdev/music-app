'use client'

import { useState } from 'react'
import { useUser } from '@/lib/user-context'
import { supabase } from '@/lib/supabase'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { toast } from 'react-toastify'
import { Eye, EyeOff } from 'lucide-react'

export default function ProfileCard() {
  const { user } = useUser()
  const [editMode, setEditMode] = useState(false)
  const [fullName, setFullName] = useState(user?.user_metadata?.full_name || '')
  const [email, setEmail] = useState(user?.email || '')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const avatarUrl = user?.user_metadata?.avatar_url

  const handleSave = async () => {
    const updates: any = {
      email,
      data: {
        full_name: fullName,
      },
    }

    // only send password if it's been changed
    if (password) updates.password = password

    const { error } = await supabase.auth.updateUser(updates)

    if (error) toast.error(error.message)
    else {
      toast.success('Profile updated!')
      setEditMode(false)
    }
  }

  return (
    <div className='flex justify-center mt-12 px-4'>
      <Card className='w-full max-w-md bg-slate-900 text-slate-300 border-2 border-orange-500'>
        <CardHeader>
          <CardTitle className='text-3xl'>Profile</CardTitle>
          <div className='flex flex-col items-center gap-4'>
            <Avatar className='w-16 h-16'>
              <AvatarImage
                src={avatarUrl}
                alt={fullName}
              />
              <AvatarFallback className='bg-orange-400 text-2xl text-bold'>
                {fullName[0]}
              </AvatarFallback>
            </Avatar>
          </div>
        </CardHeader>

        <CardContent className='space-y-4 mb-3'>
          <div>
            <label className='block text-md font-bold mb-2'>Name</label>
            <Input
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              readOnly={!editMode}
              className='bg-slate-800 text-white border-none'
            />
          </div>
          <div>
            <label className='block text-md font-bold mb-2'>Email</label>
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              readOnly={!editMode}
              className='bg-slate-800 text-white border-none'
            />
          </div>
          <div>
            <label className='block text-md font-bold mb-2'>Password</label>
            <div className='relative'>
              <Input
                type={showPassword ? 'text' : 'password'}
                value={editMode ? password : '******'}
                onChange={(e) => setPassword(e.target.value)}
                readOnly={!editMode}
                className='bg-slate-800 text-white border-none'
                placeholder='••••••••'
              />
              <button
                type='button'
                onClick={() => setShowPassword(!showPassword)}
                className='absolute right-4 top-1/2 transform -translate-y-1/2 hover:text-orange-400 cursor-pointer'
              >
                {showPassword ? <EyeOff className='w-6 h-6' /> : <Eye className='w-6 h-6' />}
              </button>
            </div>
          </div>

          <div className='flex justify-center'>
            {editMode ? (
              <Button
                onClick={handleSave}
                className='bg-green-500 text-white w-1/2 mt-3 hover:bg-green-700 cursor-pointer'
              >
                Save
              </Button>
            ) : (
              <Button
                onClick={() => setEditMode(true)}
                className='bg-orange-500 text-white w-1/2 mt-3 hover:bg-orange-700 cursor-pointer'
              >
                Edit Profile
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
