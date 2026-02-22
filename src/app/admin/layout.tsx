'use client';
import AdminHeader from './AdminHeader';
import { usePathname } from 'next/navigation';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLoginPage = pathname === '/admin/login';

  return (
    <>
      {/* Csak akkor jelenjen meg az AdminHeader, ha NEM a login oldalon vagyunk */}
      {!isLoginPage && <AdminHeader />}
      <main className="max-w-6xl mx-auto px-4 pb-16 text-white">{children}</main>
    </>
  );
}
