import { SpotifyProvider, useSpotify } from './context/SpotifyContext';
import Login     from './pages/Login';
import Dashboard from './pages/Dashboard';

function AppInner() {
  const { isLoggedIn, loading } = useSpotify();

  if (loading) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 16 }}>
      <div className="spinner" />
      <p style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--muted)', letterSpacing: '0.1em' }}>Connecting…</p>
    </div>
  );

  return isLoggedIn ? <Dashboard /> : <Login />;
}

export default function App() {
  return (
    <SpotifyProvider>
      <AppInner />
    </SpotifyProvider>
  );
}
