'use client';
import { useEffect, useState } from 'react';

function getTimeLeft(target: string) {
  const now = new Date().getTime();
  const end = new Date(target).getTime();
  const diff = Math.max(0, end - now);
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  return { days, hours, minutes, seconds };
}

export default function Countdown({ targetDate }: { targetDate: string }) {
  const [left, setLeft] = useState(getTimeLeft(targetDate));
  useEffect(() => {
    const timer = setInterval(() => {
      setLeft(getTimeLeft(targetDate));
    }, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);
  if (!targetDate) return null;
  return (
    <div className="flex gap-2 text-lg font-mono text-brand-2">
      <span>{left.days} nap</span>
      <span>{left.hours} óra</span>
      <span>{left.minutes} perc</span>
      <span>{left.seconds} mp</span>
    </div>
  );
}
