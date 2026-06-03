import { fmtDuration } from './Shared';

function timeAgo(isoString) {
  const diff = Date.now() - new Date(isoString).getTime();
  const mins  = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days  = Math.floor(diff / 86400000);
  if (mins < 1)   return 'just now';
  if (mins < 60)  return `${mins}m ago`;
  if (hours < 24) return `${hours}h ago`;
  return `${days}d ago`;
}

export default function RecentlyPlayed({ items }) {
  if (!items?.length) return (
    <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--muted)' }}>No recent plays found.</div>
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      {items.map((item, i) => {
        const track  = item.track;
        const img    = track.album?.images?.[2]?.url || track.album?.images?.[0]?.url;
        const artist = track.artists.map(a => a.name).join(', ');

        return (
          <div key={`${track.id}-${i}`}
            className="fade-up"
            style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '10px 14px', borderRadius: 'var(--radius)', transition: 'background 0.15s', animationDelay: `${i * 0.03}s` }}
            onMouseEnter={e => e.currentTarget.style.background = 'var(--surface2)'}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>

            {img
              ? <img src={img} alt={track.name} style={{ width: 46, height: 46, borderRadius: 6, objectFit: 'cover', flexShrink: 0 }} />
              : <div style={{ width: 46, height: 46, borderRadius: 6, background: 'var(--surface2)', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>♪</div>
            }

            <div style={{ flex: 1, overflow: 'hidden' }}>
              <p style={{ fontWeight: 600, fontSize: 13, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{track.name}</p>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--muted)', marginTop: 2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{artist}</p>
            </div>

            <div style={{ textAlign: 'right', flexShrink: 0 }}>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#1ED760', marginBottom: 2 }}>{timeAgo(item.played_at)}</p>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--faint)' }}>{fmtDuration(track.duration_ms)}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
