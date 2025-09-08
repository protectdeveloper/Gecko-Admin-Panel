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
import { useGetSupportUserTicketsQuery } from '@/api/Support/Support.hook';

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
  const { t } = useTranslation();
  const pathname = usePathname() || '';
  const { isMobile, open } = useSidebar();

  const { data: supportTicketsData } = useGetSupportUserTicketsQuery({
    pageSize: 1,
    pageNumber: 20,
    status: 'open'
  });

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

      <SidebarContent className="p-0 gap-0 m-0">
        {sidebarMenuData?.navMain?.map((item) => (
          <SidebarGroup key={item?.title}>
            <SidebarGroupContent>
              {isMounted && (
                <SidebarMenu className="flex flex-col gap-2">
                  {item?.items?.map((item) => (
                    <SidebarMenuItem key={item?.title}>
                      <SidebarMenuButton asChild isActive={item?.url === pathname} className="py-[18px]">
                        <Link href={item?.url} prefetch={true} className="flex flex-row items-center">
                          {item?.icon && <item.icon />}
                          <span>{t(`menu.${item?.title}`)}</span>

                          {item?.url === '/support-requests' && (supportTicketsData?.totalCount ?? 0) > 0 && (
                            <Badge variant="default" className="rounded-full ml-auto text-center p-[0px] h-[20px] w-[20px]">
                              {supportTicketsData?.totalCount ?? 0}
                            </Badge>
                          )}
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              )}
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <CustomSidebarFooter />
      <SidebarRail />
    </Sidebar>
  );
}
