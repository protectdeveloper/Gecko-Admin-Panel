import * as React from 'react';
import { ArrowDownIcon, ArrowUpIcon, ChevronsUpDown, EyeOffIcon } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { cn } from '../../lib/utils';
import { Button } from '../ui/button';
import { flexRender } from '@tanstack/react-table';
import { useTranslation } from 'react-i18next';

export default function ColumnHeader({ column, header, className }: { column: any; header: any; className?: string }) {
  const columnDef: any = column.columnDef;
  const columnTitle = columnDef?.label;

  if (!column.getCanSort() && !column.getCanHide()) {
    return (
      <div className={cn(className)}>
        <span className="text-muted-foreground">{columnTitle}</span>
      </div>
    );
  }

  if (header.column.columnDef?.label) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" className="data-[state=open]:bg-accent -ml-2.5">
            <span className="text-muted-foreground">{columnTitle}</span>
            {column.getCanSort() && column.getIsSorted() === 'desc' ? (
              <ArrowDownIcon size={15} className="text-muted-foreground" />
            ) : column.getIsSorted() === 'asc' ? (
              <ArrowUpIcon size={15} className="text-muted-foreground" />
            ) : (
              <ChevronsUpDown size={15} className="text-muted-foreground" />
            )}
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="start">
          {column.getCanHide() && (
            <DropdownMenuItem aria-label="Hide column" onClick={() => column.toggleVisibility(false)}>
              <EyeOffIcon size={15} className="text-muted-foreground/70" />
              <span style={{ fontSize: 14 }}>Gizle</span>
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return flexRender(header.column.columnDef.header, header.getContext());
}
