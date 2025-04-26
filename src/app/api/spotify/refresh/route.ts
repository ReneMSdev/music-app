import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const { refresh_token } = await req.json()

  if (!refresh_token) {
    return NextResponse.json({ error: 'Missing refresh_token' }, { status: 400 })
  }

  const clientId = process.env.SPOTIFY_CLIENT_ID!
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET!

  const basicAuth = Buffer.from(`${clientId}:${clientSecret}`).toString('base64')

  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basicAuth}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token,
    }),
  })

  if (!response.ok) {
    console.error('Failed to refresh Spotify token')
    return NextResponse.json({ error: 'Failed to refresh token' }, { status: 500 })
  }

  const tokenData = await response.json()

  return NextResponse.json(tokenData)
}
