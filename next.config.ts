import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: [
      'lucide-react',
      'react-day-picker',
      'react-leaflet',
      'embla-carousel-react',
      'recharts',
      'react-image-crop',
      'sonner',
      '@radix-ui/react-alert-dialog',
      '@radix-ui/react-dialog',
      '@radix-ui/react-tooltip',
      '@radix-ui/react-select',
      '@radix-ui/react-switch',
      '@radix-ui/react-popover',
      '@radix-ui/react-dropdown-menu'
    ],
    preloadEntriesOnStart: true
  },
  logging: {
    fetches: {
      fullUrl: true
    }
  },
  eslint: {
    ignoreDuringBuilds: true
  },
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_MQTT_BROKER_1: process.env.NEXT_PUBLIC_MQTT_BROKER_1,
    NEXT_PUBLIC_MQTT_BROKER_2: process.env.NEXT_PUBLIC_MQTT_BROKER_2,
    NEXT_PUBLIC_MQTT_USERNAME: process.env.NEXT_PUBLIC_MQTT_USERNAME,
    NEXT_PUBLIC_MQTT_PASSWORD: process.env.NEXT_PUBLIC_MQTT_PASSWORD
    // MQTT bilgileri server-side'da kalmalı - NEXT_PUBLIC_ kullanılmamalı!
    // Bu bilgiler sadece server components ve API routes'ta erişilebilir olmalı
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          }
        ]
      }
    ];
  }
};

export default nextConfig;
