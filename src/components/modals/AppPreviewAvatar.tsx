import { ReactNode } from 'react';
import Image from 'next/image';
import { Dialog, DialogTrigger, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../ui/dialog';

interface ContentProps {
  previewImage?: string;
  title?: ReactNode;
  description?: ReactNode;
}

const Content = (props: ContentProps) => {
  return (
    <DialogContent className="gap-4 flex flex-col items-center justify-center p-6 max-h-screen overflow-auto">
      <DialogHeader>
        <DialogTitle className="hidden">{props.title}</DialogTitle>
        <DialogDescription className="hidden">{props.description}</DialogDescription>
      </DialogHeader>

      {props.previewImage && (
        <Image src={props.previewImage} alt="Preview" width={500} height={250} className="rounded-md object-contain" />
      )}

      {!props.previewImage && (
        <div className="w-full h-72 flex items-center justify-center bg-accent rounded-md">
          <span className="text-muted-foreground">No preview available</span>
        </div>
      )}
    </DialogContent>
  );
};

export const AppPreviewAvatar = {
  Dialog,
  Trigger: DialogTrigger,
  Content
};
