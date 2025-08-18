'use client';
import AdminHeader from './AdminHeader';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  // Ellenőrizzük, hogy az aktuális oldal az admin login-e
  const isLoginPage =
    typeof window !== 'undefined' ? window.location.pathname === '/admin/login' : false;
  return (
    <>
      {/* Csak akkor jelenjen meg az AdminHeader, ha NEM a login oldalon vagyunk */}
      {!isLoginPage && <AdminHeader />}
      <main className="max-w-6xl mx-auto px-4 pb-16 text-white">{children}</main>
    </>
  );
}
