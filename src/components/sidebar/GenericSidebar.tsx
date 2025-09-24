'use client';
import * as React from 'react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarTrigger,
  useSidebar
} from '@/components/ui/sidebar';
import Link from 'next/link';
import Image from 'next/image';
import { Badge } from '../ui/badge';
import { useTranslation } from 'react-i18next';
import { sidebarMenuData } from '@/utils/data';
import { usePathname, useRouter } from 'next/navigation';
import CustomSidebarFooter from './custom-sidebar-footer';
import GeckoAiImage from '../../../public/assets/img/geckoAi.png';
import { useGetSupportAdminTicketsQuery } from '@/api/Support/Support.hook';
import { NavMain } from './NavMain';

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
      <SidebarHeader className="flex flex-row items-center justify-between py-4">
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
        <SidebarTrigger className="w-8 h-8 " />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={sidebarMenuData.navMain} />
      </SidebarContent>
      <CustomSidebarFooter />
      <SidebarRail />
    </Sidebar>
  );
}
