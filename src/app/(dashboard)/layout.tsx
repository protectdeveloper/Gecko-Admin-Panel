import HeaderBar from '@/components/header/AppHeader';
import { GenericSidebar } from '@/components/sidebar/GenericSidebar';
import MainSidebarProvider from '@/providers/MainSidebarProvider';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <MainSidebarProvider>
      <GenericSidebar />

      <HeaderBar />
      <main className="flex flex-1 h-screen pt-[85px] pb-6 px-4 flex-col lg:flex-row gap-4">{children}</main>
    </MainSidebarProvider>
  );
}
