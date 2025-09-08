import { ReactNode } from 'react';
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from './ui/alert-dialog';

interface ContentProps {
  children: ReactNode;
  title: ReactNode;
  description?: ReactNode;
}

const Content = (props: ContentProps) => {
  return (
    <AlertDialogContent onClick={(e) => e.stopPropagation()}>
      <AlertDialogHeader>
        <AlertDialogTitle>{props.title}</AlertDialogTitle>
        <AlertDialogDescription className="hidden" />
        {props.description && <AlertDialogDescription>{props.description}</AlertDialogDescription>}
      </AlertDialogHeader>
      <div>{props.children}</div>
    </AlertDialogContent>
  );
};

export const AppAlert = {
  AlertDialog,
  Trigger: AlertDialogTrigger,
  Content: Content,
  Footer: AlertDialogFooter,
  Close: AlertDialogCancel
};
