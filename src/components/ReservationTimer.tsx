import { useState, useEffect, useRef } from 'react';

export default function ReservationTimer({ expiresAt, onExpire }: { expiresAt: string; onExpire: () => void }) {
  const computeRemaining = () =>
    Math.max(0, Math.floor((new Date(expiresAt).getTime() - Date.now()) / 1000));

  const [remaining, setRemaining] = useState<number>(computeRemaining);
  const onExpireRef = useRef(onExpire);
  const firedRef = useRef(false);

  // Keep onExpireRef up-to-date every render without re-running the interval effect
  useEffect(() => {
    onExpireRef.current = onExpire;
  });

  useEffect(() => {
    // Reset guard when expiresAt changes
    firedRef.current = false;
    setRemaining(computeRemaining());

    const id = setInterval(() => {
      const secs = computeRemaining();
      setRemaining(secs);
      if (secs === 0 && !firedRef.current) {
        firedRef.current = true;
        clearInterval(id);
        onExpireRef.current();
      }
    }, 1000);

    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [expiresAt]);

  const mm = String(Math.floor(remaining / 60)).padStart(2, '0');
  const ss = String(remaining % 60).padStart(2, '0');
  const isDanger = remaining <= 60;

  return (
    <span
      className={`font-mono text-2xl font-bold tabular-nums ${isDanger ? 'text-danger' : 'text-accent2'}`}
    >
      {mm}:{ss}
    </span>
  );
}
