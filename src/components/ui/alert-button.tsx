"use client";
import * as React from "react";
import { cn } from "../../lib/utils";
import { Button, ButtonProps } from "./button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./dialog";

type Props = {
  headerTitle?: string;
  headerDescription?: string;
  children?: React.ReactNode;
  renderButton?: () => React.ReactNode;
  approveButtonVariant?: ButtonProps["variant"];
  approveButtonClassName?: ButtonProps["className"];
} & ButtonProps;

export const AlertButton = ({
  children,
  onClick,
  approveButtonClassName,
  approveButtonVariant,
  ...props
}: Props) => {
  const header = {
    title: "Onaylıyor musunuz?",
    description: "Bu işlemi onaylamak istediğinizden emin misiniz?",
  };

  const [open, setOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const onClose = () => {
    setOpen(false);
  };

  const onApproveClick = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    if (onClick) {
      setIsLoading(true);
      try {
        await onClick(e);
      } catch (error) {
        onClose();
        setIsLoading(false);
      }
      onClose();
      setIsLoading(false);
    } else {
      onClose();
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button {...props}>{children}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{header.title}</DialogTitle>
          <DialogDescription>{header.description}</DialogDescription>
        </DialogHeader>
        <div className="w-full flex gap-2">
          <Button
            loading={isLoading}
            onClick={onApproveClick}
            className={cn("w-1/2", approveButtonClassName)}
            variant={approveButtonVariant || "destructive"}
            type="button"
          >
            Evet
          </Button>
          <Button
            onClick={onClose}
            className="w-1/2"
            variant="outline"
            type="button"
          >
            Hayır
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
