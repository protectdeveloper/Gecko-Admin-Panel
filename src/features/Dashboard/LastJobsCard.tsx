import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

interface Props {
  className?: string;
  children?: React.ReactNode;
}

const LastJobsCard: React.FC<Props> = ({ className = '', children }) => (
  <Card className={`p-4 ${className}`}>
    <CardHeader className="p-0">
      <CardTitle>Son Çalışan Görevler</CardTitle>
    </CardHeader>
    <CardContent className="w-full p-0">{children}</CardContent>
  </Card>
);

export default LastJobsCard;
