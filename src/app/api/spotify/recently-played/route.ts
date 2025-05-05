import { NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/utils/supabase/server'
import { refreshSpotifyAccessToken } from '@/lib/spotify'

export async function GET() {
  const supabase = await createServerSupabaseClient()

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  if (error || !user) {
    console.error('Supabase session error:', error)
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  let accessToken = user.user_metadata.spotify_access_token
  const refreshToken = user.user_metadata.spotify_refresh_token
  const expiresAt = user.user_metadata.spotify_expires_at

  const now = Math.floor(Date.now() / 1000)

  // Check if token is expired or missing
  if (!accessToken || now >= expiresAt) {
    console.log('🔁 Spotify access token expired. Refreshing...')

    try {
      const refreshed = await refreshSpotifyAccessToken(refreshToken)

      // Update user_metadata with new token & expiry
      await supabase.auth.updateUser({
        data: {
          spotify_access_token: refreshed.access_token,
          spotify_expires_at: refreshed.expires_at,
        },
      })

      accessToken = refreshed.access_token
      console.log('✅ Refreshed access token')
    } catch (refreshError) {
      console.error('❌ Failed to refresh Spotify token:', refreshError)
      return NextResponse.json({ error: 'Failed to refresh Spotify access token' }, { status: 401 })
    }
  }

  // Fetch recently played from Spotify
  const response = await fetch('https://api.spotify.com/v1/me/player/recently-played?limit=20', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })

  const data = await response.json()

  if (!response.ok) {
    console.error('Spotify API error:', data)
    return NextResponse.json(
      { error: data.error?.message || 'Spotify API error' },
      { status: response.status }
    )
  }

  return NextResponse.json(data)
}
