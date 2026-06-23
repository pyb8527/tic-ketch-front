import React from 'react';
import { cn } from '../../lib/cn';

type Tone = 'neutral' | 'primary' | 'success' | 'warning' | 'error' | 'info';

const TONES: Record<Tone, string> = {
  neutral: 'bg-surface-2 text-fg-muted border-border',
  primary: 'bg-primary-50 text-primary-700 border-primary-200 dark:bg-primary-950 dark:text-primary-300 dark:border-primary-800',
  success: 'bg-success-50 text-success-700 border-success-300/60 dark:bg-success-900/40 dark:text-success-300 dark:border-success-700',
  warning: 'bg-warning-50 text-warning-700 border-warning-300 dark:bg-warning-900/40 dark:text-warning-300 dark:border-warning-700',
  error: 'bg-error-50 text-error-700 border-error-100 dark:bg-error-900/40 dark:text-error-400 dark:border-error-700',
  info: 'bg-info-50 text-info-700 border-info-300/60 dark:bg-info-700/20 dark:text-info-300 dark:border-info-700',
};

export default function Badge({
  tone = 'neutral',
  className,
  children,
  ...rest
}: { tone?: Tone } & React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 whitespace-nowrap rounded-full border px-2 py-0.5 text-xs font-medium',
        TONES[tone],
        className,
      )}
      {...rest}
    >
      {children}
    </span>
  );
}
