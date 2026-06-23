import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { register } from '../api/auth';
import { useToast } from '../components/ui/toast';
import Button from '../components/ui/Button';
import Field from '../components/ui/Field';

export default function RegisterPage() {
  const navigate = useNavigate();
  const toast = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await register({ email, password, name });
      toast.success('회원가입 완료', '이제 로그인할 수 있어요');
      navigate('/login');
    } catch (err) {
      setError(err instanceof Error ? err.message : '회원가입에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-[70vh] items-center justify-center">
      <div className="w-full max-w-md animate-slide-up-in rounded-xl border border-border bg-surface p-8 shadow-lg dark:shadow-none">
        <div className="mb-8 text-center">
          <h1 className="font-display text-2xl font-bold text-fg">TicKetch 시작하기</h1>
          <p className="mt-1 text-sm text-fg-muted">몇 초면 가입이 끝나요</p>
        </div>

        <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
          <Field
            label="이름"
            id="name"
            type="text"
            autoComplete="name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={loading}
            placeholder="홍길동"
          />
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
            autoComplete="new-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
            placeholder="••••••••"
            hint="8자 이상 권장"
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
            회원가입
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-fg-muted">
          이미 계정이 있으신가요?{' '}
          <Link
            to="/login"
            className="font-medium text-primary-600 hover:underline dark:text-primary-400"
          >
            로그인
          </Link>
        </p>
      </div>
    </div>
  );
}
