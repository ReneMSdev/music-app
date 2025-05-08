import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/utils/supabase/server'
import { refreshSpotifyAccessToken } from '@/lib/spotify'

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const supabase = await createServerSupabaseClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  let accessToken = user.user_metadata.spotify_access_token
  const refreshToken = user.user_metadata.spotify_refresh_token
  const expiresAt = user.user_metadata.spotify_expires_at
  const now = Math.floor(Date.now() / 1000)

  // Refresh token if expired
  if (!accessToken || now >= expiresAt) {
    try {
      const refreshed = await refreshSpotifyAccessToken(refreshToken)
      await supabase.auth.updateUser({
        data: {
          spotify_access_token: refreshed.access_token,
          spotify_expires_at: refreshed.expires_at,
        },
      })
      accessToken = refreshed.access_token
    } catch (err) {
      console.error('Failed to refresh Spotify token:', err)
      return NextResponse.json({ error: 'Token refresh failed' }, { status: 401 })
    }
  }

  // Fetch track from Spotify API
  const trackId = params.id
  const response = await fetch(`https://api.spotify.com/v1/tracks/${trackId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })

  const data = await response.json()

  if (!response.ok) {
    console.error('Spotify API error:', data)
    return NextResponse.json(
      { error: data?.error?.message || 'Spotify error' },
      { status: response.status }
    )
  }

  return NextResponse.json(data)
}
