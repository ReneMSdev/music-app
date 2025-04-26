import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get('code')
  if (!code) return NextResponse.json({ error: 'Missing code' }, { status: 400 })

  const client_id = process.env.SPOTIFY_CLIENT_ID!
  const client_secret = process.env.SPOTIFY_CLIENT_SECRET!
  const redirect_uri = process.env.SPOTIFY_REDIRECT_URI!
  const basicAuth = Buffer.from(`${client_id}:${client_secret}`).toString('base64')

  const tokenRes = await fetch('https://accounts.spotify.com/api/token', {
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

  const tokenData = await tokenRes.json()

  if (
    tokenData.error ||
    !tokenData.access_token ||
    !tokenData.refresh_token ||
    !tokenData.expires_in
  ) {
    // Handle potential errors from Spotify or missing token data
    console.error('Spotify token error:', tokenData)
    // Redirect to an error page or back to login with an error message
    const errorUrl = new URL('/login', request.url)
    errorUrl.searchParams.set('error', 'spotify_token_error')
    return NextResponse.redirect(errorUrl)
  }

  // Construct the redirect URL with tokens as search parameters
  const redirectUrl = new URL('/loggedin', request.url)
  redirectUrl.searchParams.set('access_token', tokenData.access_token)
  redirectUrl.searchParams.set('refresh_token', tokenData.refresh_token)
  redirectUrl.searchParams.set('expires_in', tokenData.expires_in.toString()) // Ensure it's a string

  return NextResponse.redirect(redirectUrl)
}
