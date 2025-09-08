'use client';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

const NotFoundBox = () => {
  const router = useRouter();

  return (
    <div className="absolute left-1/2 top-1/2 mb-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center text-center">
      <span className="bg-gradient-to-b from-primary to-white bg-clip-text text-[10rem] font-extrabold leading-none text-transparent">
        404
      </span>
      <h2 className="font-heading my-2 text-primary text-2xl font-bold">Sayfa Bulunamadı</h2>
      <p className="text-muted-foreground mb-6 text-lg">Aradığınız sayfa mevcut değil.</p>
      <div className="mt-8 flex justify-center gap-2">
        <Button onClick={() => router.back()} variant="default" size="lg">
          Geri Dön
        </Button>
        <Button onClick={() => router.push(`/`)} variant="outline" size="lg">
          Anasayfa
        </Button>
      </div>
    </div>
  );
};

export default NotFoundBox;
