import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from 'react';
import { cn } from '../../lib/cn';

export type ToastTone = 'success' | 'error' | 'warning' | 'info';

interface ToastItem {
  id: number;
  tone: ToastTone;
  title: string;
  description?: string;
}

interface ToastApi {
  show: (t: Omit<ToastItem, 'id'>) => void;
  success: (title: string, description?: string) => void;
  error: (title: string, description?: string) => void;
  warning: (title: string, description?: string) => void;
  info: (title: string, description?: string) => void;
}

const ToastContext = createContext<ToastApi | null>(null);

const TONE_STYLES: Record<ToastTone, { bar: string; icon: string; glyph: string }> = {
  success: { bar: 'bg-success-500', icon: 'text-success-600 dark:text-success-300', glyph: '✓' },
  error: { bar: 'bg-error-500', icon: 'text-error-600 dark:text-error-400', glyph: '!' },
  warning: { bar: 'bg-warning-400', icon: 'text-warning-700 dark:text-warning-300', glyph: '!' },
  info: { bar: 'bg-info-500', icon: 'text-info-600 dark:text-info-300', glyph: 'i' },
};

// 자동 닫힘 시간(ms). error는 수동 닫기.
const AUTO_DISMISS: Record<ToastTone, number | null> = {
  success: 3000,
  info: 3500,
  warning: 4500,
  error: null,
};

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const seq = useRef(0);

  const dismiss = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const show = useCallback(
    (t: Omit<ToastItem, 'id'>) => {
      const id = ++seq.current;
      setToasts((prev) => [...prev, { ...t, id }]);
      const ms = AUTO_DISMISS[t.tone];
      if (ms != null) {
        setTimeout(() => dismiss(id), ms);
      }
    },
    [dismiss],
  );

  const api = useMemo<ToastApi>(
    () => ({
      show,
      success: (title, description) => show({ tone: 'success', title, description }),
      error: (title, description) => show({ tone: 'error', title, description }),
      warning: (title, description) => show({ tone: 'warning', title, description }),
      info: (title, description) => show({ tone: 'info', title, description }),
    }),
    [show],
  );

  return (
    <ToastContext.Provider value={api}>
      {children}
      <div
        aria-live="polite"
        className="pointer-events-none fixed inset-x-0 top-4 z-50 flex flex-col items-center gap-2 px-4 sm:inset-x-auto sm:right-4 sm:items-end"
      >
        {toasts.map((t) => {
          const s = TONE_STYLES[t.tone];
          return (
            <div
              key={t.id}
              role={t.tone === 'error' ? 'alert' : 'status'}
              className={cn(
                'pointer-events-auto flex w-full max-w-sm animate-toast-in overflow-hidden rounded-lg border border-border bg-surface shadow-lg',
              )}
            >
              <span className={cn('w-1 shrink-0', s.bar)} aria-hidden />
              <div className="flex flex-1 items-start gap-3 p-4">
                <span
                  className={cn(
                    'mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-xs font-bold',
                    s.icon,
                  )}
                  aria-hidden
                >
                  {s.glyph}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-fg">{t.title}</p>
                  {t.description && (
                    <p className="mt-0.5 break-words text-sm text-fg-muted">{t.description}</p>
                  )}
                </div>
                <button
                  onClick={() => dismiss(t.id)}
                  aria-label="알림 닫기"
                  className="shrink-0 rounded-md p-1 text-fg-subtle transition-colors hover:bg-surface-2 hover:text-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                    <path d="M3 3l8 8M11 3l-8 8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                  </svg>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast(): ToastApi {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within <ToastProvider>');
  return ctx;
}
