"use client";

import { Loader2Icon } from "lucide-react";
import { cn } from "../../lib/utils";

export const Spinner = ({
  className,
  size,
}: {
  className?: string;
  size?: number;
}) => {
  return <Loader2Icon className={cn("animate-spin", className)} size={size} />;
};
