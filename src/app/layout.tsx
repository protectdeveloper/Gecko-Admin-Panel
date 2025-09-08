import './globals.css';
import { ThemeProvider } from '@/providers/theme-provider';
import { Toaster } from '@/components/ui/sonner';
import { QueryProvider } from '@/providers/QueryProvider';
import { AuthProvider } from '@/providers/AuthProvider';
import { TooltipProvider } from '@radix-ui/react-tooltip';
import { SidebarProvider } from '@/components/ui/sidebar';
import { I18nProvider } from '@/providers/I18nProvider';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <head />
      <body>
        <I18nProvider>
          <QueryProvider>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
              <SidebarProvider>
                <TooltipProvider delayDuration={0}>
                  <AuthProvider>
                    {children}
                    <Toaster />
                  </AuthProvider>
                </TooltipProvider>
              </SidebarProvider>
            </ThemeProvider>
          </QueryProvider>
        </I18nProvider>
      </body>
    </html>
  );
}
