import HeaderBar from '@/components/header/AppHeader';
import { GenericSidebar } from '@/components/sidebar/GenericSidebar';
import MainSidebarProvider from '@/providers/MainSidebarProvider';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <MainSidebarProvider>
      <GenericSidebar />

      <main className="flex flex-1 min-h-screen">
        <HeaderBar />
        <div className="flex flex-1 pb-8 lg:pb-6 px-4" style={{ paddingTop: '85px' }}>
          {children}
        </div>
      </main>
    </MainSidebarProvider>
  );
}
