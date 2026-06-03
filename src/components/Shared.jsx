/* ── Audio visualizer bars ── */
export function Visualizer({ active = true, color = '#1ED760' }) {
  const bars = [
    { anim: 'bar1', delay: '0s'    },
    { anim: 'bar2', delay: '0.15s' },
    { anim: 'bar3', delay: '0.05s' },
    { anim: 'bar4', delay: '0.2s'  },
  ];
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 2, height: 16 }}>
      {bars.map((b, i) => (
        <div key={i} style={{
          width: 3, borderRadius: 2, background: color,
          height: active ? undefined : 4,
          animation: active ? `${b.anim} 0.8s ease-in-out infinite alternate` : 'none',
          animationDelay: b.delay,
        }} />
      ))}
    </div>
  );
}

/* ── Time range tabs ── */
export function TimeRangePicker({ value, onChange }) {
  const opts = [
    { val: 'short_term',  label: '4 Weeks'  },
    { val: 'medium_term', label: '6 Months' },
    { val: 'long_term',   label: 'All Time' },
  ];
  return (
    <div style={{ display: 'flex', gap: 4, background: '#111', borderRadius: 30, padding: 3 }}>
      {opts.map(o => (
        <button key={o.val} onClick={() => onChange(o.val)} style={{
          padding: '6px 16px', borderRadius: 30, border: 'none',
          fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.05em',
          cursor: 'pointer', transition: 'all 0.2s',
          background: value === o.val ? '#1ED760' : 'transparent',
          color:      value === o.val ? '#000'    : '#666',
          fontWeight: value === o.val ? 600 : 400,
        }}>
          {o.label}
        </button>
      ))}
    </div>
  );
}

/* ── Stat card ── */
export function StatCard({ label, value, sub, style }) {
  return (
    <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '20px 24px', ...style }}>
      <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--faint)', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: 8 }}>{label}</p>
      <p style={{ fontFamily: 'var(--font-display)', fontSize: 36, fontWeight: 800, color: '#1ED760', letterSpacing: '-0.03em', lineHeight: 1 }}>{value}</p>
      {sub && <p style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--muted)', marginTop: 6 }}>{sub}</p>}
    </div>
  );
}

/* ── Format duration ── */
export const fmtDuration = (ms) => {
  const m = Math.floor(ms / 60000);
  const s = String(Math.floor((ms % 60000) / 1000)).padStart(2, '0');
  return `${m}:${s}`;
};

/* ── Format large numbers ── */
export const fmtNum = (n) =>
  n >= 1_000_000 ? `${(n / 1_000_000).toFixed(1)}M`
  : n >= 1_000   ? `${(n / 1_000).toFixed(0)}K`
  : String(n);
