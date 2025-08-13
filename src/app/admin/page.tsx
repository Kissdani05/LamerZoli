import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import AdminForm from './AdminForm';

export default async function AdminPage() {
  const cookieStore = await cookies();
  const adminCookie = cookieStore.get?.('admin');
  const isAdmin = adminCookie?.value === '1';
  if (!isAdmin) {
    redirect('/admin/login');
  }
  return (
    <main className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold mb-4">Admin</h1>
      <AdminForm />
    </main>
  );
}
