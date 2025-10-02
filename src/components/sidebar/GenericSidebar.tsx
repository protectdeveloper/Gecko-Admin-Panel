'use client';
import * as React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { NavMain } from './NavMain';
import { useRouter } from 'next/navigation';
import { sidebarMenuData } from '@/utils/data';
import CustomSidebarFooter from './custom-sidebar-footer';
import GeckoAiImage from '../../../public/assets/img/geckoAi.png';
import { Sidebar, SidebarContent, SidebarHeader, SidebarRail, SidebarTrigger, useSidebar } from '@/components/ui/sidebar';

export interface NavItem {
  title: string;
  url: string;
  notificationCount?: number;
  icon?: React.ElementType;
}

export interface NavGroup {
  title: string;
  items: NavItem[];
}

export function GenericSidebar({ ...props }) {
  const router = useRouter();
  const { isMobile, open } = useSidebar();

  const [isMounted, setIsMounted] = React.useState(false);
  React.useEffect(() => setIsMounted(true), []);

  return (
    <Sidebar collapsible={'icon'} {...props}>
      <SidebarHeader className="flex flex-row items-center justify-between py-3.5">
        {(open || isMobile) && isMounted && (
          <Image
            alt="Logo"
            width={40}
            height={40}
            onClick={() => router.push('/')}
            className="max-h-[40px] min-h-[40px] mx-auto object-contain cursor-pointer"
            src={GeckoAiImage}
          />
        )}
        <SidebarTrigger className={cn('w-8 h-8', !open && 'pt-2')} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={sidebarMenuData.navMain} />
      </SidebarContent>
      <CustomSidebarFooter />
      <SidebarRail />
    </Sidebar>
  );
}
