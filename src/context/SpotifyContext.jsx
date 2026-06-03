import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { generatePKCE, buildAuthUrl, exchangeToken, refreshToken } from '../lib/pkce';
import { spotify } from '../lib/spotify';

const CLIENT_ID   = import.meta.env.VITE_SPOTIFY_CLIENT_ID || '';
const REDIRECT    = window.location.origin;

const Ctx = createContext(null);

export function SpotifyProvider({ children }) {
  const [token,   setToken]   = useState(() => localStorage.getItem('sp_token')   || null);
  const [refresh, setRefresh] = useState(() => localStorage.getItem('sp_refresh') || null);
  const [user,    setUser]    = useState(null);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(null);

  /* ── Persist tokens ── */
  const saveTokens = (access, ref) => {
    setToken(access);
    if (ref) { setRefresh(ref); localStorage.setItem('sp_refresh', ref); }
    localStorage.setItem('sp_token', access);
  };

  /* ── Refresh access token ── */
  const doRefresh = useCallback(async () => {
    if (!refresh) return false;
    try {
      const data = await refreshToken(CLIENT_ID, refresh);
      saveTokens(data.access_token, data.refresh_token || refresh);
      return data.access_token;
    } catch { return false; }
  }, [refresh]);

  /* ── Handle OAuth callback ── */
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code   = params.get('code');
    if (!code) { setLoading(false); return; }

    const verifier = sessionStorage.getItem('sp_verifier');
    if (!verifier)  { setLoading(false); return; }

    exchangeToken(code, verifier, CLIENT_ID, REDIRECT)
      .then(data => {
        saveTokens(data.access_token, data.refresh_token);
        sessionStorage.removeItem('sp_verifier');
        window.history.replaceState({}, '', '/');
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  /* ── Load user profile ── */
  useEffect(() => {
    if (!token) { setLoading(false); return; }
    spotify.me(token)
      .then(setUser)
      .catch(async (err) => {
        if (err.message === 'TOKEN_EXPIRED') {
          const fresh = await doRefresh();
          if (fresh) spotify.me(fresh).then(setUser).catch(() => logout());
          else logout();
        }
      })
      .finally(() => setLoading(false));
  }, [token]);

  /* ── Login ── */
  const login = async () => {
    if (!CLIENT_ID) { alert('Add VITE_SPOTIFY_CLIENT_ID to your .env file!'); return; }
    const { verifier, challenge } = await generatePKCE();
    sessionStorage.setItem('sp_verifier', verifier);
    window.location.href = buildAuthUrl(CLIENT_ID, REDIRECT, challenge);
  };

  /* ── Logout ── */
  const logout = () => {
    setToken(null); setRefresh(null); setUser(null);
    localStorage.removeItem('sp_token');
    localStorage.removeItem('sp_refresh');
  };

  /* ── Authenticated fetch (auto-refresh on 401) ── */
  const apiFetch = useCallback(async (fn) => {
    try {
      return await fn(token);
    } catch (err) {
      if (err.message === 'TOKEN_EXPIRED') {
        const fresh = await doRefresh();
        if (fresh) return fn(fresh);
        logout();
      }
      throw err;
    }
  }, [token, doRefresh]);

  return (
    <Ctx.Provider value={{ token, user, loading, error, login, logout, apiFetch, isLoggedIn: !!token && !!user }}>
      {children}
    </Ctx.Provider>
  );
}

export const useSpotify = () => useContext(Ctx);
