import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const accessToken = req.nextUrl.searchParams.get('access_token')

  if (!accessToken) {
    return NextResponse.json({ error: 'Missing access token' }, { status: 401 })
  }

  const response = await fetch('https://api.spotify.com/v1/me/player/recently-played?limit=20', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })

  if (!response.ok) {
    console.error('Error fetching recently played:', await response.text())
    return NextResponse.json({ error: 'Failed to fetch recently played' }, { status: 500 })
  }

  const data = await response.json()

  return NextResponse.json(data)
}
