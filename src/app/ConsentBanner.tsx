'use client';
import { useEffect, useState } from 'react';
import Script from 'next/script';

export default function ConsentBanner() {
  const [consent, setConsent] = useState<'accepted' | 'declined' | null>(null);
  const gtagId = process.env.NEXT_PUBLIC_GTAG_ID;

  useEffect(() => {
    const stored = typeof window !== 'undefined' ? localStorage.getItem('consent') : null;
    if (stored === 'accepted' || stored === 'declined') setConsent(stored);
  }, []);

  const accept = () => {
    setConsent('accepted');
    if (typeof window !== 'undefined') localStorage.setItem('consent', 'accepted');
  };
  const decline = () => {
    setConsent('declined');
    if (typeof window !== 'undefined') localStorage.setItem('consent', 'declined');
  };

  return (
    <>
      {/* Analytics only if consent given and ID provided */}
      {consent === 'accepted' && gtagId && (
        <>
          <Script
            id="gtag-src"
            src={`https://www.googletagmanager.com/gtag/js?id=${gtagId}`}
            strategy="afterInteractive"
          />
          <Script id="gtag-init" strategy="afterInteractive">
            {`window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', '${gtagId}');`}
          </Script>
        </>
      )}

      {consent === null && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 max-w-3xl w-[95%] bg-white text-black border shadow rounded p-4 z-[100]">
          <p className="text-sm">
            Sütiket használunk a felhasználói élmény és analitika javításához. Az Elfogadás gombbal
            hozzájárulsz a nem szükséges sütikhez.
          </p>
          <div className="mt-3 flex gap-2">
            <button onClick={accept} className="bg-black text-white px-3 py-1 rounded text-sm">
              Elfogadom
            </button>
            <button
              onClick={decline}
              className="border border-black text-black px-3 py-1 rounded text-sm"
            >
              Elutasítom
            </button>
          </div>
        </div>
      )}
    </>
  );
}
