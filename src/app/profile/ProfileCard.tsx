'use client'

import { useState } from 'react'
import { useUser } from '@/lib/user-context'
import { supabase } from '@/lib/supabase'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { toast } from 'react-toastify'

export default function ProfileCard() {
  const { user } = useUser()
  const initialFullName = user?.user_metadata?.full_name || ''
  const initialEmail = user?.email || ''

  const [editMode, setEditMode] = useState(false)
  const [fullName, setFullName] = useState(user?.user_metadata?.full_name || '')
  const [email, setEmail] = useState(user?.email || '')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const avatarUrl = user?.user_metadata?.avatar_url

  const handleSave = async () => {
    if (password && password !== confirmPassword) {
      toast.error('Passwords do not match')
      return
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

  const handleCancel = () => {
    setFullName(initialFullName)
    setEmail(initialEmail)
    setPassword('')
    setConfirmPassword('')
    setEditMode(false)
  }

  return (
    <div className='flex justify-center mt-12 px-4'>
      <Card className='w-full max-w-md bg-slate-900 text-slate-300 border-2 border-orange-500 py-6'>
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
            <label className='block text-md font-bold mb-2'>
              {editMode ? 'New Password' : 'Current Password'}
            </label>
            <div className='relative'>
              <Input
                type={'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                readOnly={!editMode}
                className='bg-slate-800 text-white border-none'
                placeholder='••••••••'
              />
            </div>
          </div>

          {editMode && (
            <div>
              <label className='block text-md font-bold mb-2'>Confirm Password</label>
              <Input
                type='password'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className='bg-slate-800 text-white border-none'
                placeholder='••••••••'
              />
            </div>
          )}

          <div className='flex justify-center gap-4'>
            {editMode ? (
              <>
                <Button
                  onClick={handleSave}
                  className='bg-green-500 text-white w-1/3 mt-3 hover:bg-green-700 cursor-pointer'
                >
                  Save
                </Button>
                <Button
                  onClick={handleCancel}
                  className='bg-gray-600 text-white w-1/3 mt-3 hover:bg-gray-700'
                >
                  Cancel
                </Button>
              </>
            ) : (
              <Button
                onClick={() => setEditMode(true)}
                className='bg-orange-500 text-white w-1/3 mt-3 hover:bg-orange-700 cursor-pointer'
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
