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
    const res = await fetch('/api/admin-login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    });
    if (res.ok) {
      window.location.href = '/admin';
    } else {
      setError(t('wrong_password'));
    }
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold mb-4">{t('admin_login_title')}</h1>
      <form className="flex flex-col gap-4 w-full max-w-xs" onSubmit={handleSubmit}>
        <input
          type="password"
          name="password"
          placeholder={t('password')}
          className="border rounded px-3 py-2"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="bg-black text-white rounded px-4 py-2">
          {t('login_button')}
        </button>
      </form>
      {error && <p className="mt-2 text-red-600">{error}</p>}
      <Link href="/" className="mt-6 text-blue-600 underline">
        {t('back_home')}
      </Link>
    </main>
  );
}
