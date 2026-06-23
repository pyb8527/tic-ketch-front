import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

export default function Layout({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const accessToken = useAuthStore((s) => s.accessToken);

  const handleLogout = () => {
    useAuthStore.getState().logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex flex-col bg-bg text-gray-200">
      <header className="sticky top-0 bg-surface border-b border-white/10">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="text-accent font-bold text-lg">
            TicKetch
          </Link>
          <div className="flex items-center gap-4">
            {accessToken ? (
              <>
                <Link to="/me" className="hover:text-accent transition-colors">
                  내 예매
                </Link>
                <button
                  onClick={handleLogout}
                  className="bg-accent hover:bg-opacity-90 text-white px-4 py-2 rounded transition-opacity"
                >
                  로그아웃
                </button>
              </>
            ) : (
              <Link to="/login" className="hover:text-accent transition-colors">
                로그인
              </Link>
            )}
          </div>
        </div>
      </header>
      <main className="max-w-5xl mx-auto p-6 flex-1 w-full">{children}</main>
    </div>
  );
}
