import { fmtNum } from './Shared';

const RANK_COLORS = ['#1ED760', '#A8FF78', '#78FFD6'];

export default function TopArtists({ artists }) {
  if (!artists?.length) return (
    <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--muted)' }}>No artist data found for this period.</div>
  );

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(176px, 1fr))', gap: 14 }}>
      {artists.map((artist, i) => {
        const img    = artist.images?.[1]?.url || artist.images?.[0]?.url;
        const genre  = artist.genres?.[0];
        const color  = RANK_COLORS[i] || 'var(--border2)';
        const circumference = 2 * Math.PI * 20; // r=20

        return (
          <div key={artist.id}
            className="fade-up"
            style={{
              background: 'var(--surface)', border: '1px solid var(--border)',
              borderRadius: 'var(--radius-lg)', padding: '20px 16px',
              textAlign: 'center', transition: 'all 0.2s', cursor: 'default',
              animationDelay: `${i * 0.05}s`,
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = '#1ED760'; e.currentTarget.style.transform = 'translateY(-3px)'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'translateY(0)'; }}>

            {/* Rank badge */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: i < 3 ? color : 'var(--faint)', fontWeight: 600 }}>
                #{String(i + 1).padStart(2, '0')}
              </span>
              {/* Popularity ring */}
              <svg width="48" height="48" viewBox="0 0 48 48">
                <circle cx="24" cy="24" r="20" fill="none" stroke="var(--border)" strokeWidth="3" />
                <circle cx="24" cy="24" r="20" fill="none" stroke="#1ED760" strokeWidth="3"
                  strokeDasharray={`${(artist.popularity / 100) * circumference} ${circumference}`}
                  strokeLinecap="round"
                  transform="rotate(-90 24 24)"
                  style={{ transition: 'stroke-dasharray 0.8s ease' }} />
                <text x="24" y="28" textAnchor="middle" fill="#1ED760"
                  fontSize="10" fontFamily="DM Mono, monospace" fontWeight="500">{artist.popularity}</text>
              </svg>
            </div>

            {/* Avatar */}
            {img
              ? <img src={img} alt={artist.name} style={{ width: 72, height: 72, borderRadius: '50%', objectFit: 'cover', margin: '0 auto 12px', display: 'block', border: `2px solid ${i < 3 ? color : 'var(--border)'}` }} />
              : <div style={{ width: 72, height: 72, borderRadius: '50%', background: `linear-gradient(135deg, var(--surface2), #0d0d0d)`, margin: '0 auto 12px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: `2px solid ${i < 3 ? color : 'var(--border)'}` }}>
                  <span style={{ fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 800, color: '#1ED760' }}>{artist.name[0]}</span>
                </div>
            }

            <p style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 14, marginBottom: 4, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {artist.name}
            </p>
            {genre && <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--muted)', textTransform: 'capitalize', marginBottom: 8 }}>{genre}</p>}
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: '#1ED760' }}>{fmtNum(artist.followers?.total)} followers</p>
          </div>
        );
      })}
    </div>
  );
}
