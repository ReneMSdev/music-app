import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get('code')
  const error = req.nextUrl.searchParams.get('error')

  if (error) {
    console.error('Error during Spotify authorization:', error)
    return NextResponse.redirect('http://localhost:3000/loggedin') // Redirect even if error
  }

  if (!code) {
    console.error('No code returned from Spotify')
    return NextResponse.redirect('http://localhost:3000/loggedin')
  }

  // Spotify credentials
  const clientId = process.env.SPOTIFY_CLIENT_ID!
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET!
  const redirectUri = process.env.SPOTIFY_REDIRECT_URI!

  const basicAuth = Buffer.from(`${clientId}:${clientSecret}`).toString('base64')

  const response = await fetch('https://accounts.spotify.com/api/token', {
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

  if (!response.ok) {
    console.error('Failed to exchange code for tokens')
    return NextResponse.redirect('http://localhost:3000/loggedin')
  }

  const tokenData = await response.json()

  console.log('Spotify tokenData:', tokenData)

  // Redirect back to /loggedin with tokens in URL
  return NextResponse.redirect(
    `http://localhost:3000/loggedin?access_token=${tokenData.access_token}&refresh_token=${tokenData.refresh_token}&expires_in=${tokenData.expires_in}`
  )
}
