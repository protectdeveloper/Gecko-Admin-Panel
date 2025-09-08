import React from 'react';
import { cookies } from 'next/headers';
import SupportContent from '@/features/Support/support-content';

const SupportRequestsPage = async () => {
  const cookiesData = await cookies();
  const layout = cookiesData.get('react-resizable-panels:layout:mail');
  const collapsed = cookiesData.get('react-resizable-panels:collapsed');
  const defaultLayout = layout ? JSON.parse(layout.value) : undefined;
  const defaultCollapsed = collapsed ? JSON.parse(collapsed.value) : undefined;

  return <SupportContent defaultLayout={defaultLayout} defaultCollapsed={defaultCollapsed} navCollapsedSize={4} />;
};

export default SupportRequestsPage;
