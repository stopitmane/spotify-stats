# 🎵 Spotify Stats Dashboard

A sleek, editorial-style Spotify analytics dashboard. Built with **React + Vite**, using the **Spotify Web API** and **PKCE OAuth** — no backend needed.

---

## ✨ Features
- 🔐 Spotify PKCE OAuth (client-side only, no secret exposed)
- 🎵 Top Tracks — 4 weeks / 6 months / all time
- 🎤 Top Artists — with popularity rings and follower counts
- 🕐 Recently Played — with relative timestamps
- 📊 Stats summary — avg popularity, top genre
- 🔄 Auto token refresh
- 🌑 Dark editorial design with Syne typography

---

## 🚀 Local Development

```bash
npm install
cp .env.example .env      # add your Spotify Client ID
npm run dev               # http://localhost:5173
```

---

## ☁️ Deploy to Vercel

### Step 1 — Create a Spotify App
1. Go to [developer.spotify.com/dashboard](https://developer.spotify.com/dashboard)
2. Click **Create App**
3. Fill in:
   - App name: `Spotify Stats`
   - Redirect URI: `https://your-app.vercel.app` *(add this AFTER you deploy)*
4. Save → copy your **Client ID**

### Step 2 — Deploy to Vercel
1. Push this folder to GitHub
2. Go to [vercel.com](https://vercel.com) → New Project → Import repo
3. Add environment variable:
   - `VITE_SPOTIFY_CLIENT_ID` → paste your Client ID
4. Click **Deploy** → copy the Vercel URL (e.g. `https://spotify-stats-jade.vercel.app`)

### Step 3 — Add Redirect URI to Spotify
1. Back in Spotify Developer Dashboard → your app → Edit Settings
2. Add your Vercel URL to **Redirect URIs** → Save

### Done! 🎉 Visit your Vercel URL and click "Connect Spotify"

---

## 🛠️ Tech Stack
| | |
|---|---|
| Framework | React 18 + Vite |
| Auth | Spotify PKCE OAuth (RFC 7636) |
| API | Spotify Web API |
| Fonts | Syne + DM Mono + Plus Jakarta Sans |
| Deploy | Vercel |

---

Built by **Ajayi Taiwo John** — [github.com/stopitmane](https://github.com/stopitmane) · [groovyjwttp-portfolio.vercel.app](https://groovyjwttp-portfolio.vercel.app)
