import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { createServerSupabaseClient } from '@/utils/supabase/server'

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // Needed to update user
)

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get('code')
  if (!code) return NextResponse.json({ error: 'Missing code' }, { status: 400 })

  const client_id = process.env.SPOTIFY_CLIENT_ID!
  const client_secret = process.env.SPOTIFY_CLIENT_SECRET!
  const redirectUri = process.env.SPOTIFY_REDIRECT_URI!

  const basicAuth = Buffer.from(`${client_id}:${client_secret}`).toString('base64')

  const tokenResponse = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basicAuth}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      code,
      redirect_uri: redirectUri,
    }),
  })

  const tokenData = await tokenResponse.json()

  if (!tokenData.access_token) {
    console.error('Failed to get access token:', tokenData)
    return NextResponse.redirect('/loggedin?error=spotify_token')
  }

  const supabase = await createServerSupabaseClient(request)

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    console.error('No Supabase user found.')
    return NextResponse.redirect(`${request.nextUrl.origin}/loggedin?error=no_user`)
  }

  const { error } = await supabaseAdmin.auth.admin.updateUserById(user.id, {
    user_metadata: {
      spotify_access_token: tokenData.access_token,
      spotify_refresh_token: tokenData.refresh_token,
      spotify_expires_at: Math.floor(Date.now() / 1000) + tokenData.expires_in,
    },
  })

  if (error) {
    console.error('Failed to update user metadata:', error)
    return NextResponse.redirect(`${request.nextUrl.origin}/loggedin?error=update_fail`)
  }

  return NextResponse.redirect(`${request.nextUrl.origin}/loggedin`)
}
