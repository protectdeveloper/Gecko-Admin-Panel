'use client';

import * as React from 'react';
import * as HoverCardPrimitive from '@radix-ui/react-hover-card';
import { useSidebar } from '@/components/ui/sidebar';

import { cn } from '@/lib/utils';

const HoverCardContext = React.createContext<{ isMobile: boolean; open: boolean; setOpen: (v: boolean) => void } | null>(null);

function HoverCard(props: React.ComponentProps<typeof HoverCardPrimitive.Root>) {
  const { isMobile } = useSidebar();
  const [open, setOpen] = React.useState(false);

  // Mobilde open state ile kontrol, masaüstünde eski davranış
  const rootProps = isMobile ? { open, onOpenChange: setOpen, ...props } : props;

  // Mobilde trigger'a fonksiyon iletmek için context
  const contextValue = React.useMemo(() => ({ isMobile, open, setOpen }), [isMobile, open]);

  return (
    <HoverCardContext.Provider value={contextValue}>
      <HoverCardPrimitive.Root data-slot="hover-card" {...rootProps} />
    </HoverCardContext.Provider>
  );
}

function HoverCardTrigger({ ...props }: React.ComponentProps<typeof HoverCardPrimitive.Trigger>) {
  const ctx = React.useContext(HoverCardContext);
  const handleClick = (e: React.MouseEvent<any>) => {
    if (ctx?.isMobile) {
      e.preventDefault();
      ctx.setOpen(!ctx.open);
    }
    if (props.onClick) props.onClick(e);
  };
  return <HoverCardPrimitive.Trigger data-slot="hover-card-trigger" {...props} onClick={handleClick} />;
}

function HoverCardContent({
  className,
  align = 'center',
  sideOffset = 4,
  ...props
}: React.ComponentProps<typeof HoverCardPrimitive.Content>) {
  return (
    <HoverCardPrimitive.Portal data-slot="hover-card-portal">
      <HoverCardPrimitive.Content
        data-slot="hover-card-content"
        align={align}
        sideOffset={sideOffset}
        className={cn(
          'bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-64 origin-(--radix-hover-card-content-transform-origin) rounded-md border p-4 shadow-md outline-hidden',
          className
        )}
        {...props}
      />
    </HoverCardPrimitive.Portal>
  );
}

export { HoverCard, HoverCardTrigger, HoverCardContent };
