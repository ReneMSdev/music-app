import { createServerSupabaseClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import ProfileCard from './ProfileCard'

export default async function ProfilePage() {
  const supabase = createServerSupabaseClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  return (
    <div className='min-h-screen flex flex-col bg-stone-900 text-slate-300 mt-[100px]'>
      <ProfileCard />
    </div>
  )
}
