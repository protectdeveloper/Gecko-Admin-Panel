'use client';

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '../ui/button';
import { useTranslation } from 'react-i18next';

interface UserAgreementModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  content: React.ReactNode;
  onAcceptPress: () => void;
}

export const UserAgreementModal = ({
  onAcceptPress,
  open,
  onOpenChange,
  title = 'Kullanıcı Sözleşmesi',
  content
}: UserAgreementModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription className="hidden">{title}</DialogDescription>
        </DialogHeader>
        <div className="space-y-4 text-sm text-muted-foreground dark:text-muted-foreground">{content}</div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => {
              onOpenChange(false);
              onAcceptPress();
            }}
            className="w-full  font-bold bg-[#FBCE52] rounded-xl py-2 hover:bg-[#F9B800] transition-colors duration-300"
          >
            Onayla
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
