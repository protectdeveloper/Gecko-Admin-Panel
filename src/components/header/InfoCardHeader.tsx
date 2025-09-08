import React from 'react';
import { CardDescription, CardTitle } from '../ui/card';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';
import { Info } from 'lucide-react';

interface InfoCardHeaderProps {
  title: string;
  description?: string;
  tooltipText?: string;
  icon?: React.ReactNode;
}

const InfoCardHeader = ({ title, description, icon, tooltipText }: InfoCardHeaderProps) => {
  return (
    <div className="w-full flex flex-row items-center">
      <div className="flex-1 flex flex-row items-center justify-start gap-2">
        {icon && <div className="text-primary">{icon}</div>}
        <div className="flex flex-col">
          {title && <CardTitle>{title}</CardTitle>}
          {description && <CardDescription className="font-light">{description}</CardDescription>}
        </div>
      </div>

      {tooltipText && (
        <Tooltip>
          <TooltipTrigger asChild className="cursor-pointer">
            <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
              <Info size={18} className="text-muted-foreground" />
            </div>
          </TooltipTrigger>
          <TooltipContent className="w-72 p-3 bg-background " fillColor="bg-background fill-background">
            <span>{tooltipText}</span>
          </TooltipContent>
        </Tooltip>
      )}
    </div>
  );
};

export default InfoCardHeader;
