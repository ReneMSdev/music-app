'use client'

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useState } from 'react'

export default function EditProfileModal({
  isOpen,
  onClose,
  initialName,
}: {
  isOpen: boolean
  onClose: () => void
  initialName: string
}) {
  const [name, setName] = useState(initialName)

  const handleSave = () => {
    // Add Supabase logic here
    onClose()
  }

  return (
    <Dialog
      open={isOpen}
      onOpenChange={onClose}
    >
      <DialogContent className='bg-slate-900 text-slate-300'>
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
        </DialogHeader>
        <div className='space-y-4'>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder='Name'
          />
          <Button
            onClick={handleSave}
            className='w-full bg-orange-500 text-white'
          >
            Save Changes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
