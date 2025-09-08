import { sidebarMenuData, breadcrumbData, BreadcrumbItem } from '@/utils/data';
import { type LucideIcon } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';

interface BreadcrumbMeta {
  title: string;
  icon?: LucideIcon | string;
}

export interface BreadcrumbNode extends BreadcrumbMeta {
  href?: string;
}

function findBreadcrumbByPattern(pathname: string): BreadcrumbItem | undefined {
  // Özel desen: /event/detail/:eventId/user/:userId
  const special = breadcrumbData.find((item) => {
    if (item.pattern === '/event/detail/id/user/id') {
      const regex = /^\/event\/detail\/[^/]+\/user\/[^/]+$/;
      return regex.test(pathname);
    }
    return false;
  });
  if (special) return special;

  // Genel eşleşme: tam veya baştan eşleşme
  return breadcrumbData.find((item) => pathname === item.pattern || pathname.startsWith(item.pattern));
}

function getMetaFromMenu(
  pathname: string,
  menu: {
    navMain: Array<{ items: Array<{ title: string; url: string; icon?: LucideIcon }> }>;
    navFooter: Array<{ items: Array<{ title: string; url: string; icon?: LucideIcon }> }>;
  },
  t: (k: string) => string
): BreadcrumbMeta | null {
  const breadcrumb = findBreadcrumbByPattern(pathname);
  if (breadcrumb) {
    return { title: t(`menu.${breadcrumb.title}`), icon: breadcrumb.icon };
  }

  const allItems = [...menu.navMain.flatMap((group) => group.items), ...menu.navFooter.flatMap((group) => group.items)];

  const exact = allItems.find((item) => item.url === pathname);
  if (exact) return { title: t(`menu.${exact.title}`), icon: exact.icon };

  const starts = allItems.find((item) => item.url !== '/' && pathname.startsWith(item.url));
  return starts ? { title: t(`menu.${starts.title}`), icon: starts.icon } : null;
}

function getTrailFromMenu(
  pathname: string,
  menu: {
    navMain: Array<{ items: Array<{ title: string; url: string; icon?: LucideIcon }> }>;
    navFooter: Array<{ items: Array<{ title: string; url: string; icon?: LucideIcon }> }>;
  },
  t: (k: string) => string
): BreadcrumbNode[] {
  const allItems = [...menu.navMain.flatMap((g) => g.items), ...menu.navFooter.flatMap((g) => g.items)];

  const parent = allItems
    .filter((i) => i.url !== '/' && pathname.startsWith(i.url))
    .sort((a, b) => b.url.length - a.url.length)[0];

  const special = findBreadcrumbByPattern(pathname);
  const exact = allItems.find((i) => i.url === pathname);

  const trail: BreadcrumbNode[] = [];
  if (parent) trail.push({ title: t(`menu.${parent.title}`), icon: parent.icon, href: parent.url });

  if (special) {
    trail.push({ title: t(`menu.${special.title}`), icon: special.icon });
  } else if (exact && (!parent || exact.url !== parent.url)) {
    trail.push({ title: t(`menu.${exact.title}`), icon: exact.icon });
  }

  return trail;
}

export function getBreadcrumbMetaFromPathname(pathname: string): BreadcrumbMeta | null {
  const { t } = useTranslation();

  return getMetaFromMenu(pathname, sidebarMenuData, t);
}

export function getBreadcrumbTrailFromPathname(pathname: string): BreadcrumbNode[] {
  const { t } = useTranslation();
  return getTrailFromMenu(pathname, sidebarMenuData, t);
}
