'use client';

import * as React from 'react';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';

import { cn } from '@/lib/utils';
import { useSidebar } from '@/components/ui/sidebar';

function TooltipProvider({ delayDuration = 0, ...props }: React.ComponentProps<typeof TooltipPrimitive.Provider>) {
  return <TooltipPrimitive.Provider data-slot="tooltip-provider" delayDuration={delayDuration} {...props} />;
}

function Tooltip(props: React.ComponentProps<typeof TooltipPrimitive.Root>) {
  const { isMobile } = useSidebar();
  const [open, setOpen] = React.useState(false);

  // Mobilde open state ile kontrol, masaüstünde eski davranış
  const rootProps = isMobile ? { open, onOpenChange: setOpen, ...props } : props;

  // Mobilde trigger'a fonksiyon iletmek için context
  const contextValue = React.useMemo(() => ({ isMobile, open, setOpen }), [isMobile, open]);

  return (
    <TooltipProvider>
      <TooltipContext.Provider value={contextValue}>
        <TooltipPrimitive.Root data-slot="tooltip" {...rootProps} />
      </TooltipContext.Provider>
    </TooltipProvider>
  );
}

// TooltipTrigger'a context ile mobilde tıklama ile aç/kapat
const TooltipContext = React.createContext<{ isMobile: boolean; open: boolean; setOpen: (v: boolean) => void } | null>(null);

function TooltipTrigger({ ...props }: React.ComponentProps<typeof TooltipPrimitive.Trigger>) {
  const ctx = React.useContext(TooltipContext);
  const handleClick = (e: React.MouseEvent<any>) => {
    if (ctx?.isMobile) {
      e.preventDefault();
      ctx.setOpen(!ctx.open);
    }
    if (props.onClick) props.onClick(e);
  };
  return <TooltipPrimitive.Trigger data-slot="tooltip-trigger" {...props} onClick={handleClick} />;
}

function TooltipContent({
  className,
  sideOffset = 0,
  children,
  fillColor = 'fill-primary',
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Content> & {
  fillColor?: string;
}) {
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content
        data-slot="tooltip-content"
        sideOffset={sideOffset}
        className={cn(
          'animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-fit origin-(--radix-tooltip-content-transform-origin) rounded-md px-3 py-1.5 text-xs text-balance',
          className
        )}
        {...props}
      >
        {children}
        <TooltipPrimitive.Arrow asChild>
          <div className={cn(fillColor, 'z-50 size-2.5 rotate-45 translate-y-[calc(-50%_-_2px)] rounded-[2px]')} />
        </TooltipPrimitive.Arrow>
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Portal>
  );
}

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };
