import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const access_token = request.nextUrl.searchParams.get('access_token')
  if (!access_token) return NextResponse.json({ error: 'Missing access token' }, { status: 400 })

  const response = await fetch('https://api.spotify.com/v1/me/player/currently-playing', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${access_token}`,
      'Content-Type': 'application/json',
    },
  })

  const data = await response.json()
  return NextResponse.json(data)
}
