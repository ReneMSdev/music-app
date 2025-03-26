'use client'

import AppLayout from '@/components/layout/AppLayout'
import { LandingHero } from '@/components/landing/LandingHero'
import LoggedInHome from '@/app/loggedin/page'
import { useUser } from '@/lib/user-context'

export default function Home() {
  const { user } = useUser()

  return <AppLayout>{user ? <LoggedInHome /> : <LandingHero />}</AppLayout>
}
