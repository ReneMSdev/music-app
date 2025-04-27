import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // not anon key
)

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get('code')
  if (!code) return NextResponse.json({ error: 'Missing code' }, { status: 400 })

  const client_id = process.env.SPOTIFY_CLIENT_ID!
  const client_secret = process.env.SPOTIFY_CLIENT_SECRET!
  const redirect_uri = process.env.SPOTIFY_REDIRECT_URI!

  const basicAuth = Buffer.from(`${client_id}:${client_secret}`).toString('base64')

  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basicAuth}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      code,
      redirect_uri,
    }),
  })

  const tokenData = await response.json()

  if (!tokenData.access_token) {
    console.error('Failed to get access token:', tokenData)
    return NextResponse.redirect('http://localhost:3000/login?error=spotify')
  }

  console.log('Got Spotify token data:', tokenData)

  // 🧠 Fetch current Supabase session
  const supabaseClient = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { auth: { persistSession: false } }
  )

  const {
    data: { session },
  } = await supabaseClient.auth.getSession()

  if (!session?.user?.id) {
    console.error('No active Supabase session found.')
    return NextResponse.redirect('http://localhost:3000/login?error=session')
  }

  const userId = session.user.id

  console.log('Updating user ID:', userId)

  // 🛠 Update user using ADMIN privileges
  const { error: updateError } = await supabaseAdmin.auth.admin.updateUserById(userId, {
    user_metadata: {
      spotify_access_token: tokenData.access_token,
      spotify_refresh_token: tokenData.refresh_token,
      spotify_expires_at: Math.floor(Date.now() / 1000) + tokenData.expires_in,
    },
  })

  if (updateError) {
    console.error('Failed to update user metadata:', updateError)
    return NextResponse.redirect('http://localhost:3000/login?error=update_metadata')
  }

  console.log('✅ Successfully updated user metadata')

  // Finally redirect to /loggedin clean
  return NextResponse.redirect('http://localhost:3000/loggedin')
}
