import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

export default function Layout({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const location = useLocation();
  const accessToken = useAuthStore((s) => s.accessToken);
  const [menuOpen, setMenuOpen] = useState(false);

  const hideBack = location.pathname === '/' || location.pathname === '/login';

  const handleLogout = () => {
    useAuthStore.getState().logout();
    setMenuOpen(false);
    navigate('/login');
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="flex min-h-screen flex-col" style={{ backgroundColor: '#0f1117', color: '#f0f0f0' }}>
      {/* Sticky header */}
      <header
        className="sticky top-0 z-20 flex h-14 items-center justify-between border-b px-4"
        style={{ backgroundColor: '#1a1d27', borderColor: 'rgba(255,255,255,0.1)' }}
      >
        {/* LEFT group */}
        <div className="flex items-center gap-3">
          {/* Back button */}
          {!hideBack && (
            <button
              onClick={() => navigate(-1)}
              aria-label="뒤로가기"
              className="flex items-center justify-center rounded p-1 transition-colors hover:bg-white/10"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
          )}

          {/* Logo */}
          <Link
            to="/"
            className="font-bold text-lg"
            style={{ color: '#6c63ff' }}
          >
            TicKetch
          </Link>
        </div>

        {/* RIGHT group */}
        <div className="relative">
          {/* Hamburger button */}
          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label="메뉴 열기"
            aria-expanded={menuOpen}
            className="flex items-center justify-center rounded p-1 transition-colors hover:bg-white/10"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>

          {/* Overlay + dropdown */}
          {menuOpen && (
            <>
              {/* Full-screen transparent overlay */}
              <div
                className="fixed inset-0 z-10"
                onClick={closeMenu}
                aria-hidden="true"
              />

              {/* Dropdown panel */}
              <div
                className="absolute right-2 top-14 z-20 flex min-w-44 flex-col rounded border p-2 shadow-lg"
                style={{ backgroundColor: '#1a1d27', borderColor: 'rgba(255,255,255,0.1)' }}
              >
                {/* 홈 */}
                <Link
                  to="/"
                  onClick={closeMenu}
                  className="rounded px-3 py-2 text-sm transition-colors hover:bg-white/10"
                >
                  홈
                </Link>

                {/* 내 예매 (logged in only) */}
                {accessToken && (
                  <Link
                    to="/me"
                    onClick={closeMenu}
                    className="rounded px-3 py-2 text-sm transition-colors hover:bg-white/10"
                  >
                    내 예매
                  </Link>
                )}

                {/* Auth actions */}
                {accessToken ? (
                  <button
                    onClick={handleLogout}
                    className="rounded px-3 py-2 text-left text-sm transition-colors hover:bg-white/10"
                  >
                    로그아웃
                  </button>
                ) : (
                  <Link
                    to="/login"
                    onClick={closeMenu}
                    className="rounded px-3 py-2 text-sm transition-colors hover:bg-white/10"
                  >
                    로그인
                  </Link>
                )}
              </div>
            </>
          )}
        </div>
      </header>

      {/* Body */}
      <main className="max-w-5xl mx-auto p-4 sm:p-6">{children}</main>
    </div>
  );
}
