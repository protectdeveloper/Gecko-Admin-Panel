import NotFoundBox from '@/features/NotFoundBox';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '404 | Sayfa Bulunamadı',
  description: 'Aradığınız sayfa bulunamadı.'
};

const PageNotFound = () => {
  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center bg-background">
      <NotFoundBox />
    </div>
  );
};

export default PageNotFound;
