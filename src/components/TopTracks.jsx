import { useState } from 'react';
import { Visualizer, fmtDuration } from './Shared';

export default function TopTracks({ tracks }) {
  const [hovered, setHovered] = useState(null);

  if (!tracks?.length) return (
    <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--muted)' }}>No track data found for this period.</div>
  );

  return (
    <div>
      {tracks.map((track, i) => {
        const isHovered = hovered === i;
        const artist    = track.artists.map(a => a.name).join(', ');
        const img       = track.album?.images?.[2]?.url || track.album?.images?.[0]?.url;

        return (
          <div key={track.id}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            className="fade-up"
            style={{
              display: 'grid', gridTemplateColumns: '32px 52px 1fr 80px 52px',
              alignItems: 'center', gap: 16, padding: '12px 16px',
              borderRadius: 'var(--radius)', transition: 'background 0.15s',
              background: isHovered ? 'var(--surface2)' : 'transparent',
              animationDelay: `${i * 0.04}s`,
            }}>

            {/* Index / visualizer */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', minWidth: 32 }}>
              {isHovered
                ? <Visualizer active />
                : <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: i < 3 ? '#1ED760' : 'var(--faint)' }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
              }
            </div>

            {/* Artwork */}
            {img
              ? <img src={img} alt={track.name} style={{ width: 52, height: 52, borderRadius: 6, objectFit: 'cover' }} />
              : <div style={{ width: 52, height: 52, borderRadius: 6, background: 'var(--surface2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>♪</div>
            }

            {/* Name + artist */}
            <div style={{ overflow: 'hidden' }}>
              <p style={{ fontWeight: 600, fontSize: 14, color: isHovered ? '#fff' : '#ddd', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', transition: 'color 0.15s' }}>
                {track.name}
              </p>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--muted)', marginTop: 3, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {artist}
              </p>
            </div>

            {/* Popularity bar */}
            <div>
              <div style={{ height: 3, background: 'var(--border)', borderRadius: 2, overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${track.popularity}%`, background: '#1ED760', borderRadius: 2, transition: 'width 0.5s ease' }} />
              </div>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--faint)', marginTop: 4, textAlign: 'right' }}>{track.popularity}</p>
            </div>

            {/* Duration */}
            <div style={{ textAlign: 'right' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--faint)' }}>
                {fmtDuration(track.duration_ms)}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
