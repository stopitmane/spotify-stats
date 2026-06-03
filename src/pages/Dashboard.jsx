import { useState, useEffect } from 'react';
import { useSpotify } from '../context/SpotifyContext';
import { spotify } from '../lib/spotify';
import { StatCard, TimeRangePicker, fmtNum } from '../components/Shared';
import TopTracks from '../components/TopTracks';
import TopArtists from '../components/TopArtists';
import RecentlyPlayed from '../components/RecentlyPlayed';

const TABS = ['Top Tracks', 'Top Artists', 'Recent'];

export default function Dashboard() {
  const { user, apiFetch, logout } = useSpotify();
  const [tab,       setTab]       = useState('Top Tracks');
  const [range,     setRange]     = useState('short_term');
  const [tracks,    setTracks]    = useState(null);
  const [artists,   setArtists]   = useState(null);
  const [recent,    setRecent]    = useState(null);
  const [loading,   setLoading]   = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);

  useEffect(() => {
    setLoading(true);
    Promise.all([
      apiFetch(t => spotify.topTracks(t, range, 10)),
      apiFetch(t => spotify.topArtists(t, range, 12)),
      apiFetch(t => spotify.recentlyPlayed(t, 15)),
    ]).then(([tr, ar, re]) => {
      setTracks(tr.items);
      setArtists(ar.items);
      setRecent(re.items);
    }).catch(console.error)
      .finally(() => setLoading(false));
  }, [range]);

  const avgPop = tracks?.length
    ? Math.round(tracks.reduce((a, t) => a + t.popularity, 0) / tracks.length)
    : null;

  const topGenre = artists?.flatMap(a => a.genres || [])
    .reduce((acc, g) => { acc[g] = (acc[g] || 0) + 1; return acc; }, {});
  const topGenreName = topGenre
    ? Object.entries(topGenre).sort((a, b) => b[1] - a[1])[0]?.[0]
    : null;

  const initials = user?.display_name?.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase() || '?';

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>

      {/* ── Top glow ── */}
      <div style={{ position: 'fixed', top: -100, right: -100, width: 500, height: 500,
        background: 'radial-gradient(circle, rgba(30,215,96,0.06) 0%, transparent 70%)', pointerEvents: 'none', zIndex: 0 }} />

      {/* ── Header ── */}
      <header style={{ position: 'sticky', top: 0, zIndex: 50, background: 'rgba(8,8,8,0.85)', backdropFilter: 'blur(12px)', borderBottom: '1px solid var(--border)', padding: '0 32px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', alignItems: 'center', gap: 24, height: 60 }}>

          {/* Brand */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginRight: 'auto' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="#1ED760">
              <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
            </svg>
            <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 14, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
              Spotify<span style={{ color: '#1ED760' }}>Stats</span>
            </span>
          </div>

          {/* Time range */}
          <TimeRangePicker value={range} onChange={setRange} />

          {/* User menu */}
          <div style={{ position: 'relative' }}>
            <button onClick={() => setMenuOpen(m => !m)} style={{
              display: 'flex', alignItems: 'center', gap: 8,
              background: 'var(--surface)', border: '1px solid var(--border)',
              borderRadius: 30, padding: '6px 14px 6px 6px', cursor: 'pointer', transition: 'border-color 0.2s'
            }}
              onMouseEnter={e => e.currentTarget.style.borderColor = '#1ED760'}
              onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}>
              {user?.images?.[0]?.url
                ? <img src={user.images[0].url} alt="avatar" style={{ width: 28, height: 28, borderRadius: '50%', objectFit: 'cover' }} />
                : <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'linear-gradient(135deg,#1ED760,#0a7a2e)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 11, color: '#000' }}>{initials}</div>
              }
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: '#ccc' }}>{user?.display_name?.split(' ')[0]}</span>
            </button>
            {menuOpen && (
              <div style={{ position: 'absolute', right: 0, top: '110%', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', minWidth: 160, overflow: 'hidden', boxShadow: 'var(--shadow)', zIndex: 100 }}>
                <div style={{ padding: '12px 16px', borderBottom: '1px solid var(--border)' }}>
                  <p style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--muted)' }}>{user?.email}</p>
                  <p style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#1ED760', marginTop: 4 }}>{fmtNum(user?.followers?.total)} followers</p>
                </div>
                <button onClick={() => { logout(); setMenuOpen(false); }}
                  style={{ width: '100%', padding: '12px 16px', background: 'none', border: 'none', color: '#ff4444', fontSize: 13, textAlign: 'left', cursor: 'pointer', fontFamily: 'var(--font-body)' }}>
                  Disconnect
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* ── Main ── */}
      <main style={{ flex: 1, maxWidth: 1100, margin: '0 auto', width: '100%', padding: '40px 32px', position: 'relative', zIndex: 1 }}>

        {/* Hero headline */}
        <div className="fade-up" style={{ marginBottom: 40 }}>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#1ED760', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 8 }}>
            ◉ &nbsp;{range === 'short_term' ? 'Last 4 Weeks' : range === 'medium_term' ? 'Last 6 Months' : 'All Time'}
          </p>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1 }}>
            {user?.display_name?.split(' ')[0]}'s<br />
            <span style={{ color: '#1ED760' }}>Music Report</span>
          </h1>
        </div>

        {/* Stats row */}
        <div className="fade-up" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 12, marginBottom: 40, animationDelay: '0.1s' }}>
          <StatCard label="Top Tracks" value={tracks?.length || '—'} sub="this period" />
          <StatCard label="Top Artists" value={artists?.length || '—'} sub="this period" />
          <StatCard label="Avg Popularity" value={avgPop ?? '—'} sub="out of 100" />
          <StatCard label="Top Genre" value={topGenreName ? topGenreName.split(' ').map(w => w[0].toUpperCase() + w.slice(1)).join(' ') : '—'} style={{ gridColumn: 'span 1' }} />
        </div>

        {/* Tabs */}
        <div className="fade-up" style={{ display: 'flex', gap: 0, borderBottom: '1px solid var(--border)', marginBottom: 28, animationDelay: '0.15s' }}>
          {TABS.map(t => (
            <button key={t} onClick={() => setTab(t)} style={{
              padding: '12px 24px', background: 'none', border: 'none',
              fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 13,
              letterSpacing: '0.03em', cursor: 'pointer', transition: 'all 0.2s',
              color: tab === t ? '#fff' : 'var(--faint)',
              borderBottom: tab === t ? '2px solid #1ED760' : '2px solid transparent',
              marginBottom: -1,
            }}>
              {t}
            </button>
          ))}

          {loading && (
            <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 8, paddingBottom: 12 }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#1ED760', animation: 'bar1 0.8s ease infinite alternate' }} />
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--muted)' }}>Loading…</span>
            </div>
          )}
        </div>

        {/* Tab content */}
        <div style={{ minHeight: 400 }}>
          {tab === 'Top Tracks'  && <TopTracks  tracks={tracks}    />}
          {tab === 'Top Artists' && <TopArtists artists={artists}  />}
          {tab === 'Recent'      && <RecentlyPlayed items={recent} />}
        </div>
      </main>

      {/* Footer */}
      <footer style={{ padding: '20px 32px', borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between' }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#333' }}>Built by Ajayi Taiwo John · github.com/stopitmane</span>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#333' }}>Spotify Web API · PKCE OAuth · React</span>
      </footer>
    </div>
  );
}
