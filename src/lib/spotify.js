const BASE = 'https://api.spotify.com/v1';

async function get(endpoint, token) {
  const res = await fetch(`${BASE}${endpoint}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (res.status === 401) throw new Error('TOKEN_EXPIRED');
  if (!res.ok) throw new Error(`Spotify API error: ${res.status}`);
  return res.json();
}

export const spotify = {
  me:             (t) => get('/me', t),
  topTracks:      (t, range = 'short_term', limit = 10) => get(`/me/top/tracks?time_range=${range}&limit=${limit}`, t),
  topArtists:     (t, range = 'short_term', limit = 10) => get(`/me/top/artists?time_range=${range}&limit=${limit}`, t),
  recentlyPlayed: (t, limit = 15) => get(`/me/player/recently-played?limit=${limit}`, t),
};
