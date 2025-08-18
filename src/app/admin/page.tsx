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
    <>
      <AdminForm />
    </>
  );
}
