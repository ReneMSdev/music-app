This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## YourSound™: Real-Time Music Translation App

Understand music across borders.
YourSound™ connects to your Spotify Premium account and instantly translates the lyrics of songs you're currently listening to — all while preserving rhythm and flow. Whether you're learning a new language, exploring international artists, or just vibing to global sounds, YourSound™ makes it easier to feel the meaning behind the music.

## Features

✅ Built So Far

- User Authentication with Supabase (Sign Up / Login / OAuth)

- Spotify Integration (Premium only) using OAuth 2.0

- Recently Played Tracks pulled from your Spotify history

- Single Track View with front-end built for track player

- Responsive UI built with Tailwind CSS and shadcn/ui

🛠️ In Progress / To Do

- Lyric Fetching from selected tracks

- Language Translation of lyrics (choose your target language)

- Synced Playback + Translation Overlay (maintain rhythm/cadence)

## Screenshots

### Hero Landing Page

![Hero Screenshot][/screenshots/hero.png]

### SignUp Form

![Sign Up Screenshot][/screenshots/signup.png]

### Recently Played

![Recently Played Screenshot][/screenshots/recently-played.png]

### Single Track Player

![Single Track Screenshot][/screenshots/track-id.png]

## Project Structure Overview

This project follows a modular structure using Next.js App Router with organized folders for API routes, pages, components, and shared libraries:

- /app – Handles all routes and pages including:

  - /login, /signup, /profile, and /track/[id]

  - API routes under /api for Spotify and auth flows

- /components – Reusable UI and feature components, grouped by feature:

  - landing/, spotify/, layout/, profile/, and ui/

- /lib – Shared logic for:

  - Supabase client setup

  - Spotify API helpers

  - Auth utilities

- /utils/supabase – Server-side Supabase helpers and middleware

- middleware.ts – Used to protect routes and handle auth logic
