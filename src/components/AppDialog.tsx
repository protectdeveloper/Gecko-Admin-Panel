import { ReactNode } from 'react';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose
} from './ui/dialog';

interface ContentProps {
  children: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  className?: string;
}

const Content = (props: ContentProps) => {
  return (
    <DialogContent className={props.className} onClick={(e) => e.stopPropagation()}>
      <DialogHeader>
        <DialogTitle>{props.title}</DialogTitle>
        <DialogDescription className="hidden" />
        {props.description && <DialogDescription>{props.description}</DialogDescription>}
      </DialogHeader>
      <div className="max-h-[70vh] overflow-auto">{props.children}</div>
    </DialogContent>
  );
};

export const AppDialog = {
  Dialog,
  Trigger: DialogTrigger,
  Content: Content,
  Footer: DialogFooter,
  Close: DialogClose
};
