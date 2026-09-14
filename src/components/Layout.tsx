import type { ReactNode } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { ThemeToggle } from './ThemeToggle';

export function Layout({ children }: { children: ReactNode }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signInWithGoogle, signOut } = useAuth();

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="page-wrap">
      <nav className="news-nav">
        <button className="news-nav-logo" onClick={() => navigate('/')}>
          identity<em>.compass</em>
        </button>

        <div className="news-nav-center">
          <ul className="news-nav-links">
            <li>
              <Link to="/" className={isActive('/') ? 'active' : ''}>Home</Link>
            </li>
            <li>
              <Link to="/intro" className={isActive('/intro') ? 'active' : ''}>How it works</Link>
            </li>
            {user && (
              <li>
                <Link to="/history" className={isActive('/history') ? 'active' : ''}>My Compass</Link>
              </li>
            )}
          </ul>
        </div>

        <div className="news-nav-right">
          <ThemeToggle />
          {user ? (
            <button className="news-nav-cta" onClick={signOut}>Sign out</button>
          ) : (
            <button className="news-nav-cta" onClick={signInWithGoogle}>Sign in</button>
          )}
        </div>
      </nav>

      <main className="main-content">{children}</main>

      <footer className="site-footer">
        <div>
          <button className="foot-logo" onClick={() => navigate('/')}>
            identity<em>.compass</em>
          </button>
          <div className="foot-tagline">A self-reflection assessment for exploring professional identity.</div>
        </div>
        <div className="foot-links">
          <Link to="/intro">How it works</Link>
          <Link to="/assessment">Take assessment</Link>
        </div>
        <div className="foot-icons">Not a clinical test</div>
      </footer>
    </div>
  );
}
