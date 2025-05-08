export async function refreshSpotifyAccessToken(refresh_token: string) {
  const client_id = process.env.SPOTIFY_CLIENT_ID!
  const client_secret = process.env.SPOTIFY_CLIENT_SECRET!

  const basicAuth = Buffer.from(`${client_id}:${client_secret}`).toString('base64')

  const res = await fetch('https://accounts.spotify.com/api/token', {
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

  const data = await res.json()

  if (!res.ok) {
    throw new Error(data.error_description || 'Failed to refresh token')
  }

  return {
    access_token: data.access_token,
    expires_at: Math.floor(Date.now() / 1000) + data.expires_in,
  }
}
