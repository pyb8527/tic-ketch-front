import { cn } from '../../lib/cn';
import Spinner from './Spinner';
import Button from './Button';

/** 스켈레톤 블록 — 데이터 로딩 자리표시. */
export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn('animate-pulse rounded-md bg-surface-2', className)}
      aria-hidden
    />
  );
}

/** 액션 진행 로딩(스피너 + 설명). */
export function LoadingState({ label = '불러오는 중…' }: { label?: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-20 text-fg-muted">
      <Spinner className="text-primary-500" />
      <p className="text-sm">{label}</p>
    </div>
  );
}

/** 에러 상태 + 복구 액션. */
export function ErrorState({
  title = '문제가 발생했습니다',
  message,
  onRetry,
}: {
  title?: string;
  message?: string;
  onRetry?: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-20 text-center">
      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-error-50 text-xl font-bold text-error-600 dark:bg-error-900/40 dark:text-error-400">
        !
      </span>
      <div>
        <p className="font-display text-lg font-semibold text-fg">{title}</p>
        {message && <p className="mt-1 text-sm text-fg-muted">{message}</p>}
      </div>
      {onRetry && (
        <Button variant="secondary" size="sm" onClick={onRetry}>
          다시 시도
        </Button>
      )}
    </div>
  );
}

/** 빈 상태(데이터 없음) + 선택적 액션. */
export function EmptyState({
  title,
  message,
  action,
}: {
  title: string;
  message?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-20 text-center">
      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-surface-2 text-xl text-fg-subtle">
        ◎
      </span>
      <div>
        <p className="font-display text-lg font-semibold text-fg">{title}</p>
        {message && <p className="mt-1 text-sm text-fg-muted">{message}</p>}
      </div>
      {action}
    </div>
  );
}
