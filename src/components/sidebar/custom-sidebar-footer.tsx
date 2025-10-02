'use client';
import React from 'react';
import { NavUser } from './NavUser';
import { LogOut } from 'lucide-react';
import { Button } from '../ui/button';
import { AppAlert } from '../AppAlert';
import { deleteCookie } from 'cookies-next';
import { useAuthStore } from '@/store/useAuthStore';
import { SidebarFooter, SidebarMenuButton } from '@/components/ui/sidebar';

const CustomSidebarFooter = () => {
  const { logout } = useAuthStore();
  const [isMounted, setIsMounted] = React.useState(false);

  const handleLogout = () => {
    deleteCookie('token');
    deleteCookie('isLogin');
    logout();

    window.location.href = '/auth/login';
  };

  React.useEffect(() => setIsMounted(true), []);

  return (
    <SidebarFooter className="border-t py-4 ">
      <AppAlert.AlertDialog>
        <AppAlert.Trigger asChild>
          <SidebarMenuButton className="hover:cursor-pointer py-[18px]">
            <LogOut size={20} />

            {isMounted && <span>Çıkış Yap</span>}
          </SidebarMenuButton>
        </AppAlert.Trigger>
        <AppAlert.Content title="Çıkış Yap" description="Çıkış yapmak istediğinize emin misiniz?">
          <AppAlert.Footer>
            <AppAlert.Close asChild>
              <Button variant="outline">Hayır</Button>
            </AppAlert.Close>

            <Button variant="default" size="default" onClick={handleLogout}>
              {isMounted && <span>Çıkış Yap</span>}
            </Button>
          </AppAlert.Footer>
        </AppAlert.Content>
      </AppAlert.AlertDialog>

      <NavUser />
    </SidebarFooter>
  );
};

export default CustomSidebarFooter;
