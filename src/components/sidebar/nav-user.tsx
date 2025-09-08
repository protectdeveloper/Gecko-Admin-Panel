'use client';
import { formatAvatarFallback } from '@/utils/formatAvatarFallback';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';

export function NavUser() {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          size="lg"
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
          aria-label="User Account"
        >
          <Avatar className="h-8 w-8 rounded-lg">
            <AvatarImage src={undefined} alt="" />
            <AvatarFallback className="rounded-lg">{formatAvatarFallback('A', 'D')}</AvatarFallback>
          </Avatar>

          <div className="grid flex-1 gap-1 text-left text-xs leading-tight">
            <span className="truncate font-semibold">Admin</span>
          </div>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
