'use client';
import Image from 'next/image';
import { ReactNode, useEffect, useState } from 'react';
import Slider from '../../../public/assets/icon/slider2.svg';

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  // const [isClient, setIsClient] = useState(false);

  // useEffect(() => {
  //   setIsClient(true);
  // }, []);

  // if (!isClient) return null;

  return <div className="w-full min-h-screen">{children}</div>;
}
