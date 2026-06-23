import React, { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import Spinner from './Spinner';

type Variant = 'primary' | 'success' | 'danger' | 'secondary' | 'ghost';
type Size = 'sm' | 'md' | 'lg';

const VARIANTS: Record<Variant, string> = {
  primary:
    'bg-primary-600 text-white hover:bg-primary-700 active:bg-primary-800 dark:bg-primary-500 dark:hover:bg-primary-600',
  success:
    'bg-success-600 text-white hover:bg-success-700 active:bg-success-700 dark:bg-success-500',
  danger: 'bg-error-500 text-white hover:bg-error-600 active:bg-error-700',
  secondary:
    'bg-surface-2 text-fg border border-border hover:bg-border/40 active:bg-border/60',
  ghost: 'text-fg-muted hover:bg-surface-2 hover:text-fg active:bg-border/40',
};

const SIZES: Record<Size, string> = {
  sm: 'h-9 px-3 text-sm rounded-md gap-1.5',
  md: 'h-10 px-4 text-sm rounded-md gap-2',
  lg: 'h-12 px-8 text-base rounded-md gap-2',
};

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  fullWidth?: boolean;
}

/** 디자인 토큰 기반 버튼. variant로 위계(primary 1개/페이지, success=진행 확정)를 구분한다. */
const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    variant = 'primary',
    size = 'md',
    loading = false,
    fullWidth = false,
    disabled,
    className,
    children,
    ...rest
  },
  ref,
) {
  return (
    <button
      ref={ref}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      className={cn(
        'inline-flex items-center justify-center font-medium',
        'transition-all duration-fast ease-[cubic-bezier(0,0,0.2,1)]',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:ring-offset-canvas',
        'disabled:opacity-40 disabled:cursor-not-allowed active:scale-[0.98] disabled:active:scale-100',
        'select-none whitespace-nowrap',
        VARIANTS[variant],
        SIZES[size],
        fullWidth && 'w-full',
        className,
      )}
      {...rest}
    >
      {loading && <Spinner size="sm" />}
      {children}
    </button>
  );
});

export default Button;
