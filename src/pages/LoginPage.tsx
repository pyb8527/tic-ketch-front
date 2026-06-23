import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login, getMe } from '../api/auth';
import { useAuthStore } from '../store/authStore';
import { useToast } from '../components/ui/toast';
import Button from '../components/ui/Button';
import Field from '../components/ui/Field';

export default function LoginPage() {
  const navigate = useNavigate();
  const toast = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await login({ email, password });
      useAuthStore.getState().setToken(res.accessToken);
      try {
        const me = await getMe();
        useAuthStore.getState().setUser(me);
      } catch {
        /* 프로필 조회 실패는 로그인 자체를 막지 않음 */
      }
      toast.success('로그인되었습니다');
      navigate('/');
    } catch (err) {
      setError(err instanceof Error ? err.message : '로그인에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-[70vh] items-center justify-center">
      <div className="w-full max-w-md animate-slide-up-in rounded-xl border border-border bg-surface p-8 shadow-lg dark:shadow-none">
        <div className="mb-8 text-center">
          <h1 className="font-display text-2xl font-bold text-fg">다시 오셨네요</h1>
          <p className="mt-1 text-sm text-fg-muted">로그인하고 예매를 이어가세요</p>
        </div>

        <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
          <Field
            label="이메일"
            id="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
            placeholder="you@example.com"
          />
          <Field
            label="비밀번호"
            id="password"
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
            placeholder="••••••••"
          />

          {error && (
            <p
              role="alert"
              className="rounded-md bg-error-50 px-4 py-2.5 text-sm font-medium text-error-700 dark:bg-error-900/40 dark:text-error-400"
            >
              {error}
            </p>
          )}

          <Button type="submit" loading={loading} fullWidth size="lg" className="mt-2">
            로그인
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-fg-muted">
          계정이 없으신가요?{' '}
          <Link
            to="/register"
            className="font-medium text-primary-600 hover:underline dark:text-primary-400"
          >
            회원가입
          </Link>
        </p>
      </div>
    </div>
  );
}
