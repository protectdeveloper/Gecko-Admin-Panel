// app/providers/MainSidebarProvider.tsx gibi bir yerde:
import { cookies } from 'next/headers';
import { SidebarProvider } from '@/components/ui/sidebar';

export default async function MainSidebarProvider({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies(); // await gerekmez!
  const defaultOpen = cookieStore.get('sidebar_state')?.value === 'true';

  return <SidebarProvider defaultOpen={defaultOpen}>{children}</SidebarProvider>;
}
