import { useSpotify } from '../context/SpotifyContext';

export default function Login() {
  const { login } = useSpotify();

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>

      {/* Background glow orbs */}
      <div style={{ position: 'fixed', top: '-20%', right: '-10%', width: 600, height: 600,
        background: 'radial-gradient(circle, rgba(30,215,96,0.07) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ position: 'fixed', bottom: '-20%', left: '-10%', width: 500, height: 500,
        background: 'radial-gradient(circle, rgba(30,215,96,0.04) 0%, transparent 70%)', pointerEvents: 'none' }} />

      {/* Header */}
      <header style={{ padding: '28px 48px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #111' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="#1ED760">
            <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
          </svg>
          <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 15, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#888' }}>Stats</span>
        </div>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#333', letterSpacing: '0.2em' }}>v1.0</span>
      </header>

      {/* Main */}
      <main style={{ flex: 1, display: 'flex', alignItems: 'center', padding: '60px 48px' }}>
        <div style={{ maxWidth: 680 }} className="fade-up">

          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 32 }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#1ED760', boxShadow: '0 0 8px #1ED760' }} />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: '#1ED760', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
              Your Listening Report
            </span>
          </div>

          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(56px, 9vw, 96px)', fontWeight: 800, lineHeight: 0.95, letterSpacing: '-0.03em', marginBottom: 32 }}>
            What does<br />
            your music<br />
            <span style={{ color: '#1ED760', position: 'relative' }}>
              say about you?
              <svg viewBox="0 0 300 12" style={{ position: 'absolute', bottom: -8, left: 0, width: '100%' }}>
                <path d="M0,6 C75,0 225,12 300,6" stroke="#1ED760" strokeWidth="2" fill="none" opacity="0.5" />
              </svg>
            </span>
          </h1>

          <p style={{ color: '#666', fontSize: 17, lineHeight: 1.8, maxWidth: 460, marginBottom: 48, fontWeight: 300 }}>
            Connect your Spotify account to discover your top tracks, artists, and listening patterns — updated in real time.
          </p>

          <div style={{ display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap' }}>
            <button onClick={login} style={{
              display: 'flex', alignItems: 'center', gap: 12,
              background: '#1ED760', color: '#000', border: 'none',
              padding: '16px 32px', borderRadius: 50, fontFamily: 'var(--font-display)',
              fontSize: 15, fontWeight: 700, letterSpacing: '0.02em',
              cursor: 'pointer', transition: 'all 0.2s'
            }}
              onMouseEnter={e => { e.currentTarget.style.background = '#23f26a'; e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(30,215,96,0.3)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = '#1ED760'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="black">
                <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
              </svg>
              Connect Spotify
            </button>

            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: '#333' }}>
              Uses PKCE OAuth · No password stored
            </span>
          </div>

          {/* Features */}
          <div style={{ display: 'flex', gap: 32, marginTop: 64, flexWrap: 'wrap' }}>
            {[
              ['◈', 'Top Tracks', 'Last 4 weeks, 6 months, all time'],
              ['◉', 'Top Artists', 'Your most played artists'],
              ['◎', 'Recent Plays', 'What you\'ve been listening to'],
            ].map(([icon, title, sub]) => (
              <div key={title}>
                <p style={{ fontFamily: 'var(--font-display)', fontSize: 20, marginBottom: 4 }}>
                  <span style={{ color: '#1ED760', marginRight: 8 }}>{icon}</span>{title}
                </p>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#444' }}>{sub}</p>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Bottom strip */}
      <footer style={{ padding: '20px 48px', borderTop: '1px solid #111', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#333' }}>Built by Ajayi Taiwo John</span>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#333' }}>Spotify Web API · PKCE · React</span>
      </footer>
    </div>
  );
}
