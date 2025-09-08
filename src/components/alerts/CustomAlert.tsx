'use client';
import React from 'react';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog';
import { Button } from '../ui/button';

interface CustomAlertsProps {
  content?: React.ReactNode;
  title?: string;
  description?: string;
  cancelText?: string;
  actionText?: string;
  onAccept?: () => void;
  isOpen?: boolean;
  setIsOpen?: (isOpen: boolean) => void;
  isLoading?: boolean;
}

const CustomAlert = ({
  isOpen = false,
  setIsOpen = () => {},
  isLoading = false,
  content,
  title = 'İşlem Onayı',
  description = 'Bu işlemi gerçekleştirmek istediğinize emin misiniz?',
  cancelText = 'İptal',
  actionText = 'Onayla',
  onAccept
}: CustomAlertsProps) => {
  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>{content}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <Button
            variant="outline"
            disabled={isLoading}
            onClick={() => {
              setIsOpen(false);
            }}
            className="bg-background text-muted-foreground hover:bg-muted"
          >
            {cancelText}
          </Button>

          <Button variant={'default'} disabled={isLoading} loading={isLoading} onClick={onAccept} className="bg-primary ">
            {actionText}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default CustomAlert;
