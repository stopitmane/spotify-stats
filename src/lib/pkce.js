export async function generatePKCE() {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  const verifier = btoa(String.fromCharCode(...array))
    .replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');

  const data = new TextEncoder().encode(verifier);
  const digest = await crypto.subtle.digest('SHA-256', data);
  const challenge = btoa(String.fromCharCode(...new Uint8Array(digest)))
    .replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');

  return { verifier, challenge };
}

export function buildAuthUrl(clientId, redirectUri, challenge) {
  const scopes = [
    'user-top-read',
    'user-read-recently-played',
    'user-read-private',
    'user-read-email',
  ].join(' ');

  const params = new URLSearchParams({
    client_id:             clientId,
    response_type:         'code',
    redirect_uri:          redirectUri,
    scope:                 scopes,
    code_challenge_method: 'S256',
    code_challenge:        challenge,
  });

  return `https://accounts.spotify.com/authorize?${params}`;
}

export async function exchangeToken(code, verifier, clientId, redirectUri) {
  const body = new URLSearchParams({
    grant_type:    'authorization_code',
    code,
    redirect_uri:  redirectUri,
    client_id:     clientId,
    code_verifier: verifier,
  });

  const res = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body,
  });
  if (!res.ok) throw new Error('Token exchange failed');
  return res.json();
}

export async function refreshToken(clientId, refreshTkn) {
  const body = new URLSearchParams({
    grant_type:    'refresh_token',
    refresh_token: refreshTkn,
    client_id:     clientId,
  });
  const res = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body,
  });
  if (!res.ok) throw new Error('Token refresh failed');
  return res.json();
}
