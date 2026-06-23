import React from 'react';
import { cn } from '../../lib/cn';

type CardProps = React.HTMLAttributes<HTMLDivElement> & {
  /** interactive: hover lift + 포커스 링 (클릭 가능 카드) */
  interactive?: boolean;
  elevated?: boolean;
  as?: 'div' | 'li';
};

/**
 * 표면 카드. 라이트=그림자, 다크=테두리로 elevation 표현.
 */
export default function Card({
  interactive = false,
  elevated = false,
  as = 'div',
  className,
  children,
  ...rest
}: CardProps) {
  const Tag = as as 'div';
  return (
    <Tag
      className={cn(
        'rounded-lg bg-surface border border-border',
        elevated ? 'shadow-lg dark:shadow-none' : 'shadow-sm dark:shadow-none',
        interactive &&
          'cursor-pointer transition-all duration-normal hover:-translate-y-0.5 hover:border-primary-300 hover:shadow-md dark:hover:border-primary-500/60',
        className,
      )}
      {...rest}
    >
      {children}
    </Tag>
  );
}
