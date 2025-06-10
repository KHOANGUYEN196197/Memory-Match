import { useEffect, useState } from 'react';

interface TimerProps {
  isRunning: boolean;
  onTick?: (seconds: number) => void;
  resetTrigger?: number;
}

const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60)
    .toString()
    .padStart(2, '0');
  const secs = (seconds % 60).toString().padStart(2, '0');
  return `${mins}:${secs}`;
};

export default function Timer({ isRunning, onTick, resetTrigger }: TimerProps) {
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isRunning) {
      interval = setInterval(() => {
        setElapsed((prev) => {
          const next = prev + 1;
          if (onTick) onTick(next);
          return next;
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning]);

  useEffect(() => {
    setElapsed(0);
  }, [resetTrigger]);

  return (
    <div className="text-green-600 font-bold" style={{ fontFamily: 'Pokemon Solid' }}>
      {formatTime(elapsed)}
    </div>
  );
}
