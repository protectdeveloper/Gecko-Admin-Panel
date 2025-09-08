'use client';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb';
import { getBreadcrumbMetaFromPathname, getBreadcrumbTrailFromPathname } from '@/lib/get-breadcrumb';
import { UserPlus } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { SidebarTrigger, useSidebar } from '../ui/sidebar';
import { cn } from '@/lib/utils';
import { LanguageToggle } from '@/components/ui/language-toggle';
import { ModeToggle } from '../sidebar/theme-dropdown';
import Image from 'next/image';
import React from 'react';

export default function HeaderBar() {
  const pathname = usePathname() || '';
  const { open, isMobile } = useSidebar();
  const meta = getBreadcrumbMetaFromPathname(pathname);
  const [isMounted, setIsMounted] = React.useState(false);
  const trail = getBreadcrumbTrailFromPathname(pathname);

  let left;
  if (isMobile) left = 0;
  else if (open) left = 'var(--sidebar-width)';
  else left = 'var(--sidebar-width-icon)';

  React.useEffect(() => setIsMounted(true), []);

  return (
    <div
      className={cn(
        'fixed top-0 right-0 overflow-x-auto bg-background flex flex-row shadow-md z-20 gap-2 items-center justify-between px-3 md:px-5 py-4 border-b transition-all duration-200 ease-linear'
      )}
      style={{ left }}
    >
      {isMounted && (
        <div className="flex flex-row items-center gap-2">
          {isMobile && <SidebarTrigger />}

          <Breadcrumb>
            <BreadcrumbList>
              {trail.length > 0 ? (
                trail.map((node, idx) => (
                  <React.Fragment key={`${node.title}-${idx}`}>
                    <BreadcrumbItem>
                      {node.href ? (
                        <BreadcrumbLink href={node.href} className="text-muted-foreground flex items-center gap-2">
                          {node.icon &&
                            (typeof node.icon === 'string' ? (
                              <Image src={`/icons/${node.icon}`} alt="icon" width={16} height={16} className="w-4 h-4" />
                            ) : (
                              <node.icon className="w-4 h-4" />
                            ))}
                          <span className="text-sm">{node.title}</span>
                        </BreadcrumbLink>
                      ) : (
                        <div className="text-muted-foreground flex items-center gap-2">
                          {node.icon &&
                            (typeof node.icon === 'string' ? (
                              <Image src={`/icons/${node.icon}`} alt="icon" width={16} height={16} className="w-4 h-4" />
                            ) : (
                              <node.icon className="w-4 h-4" />
                            ))}
                          <BreadcrumbPage>{node.title}</BreadcrumbPage>
                        </div>
                      )}
                    </BreadcrumbItem>
                    {idx < trail.length - 1 && <BreadcrumbSeparator />}
                  </React.Fragment>
                ))
              ) : (
                <BreadcrumbItem>
                  <BreadcrumbPage>{meta?.title ?? 'Sayfa'}</BreadcrumbPage>
                </BreadcrumbItem>
              )}
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      )}

      <div className="flex items-center justify-end gap-2">
        <ModeToggle />
      </div>
    </div>
  );
}
