'use client';

import { ChevronRight, type LucideIcon } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem
} from '@/components/ui/sidebar';
import { useTranslation } from 'react-i18next';
import { usePathname, useRouter } from 'next/navigation';
import { useGetSupportAdminTicketsQuery } from '@/api/Support/Support.hook';
import { Badge } from '../ui/badge';

export function NavMain({
  items
}: {
  items: {
    title: string;
    url: string;
    icon?: LucideIcon;
    isActive?: boolean;
    items?: {
      title: string;
      url: string;
    }[];
  }[];
}) {
  const { t } = useTranslation();
  const pathname = usePathname() || '';
  const router = useRouter();
  const { data: supportTicketsData, refetch } = useGetSupportAdminTicketsQuery({
    pageNumber: 1,
    pageSize: 20,
    status: 'open'
  });

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Admin Panel</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <Collapsible key={item.title} asChild defaultOpen={item.isActive} className="group/collapsible">
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton
                  tooltip={item.title}
                  onClick={(e) => {
                    if (!item.items) {
                      e.preventDefault();
                      router.push(item.url);
                    }
                  }}
                  className="cursor-pointer group-data-[state=open]/collapsible:shadow-lg"
                >
                  {item.icon && <item.icon />}
                  <span>{t(`menu.${item.title}`)}</span>
                  {item.items && (
                    <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                  )}

                  {item?.url === '/support-requests' && !item?.items && (supportTicketsData?.totalCount ?? 0) > 0 && (
                    <Badge variant="default" className="rounded-full ml-auto text-center p-[0px] h-[20px] w-[20px]">
                      {supportTicketsData?.totalCount ?? 0}
                    </Badge>
                  )}
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  {item.items?.map((subItem) => (
                    <SidebarMenuSubItem key={subItem.title}>
                      <SidebarMenuSubButton asChild>
                        <a href={subItem.url}>
                          <span>{subItem.title}</span>
                        </a>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
