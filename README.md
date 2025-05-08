This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## YourSound™: Real-Time Music Translation App

Understand music across borders.
YourSound™ connects to your Spotify Premium account and instantly translates the lyrics of songs you're currently listening to — all while preserving rhythm and flow. Whether you're learning a new language, exploring international artists, or just vibing to global sounds, YourSound™ makes it easier to feel the meaning behind the music.

## Features

✅ Built So Far

* User Authentication with Supabase (Sign Up / Login / OAuth)

* Spotify Integration (Premium only) using OAuth 2.0

* Recently Played Tracks pulled from your Spotify history

* Single Track View with front-end built for track player

* Responsive UI built with Tailwind CSS and shadcn/ui

🛠️ In Progress / To Do
* Lyric Fetching from selected tracks

* Language Translation of lyrics (choose your target language)

* Synced Playback + Translation Overlay (maintain rhythm/cadence)

## Project Structure (Partial)
<pre> src/ ├── app/ │ ├── api/ │ │ ├── auth/route.ts │ │ └── spotify/ │ │ ├── callback/route.ts │ │ ├── login/route.ts │ │ ├── playing/route.ts │ │ ├── recently-played/route.ts │ │ └── track/[id]/route.ts │ ├── login/ │ │ ├── login-form.tsx │ │ └── page.tsx │ ├── signup/ │ │ ├── signup-form.tsx │ │ └── page.tsx │ ├── track/[id]/page.tsx │ ├── loggedin/page.tsx │ ├── profile/ │ │ ├── ProfileCard.tsx │ │ └── page.tsx │ └── page.tsx (Landing) ├── components/ │ ├── landing/LandingHero.tsx │ ├── spotify/RecentlyPlayed.tsx │ ├── layout/ │ │ ├── AppLayout.tsx │ │ └── Navbar.tsx │ ├── profile/EditProfileModal.tsx │ └── ui/ │ ├── button.tsx │ ├── card.tsx │ ├── input.tsx │ ├── dialog.tsx │ ├── loading-spinner.tsx │ └── avatar.tsx ├── lib/ │ ├── auth.ts │ ├── spotify.ts │ ├── supabase.ts │ ├── user-context.tsx │ └── utils.ts ├── middleware.ts └── utils/supabase/ ├── client.ts ├── middleware.ts └── server.ts </pre>
