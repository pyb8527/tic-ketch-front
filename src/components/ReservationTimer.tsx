import { useState, useEffect, useRef } from 'react';
import { cn } from '../lib/cn';

export default function ReservationTimer({
  expiresAt,
  onExpire,
}: {
  expiresAt: string;
  onExpire: () => void;
}) {
  const computeRemaining = () =>
    Math.max(0, Math.floor((new Date(expiresAt).getTime() - Date.now()) / 1000));

  const [remaining, setRemaining] = useState<number>(computeRemaining);
  const onExpireRef = useRef(onExpire);
  const firedRef = useRef(false);

  useEffect(() => {
    onExpireRef.current = onExpire;
  });

  useEffect(() => {
    firedRef.current = false;
    setRemaining(computeRemaining());

    const tid = setInterval(() => {
      const secs = computeRemaining();
      setRemaining(secs);
      if (secs === 0 && !firedRef.current) {
        firedRef.current = true;
        clearInterval(tid);
        onExpireRef.current();
      }
    }, 1000);

    return () => clearInterval(tid);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [expiresAt]);

  const mm = String(Math.floor(remaining / 60)).padStart(2, '0');
  const ss = String(remaining % 60).padStart(2, '0');
  const isDanger = remaining <= 60;

  return (
    <span
      role="timer"
      aria-live={isDanger ? 'assertive' : 'off'}
      className={cn(
        'tabular font-mono text-2xl font-bold transition-colors',
        isDanger
          ? 'animate-pulse text-error-600 dark:text-error-400'
          : 'text-success-600 dark:text-success-300',
      )}
    >
      {mm}:{ss}
    </span>
  );
}
