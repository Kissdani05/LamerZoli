'use client';
import { useEffect } from 'react';

export default function NotificationProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Service worker regisztráció (public/notification-sw.js)
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/notification-sw.js')
        .then(() => {
          // SW regisztrálva
        })
        .catch(() => {});
    }
  }, []);

  // UI: gomb az engedély kéréshez (opcionális, később testreszabható)
  return (
    <>
      {/* <button onClick={requestNotificationPermission} className="btn btn-outline fixed bottom-4 right-4 z-50">Értesítések engedélyezése</button> */}
      {children}
    </>
  );
}
