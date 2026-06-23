import React, { useId } from 'react';
import { cn } from '../../lib/cn';

export interface FieldProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string | null;
  hint?: string;
}

/** 라벨 + 인풋 + 에러를 묶은 폼 필드. label은 항상 존재(접근성). */
export default function Field({
  label,
  error,
  hint,
  id,
  className,
  ...rest
}: FieldProps) {
  const autoId = useId();
  const inputId = id ?? autoId;
  const errId = `${inputId}-err`;
  const hintId = `${inputId}-hint`;

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={inputId} className="text-sm font-medium text-fg">
        {label}
      </label>
      <input
        id={inputId}
        aria-invalid={!!error || undefined}
        aria-describedby={cn(error && errId, hint && hintId) || undefined}
        className={cn(
          'h-10 w-full rounded-md border bg-surface-2 px-3 text-fg placeholder:text-fg-subtle',
          'transition-colors duration-fast',
          'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-canvas',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          error
            ? 'border-error-500 focus:ring-error-500'
            : 'border-border focus:border-primary-500 focus:ring-primary-500',
          className,
        )}
        {...rest}
      />
      {hint && !error && (
        <p id={hintId} className="text-xs text-fg-muted">
          {hint}
        </p>
      )}
      {error && (
        <p id={errId} role="alert" className="text-xs font-medium text-error-600 dark:text-error-400">
          {error}
        </p>
      )}
    </div>
  );
}
