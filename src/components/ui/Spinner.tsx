import { cn } from '../../lib/cn';

/** 액션 진행 스피너. 색은 currentColor를 따른다(버튼 내부 등). */
export default function Spinner({
  size = 'md',
  className,
}: {
  size?: 'sm' | 'md';
  className?: string;
}) {
  const dim = size === 'sm' ? 'h-4 w-4 border-2' : 'h-5 w-5 border-2';
  return (
    <span
      role="status"
      aria-label="로딩 중"
      className={cn(
        'inline-block animate-spin rounded-full border-current border-t-transparent',
        dim,
        className,
      )}
    />
  );
}
