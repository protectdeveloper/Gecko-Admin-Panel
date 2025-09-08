import { ReactNode } from 'react';
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet';
import { cn } from '@/lib/utils';

interface ContentProps {
  children: ReactNode;
  title: ReactNode;
  side?: 'top' | 'right' | 'bottom' | 'left';
}

const Content = (props: ContentProps) => {
  return (
    <SheetContent side={props?.side ?? 'right'} className={cn('w-full gap-0 p-0 m-0', props?.side !== 'top' && 'rounded-l-2xl')}>
      <SheetHeader className="gap-0">
        <SheetTitle>{props.title}</SheetTitle>
        <SheetDescription />
      </SheetHeader>
      <div className="max-h-[100vh] overflow-y-auto pb-4">{props.children}</div>
    </SheetContent>
  );
};

export const AppSheet = {
  Sheet: Sheet,
  Trigger: SheetTrigger,
  Content: Content,
  Close: SheetClose
};
