'use client';

import React from 'react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';

interface ItemAvatarsDropdownItem {
  id: string;
  name: string;
}

interface ItemAvatarsDropdownProps {
  items: ItemAvatarsDropdownItem[];
  maxVisible?: number;
  className?: string;
}

export function ItemAvatarsDropdown({ items = [], maxVisible = 3, className = '' }: ItemAvatarsDropdownProps) {
  const visibleItems = items.slice(0, maxVisible);
  const hiddenItems = items.slice(maxVisible);
  const hiddenItemCount = hiddenItems.length;

  return (
    <div className={`flex items-center space-x-1 ${className}`}>
      {visibleItems?.map((item) => (
        <Tooltip key={item.id}>
          <TooltipTrigger asChild className="cursor-pointer">
            <Avatar className="w-8 h-8 border border-primary">
              <AvatarFallback className="bg-primary text-background text-xs">
                {item?.name?.[0]?.toUpperCase() || '?'}
              </AvatarFallback>
            </Avatar>
          </TooltipTrigger>
          <TooltipContent className="bg-primary" fillColor="bg-primary fill-primary">
            <span className="text-background">{item?.name}</span>
          </TooltipContent>
        </Tooltip>
      ))}

      {hiddenItemCount > 0 && (
        <HoverCard openDelay={100} closeDelay={100}>
          <HoverCardTrigger asChild>
            <Avatar className="w-8 h-8 border border-muted cursor-pointer">
              <AvatarFallback className="bg-input text-primary text-xs">+{hiddenItemCount}</AvatarFallback>
            </Avatar>
          </HoverCardTrigger>

          <HoverCardContent className="w-48 max-h-48 overflow-y-auto p-2 space-y-1">
            {hiddenItems?.map((item) => (
              <div key={item.id} className="flex items-center space-x-2 p-1 rounded hover:bg-muted cursor-pointer">
                <Avatar className="w-6 h-6 border border-primary">
                  <AvatarFallback className="bg-primary text-background text-[10px]">
                    {item?.name?.[0]?.toUpperCase() || '?'}
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm text-foreground">{item?.name}</span>
              </div>
            ))}
          </HoverCardContent>
        </HoverCard>
      )}
    </div>
  );
}

export default ItemAvatarsDropdown;
