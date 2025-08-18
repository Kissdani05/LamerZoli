'use client';
import Link from 'next/link';
import { useState } from 'react';
import { useI18n } from '@/app/i18n/LanguageContext';

export default function AdminLogin() {
  const { t } = useI18n();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    // Ellenőrizzük, hogy már be van-e állítva az admin cookie
    if (
      typeof document !== 'undefined' &&
      document.cookie.split('; ').find((row) => row.startsWith('admin=1'))
    ) {
      window.location.href = '/admin';
      return;
    }
    const res = await fetch('/api/admin-login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
      credentials: 'include', // biztosítjuk, hogy a cookie beállításra kerüljön
    });
    if (res.ok) {
      window.location.href = '/admin';
    } else {
      setError(t('wrong_password'));
    }
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-2 md:px-0">
      <h1 className="text-2xl font-bold mb-4 text-center w-full">{t('admin_login_title')}</h1>
      <form className="flex flex-col gap-4 w-full max-w-xs" onSubmit={handleSubmit}>
        <input
          type="password"
          name="password"
          placeholder={t('password')}
          className="border rounded px-3 py-2 w-full"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="bg-black text-white rounded px-4 py-2 w-full">
          {t('login_button')}
        </button>
      </form>
      {error && <p className="mt-2 text-red-600 text-center w-full">{error}</p>}
      <Link href="/" className="mt-6 text-blue-600 underline w-full text-center">
        {t('back_home')}
      </Link>
    </main>
  );
}
